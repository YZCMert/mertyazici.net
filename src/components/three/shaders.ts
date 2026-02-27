export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  varying float vDisplacement;

  void main() {
    vec3 pos = position;
    float displacement = sin(pos.x * 2.0 + uTime) *
                         sin(pos.y * 2.0 + uTime * 0.8) *
                         sin(pos.z * 2.0 + uTime * 0.6) * uDistort;
    pos += normal * displacement;
    vDisplacement = displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

export const fragmentShader = /* glsl */ `
  uniform float uOpacity;

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, uOpacity);
  }
`
