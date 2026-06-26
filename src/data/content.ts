import type { Game, Service, Engagement } from './types'

export const services: Service[] = [
  {
    n: '01', phase: 'Phase one', title: 'Narrative & systems weaving',
    body: 'Our design philosophy is rooted in the bayanihan spirit, cooperative creation. We build worlds that honor Philippine mythology and history while crafting mechanical systems that feel organic and satisfying.',
    points: [
      ['Mythos integration', 'Careful adaptation of local legends into the gameplay loop.'],
      ['Systemic economy', 'In-game trade mechanics drawn from historical barter systems.'],
      ['Cultural consultancy', 'Authenticity checked in every pixel and line of dialogue.'],
    ],
    cta: 'Design a world',
    art: { label: "The weaver's pen", sub: 'Conceptualizing roots', icon: 'pen-tool', fg: 'var(--pula-500)', bg: 'var(--buhangin-200)', band: 'okir' },
  },
  {
    n: '02', phase: 'Phase two', title: 'Full-cycle development',
    body: 'From the first line of code to the final bug-hunt, we build codebases like inabel cloth, tightly woven, durable, and good to look at.',
    grid: [
      ['Unity & Unreal', 'Cross-platform mastery.'],
      ['Mobile optimization', 'Built for accessibility.'],
      ['Live ops', 'Post-launch stewardship.'],
      ['Custom shaders', 'Hand-tuned visual styles.'],
    ],
    cta: 'Forge a vision',
    art: { label: 'Forge of anito', sub: 'Building the core', icon: 'swords', fg: 'var(--luntian-500)', bg: 'var(--buhangin-100)', band: 'gayaman' },
  },
  {
    n: '03', phase: 'Phase three', title: 'Publishing the archipelago',
    body: 'We help independent creators navigate the wide oceans of the global games market. Our publishing focuses on Southeast Asian amplification, so your story reaches the islands and beyond.',
    cols: [
      ['Market strategy', 'Finding your tribe and timing your launch.'],
      ['Localization', 'Tagalog, Cebuano, Ilocano, and global languages.'],
      ['Community', 'Cultivating a passionate, respectful player base.'],
    ],
    cta: 'Begin the voyage',
  },
]

export const engagements: Engagement[] = [
  {
    id: 'build', kicker: 'For studios & founders', title: 'Build with us',
    body: 'Bring us in for design, full-cycle development, or a co-dev partnership. We treat your project like our own bench work.',
    points: ['Game & systems design', 'Unity / Unreal development', 'Art, shaders & technical audio', 'Live-ops & post-launch'],
    cta: 'Start a project', tone: 'pula',
  },
  {
    id: 'publish', kicker: 'For indie creators', title: 'Publish with us',
    body: 'Already shipping something honest? We help you reach the islands and the wider world with funding, localization, and community.',
    points: ['Funding & milestones', 'SEA-first localization', 'Marketing & launch', 'Community stewardship'],
    cta: 'Pitch your game', tone: 'luntian',
  },
]