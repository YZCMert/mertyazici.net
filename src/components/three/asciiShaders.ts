export const asciiVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const asciiFragmentShader = /* glsl */ `
  uniform sampler2D uImage;
  uniform float uTime;
  uniform float uProgress;      // 0 = full ASCII, 1 = normal image
  uniform float uHoverActive;   // 0 = idle, 1 = hover
  uniform vec2 uResolution;
  uniform float uPixelRatio;

  varying vec2 vUv;

  // --- Simple hash-based noise ---
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // --- 5x5 bitmap character ---
  // Each character is encoded as 25 bits in a single int.
  // Bit layout: row0(5 bits) | row1(5 bits) | row2(5 bits) | row3(5 bits) | row4(5 bits)
  // Top-left = bit 24, bottom-right = bit 0
  float character(int n, vec2 p) {
    p = floor(p * vec2(-4.0, 4.0) + 2.5);
    if (p.x < 0.0 || p.y < 0.0 || p.x > 4.0 || p.y > 4.0) return 0.0;
    int idx = int(p.x) + int(p.y) * 5;
    // Check if bit at idx is set
    // Use loop-based bit check for WebGL 1.0 compatibility
    int val = n;
    for (int i = 0; i < 24; i++) {
      if (i >= idx) break;
      val = val / 2;
    }
    return mod(float(val), 2.0);
  }

  void main() {
    // Cell size in pixels — determines ASCII grid density
    float cellSize = mix(10.0, 6.0, uPixelRatio - 1.0);
    cellSize = max(cellSize, 5.0);

    vec2 resolution = uResolution * uPixelRatio;
    vec2 cell = floor(vUv * resolution / cellSize);
    vec2 cellUv = fract(vUv * resolution / cellSize);

    // Sample the video/image at the cell center
    vec2 sampleUv = (cell + 0.5) * cellSize / resolution;
    vec4 texColor = texture2D(uImage, sampleUv);

    // Luminance
    float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

    // Add subtle noise-based flicker
    float n = noise(cell * 0.5 + uTime * 0.3);
    luma += (n - 0.5) * 0.08;
    luma = clamp(luma, 0.0, 1.0);

    // Select character based on brightness thresholds
    // Characters: space, :, *, o, &, 8, @, #
    int charBits = 0;  // space

    if (luma > 0.1) charBits = 4329604;    // : (colon) — two dots
    if (luma > 0.25) charBits = 4532776;   // * (star/asterisk)
    if (luma > 0.35) charBits = 4539716;   // o (circle)
    if (luma > 0.45) charBits = 4671684;   // & (ampersand)
    if (luma > 0.55) charBits = 15255086;  // 8 (eight)
    if (luma > 0.7) charBits = 15600926;   // @ (at)
    if (luma > 0.85) charBits = 11512810;  // # (hash)

    float charPixel = character(charBits, cellUv);

    // ASCII color: tinted by original image color for subtle coloring
    vec3 bgColor = vec3(18.0/255.0, 24.0/255.0, 19.0/255.0);
    vec3 charColor = mix(vec3(0.85, 0.9, 0.85), texColor.rgb * 1.5, 0.3);
    vec3 asciiResult = mix(bgColor, charColor, charPixel);

    // Normal image
    vec3 normalResult = texColor.rgb;

    // Progress blend: ASCII → normal
    vec3 finalColor = mix(asciiResult, normalResult, uProgress);

    // Hover effect: slight darken + vignette
    float vignette = 1.0 - smoothstep(0.3, 0.9, length(vUv - 0.5) * 1.5);
    float hoverDarken = mix(1.0, 0.55, uHoverActive);
    float hoverVignette = mix(1.0, vignette, uHoverActive * 0.5);
    finalColor *= hoverDarken * hoverVignette;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`
