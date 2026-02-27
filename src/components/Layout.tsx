import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLenis } from '@/hooks/useLenis'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

export default function Layout() {
  const location = useLocation()
  const lenisRef = useLenis()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [location.pathname, lenisRef])

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <ScrollProgress />
      <Header />
      <main className="flex flex-1 flex-col justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
