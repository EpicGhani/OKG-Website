import { Hero } from '../sections/Hero'
import { Statement } from '../sections/Statement'
import { WhatWeDo } from '../sections/WhatWeDo'
import { Games } from '../sections/Games'
import { Devlog } from '../sections/Devlog'
import { WorkWithUs } from '../sections/WorkWithUs'
import { useSeo } from '../lib/useSeo' 

export function Home() {
  
  useSeo('Obra Kasi Games — Filipino game studio from Manila', 'Rooted games from the islands. Folklore, pattern, and play.')

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