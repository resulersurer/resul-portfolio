import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-indigo-500/30">
      <Navigation />
      <Hero />
      <div className="relative z-10 space-y-0">
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Testimonials />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
