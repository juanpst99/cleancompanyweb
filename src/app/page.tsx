import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Hero from '@/components/sections/Hero'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Services from '@/components/sections/Services'
import ServiceDetails from '@/components/sections/ServiceDetails'
import BeforeAfter from '@/components/sections/BeforeAfter'
import Testimonials from '@/components/sections/Testimonials'
import Clients from '@/components/sections/Clients'
import Blog from '@/components/sections/Blog'
import About from '@/components/sections/About'
import CTA from '@/components/sections/CTA'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import StructuredData from '@/components/SEO/StructuredData'

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <WhatsAppButton />
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <ServiceDetails />
        <BeforeAfter />
        <Testimonials />
        <Clients />
        <Blog />
        <About />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
