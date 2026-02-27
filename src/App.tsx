import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Work = lazy(() => import('./pages/Work'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  const location = useLocation()
  const [showLoading, setShowLoading] = useState(() => {
    return !sessionStorage.getItem('visited')
  })
  const [loadingDone, setLoadingDone] = useState(false)

  useEffect(() => {
    if (!showLoading) {
      setLoadingDone(true)
    }
  }, [showLoading])

  function handleLoadingComplete() {
    sessionStorage.setItem('visited', '1')
    setShowLoading(false)
    setLoadingDone(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <LoadingScreen isVisible={showLoading} onComplete={handleLoadingComplete} />

      {loadingDone && (
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-black">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/hakkimda" element={<About />} />
                <Route path="/hizmetler" element={<Services />} />
                <Route path="/calismalar" element={<Work />} />
                <Route path="/calismalar/:slug" element={<ProjectDetail />} />
                <Route path="/iletisim" element={<Contact />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Suspense>
      )}
    </MotionConfig>
  )
}

export default App
