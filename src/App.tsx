import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Statement } from './sections/Statement'
import { WhatWeDo } from './sections/WhatWeDo'
import { Games } from './sections/Games'
import { WorkWithUs } from './sections/WorkWithUs'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <WhatWeDo />
        <Games />
        <WorkWithUs />
      </main>
      <Footer />
    </>
  )
}
