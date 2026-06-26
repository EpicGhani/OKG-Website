import { Hero } from '../sections/Hero'
import { Statement } from '../sections/Statement'
import { WhatWeDo } from '../sections/WhatWeDo'
import { Games } from '../sections/Games'
import { Devlog } from '../sections/Devlog'
import { WorkWithUs } from '../sections/WorkWithUs'

export function Home() {
  return (
    <main>
      <Hero />
      <Statement />
      <WhatWeDo />
      <Games />
      <Devlog />
      <WorkWithUs />
    </main>
  )
}