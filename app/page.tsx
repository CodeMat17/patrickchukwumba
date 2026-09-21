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
    <>
      <p className='px-4 text-center min-h-screen justify-center py-32 font-bold text-4xl'>This site is undergoing maintenance. check again soon.</p>
      {/* <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer /> */}
    </>
  )
}
