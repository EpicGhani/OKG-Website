import { Hero } from '../sections/Hero'
import { StudioUpdates } from '../sections/StudioUpdates'
import { MerchNewsletter } from '../sections/MerchNewsletter'
import { WorkWithUs } from '../sections/WorkWithUs'
import { Band } from '../ui'
import { useSeo } from '../lib/useSeo' 
import '../styles/sections/studio-community.css'

export function Home() {
  
  useSeo('Obra Kasi Games — Filipino game studio from Manila', 'Rooted games from the islands. Folklore, pattern, and play.')

  return (
    <main>
      <Hero />
      <div className="studio-community">
        <div className="studio-community__pattern ok-tile-binakol" aria-hidden="true" />
        <StudioUpdates />
        <div className="studio-community__divider" aria-hidden="true">
          <Band kind="gayaman" color="var(--luntian-500)" height={16} />
          <Band kind="kalinga" color="var(--pula-500)" height={30} />
          <Band kind="okir" color="var(--luntian-500)" height={20} />
        </div>
        <MerchNewsletter />
      </div>
      <WorkWithUs />
    </main>
  )
}
