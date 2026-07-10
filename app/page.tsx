import About from '../components/about'
import Contact from '../components/contact'
import Experience from '../components/experience'
import Header from '../components/header'
import Hero from '../components/hero'
import Work from '../components/work'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-mist font-sans text-ink">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Contact />
    </div>
  )
}
