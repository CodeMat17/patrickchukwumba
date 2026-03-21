import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { Stats } from "@/components/sections/stats"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
