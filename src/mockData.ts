import { KnowledgeNode, GraphConnection, Course, GalleryAsset, Project, Task, IdeaTrend } from './types';

export const INITIAL_NODES: KnowledgeNode[] = [
  {
    id: 'spa-arch',
    name: 'Spa Architecture',
    category: 'architectural',
    description: 'A comprehensive framework for designing restorative indoor wellness environments.',
    content: 'Our Spa Architecture balances deep, natural dark emerald stones with focused light-shaft structures. Designing spaces around raw stone formations optimizes thermal mass while creating a cathedral-like sanctuary.',
    impactScore: 94,
    resourcesCount: 12,
    relatedConcepts: ['Circadian Lighting', 'Tactile Surface Study', 'Zen Minimalist'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EYRz07WpefMPm2XCqjxpgpC6qkXoByxBj62AB4Fp4XpstbShZA0tZ3YwNH-huXBVHXSgBn0RElr27UHKAY3-tUuaPmgy3lnFYptOMLUz77a8EqRDq2mP7zWWBDC5t8f1LbQKymX9TV6O8YyoONj0DPCoYCYv5PR4rQr8bkjSDjfMxd2psyzx3DD0S0OT8O90YyfXTzdYUrZrGhkvlsMRE4QdwAlpQw7Uh0osZDnvoF2Vy6A0HyJk0beky9j84uzMp4rhZHH9tdA'
  },
  {
    id: 'thermal-dynamics',
    name: 'Thermal Dynamics',
    category: 'study',
    description: 'Technical analysis of dry and moist microclimate temperature zones within retreats.',
    content: 'Optimizing high-end recovery circuits by controlling humidity rates alongside variable infrared therapy. The transition between wood-panel saunas and glacial dip-tanks enhances circulation and lymphatic drainage.',
    impactScore: 88,
    resourcesCount: 4,
    relatedConcepts: ['Laconium Curing', 'Hydrothermal Radiators', 'Vapor Curing'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUF8l1Kc91WLs4kkngTmvPzgm4O539NUQZxIbJ7ylK5sQ39WQTpQbGSVOLwhCaLjf6df4XSei6DQWPuux08cC1nwufChUYGeae9IQjDsca1FYGyk1jh2jVe9c7Z5x9mhaSkdMTfbOS3Nc5Z33NajfLXU8lCCEraO-j8J8uGnDxyQ58t0qutBzxyQ046HHEr_nuqX0LKbwriWD_EfRrNmtS-rAGcd9kcdGGZNykoOmgyc2pVqhgSfT--1b5Gvxz1N7RIEcfK_pdDSk'
  },
  {
    id: 'sensory-mats',
    name: 'Sensory Materials',
    category: 'concept',
    description: 'Bespoke integration of high-tactility textures for psychological grounding.',
    content: 'Using hand-chiselled local dolomite stones alongside reclaimed warm cedar panels. The materials communicate safety and permanent grounding before any active hospitality service begins.',
    impactScore: 91,
    resourcesCount: 8,
    relatedConcepts: ['Acoustic Seclusion', 'Biomorphic Alignment', 'Natural Textures'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi03QHN7VBSvl0GjjumU7Diq3pK-qvt--mKs7zPGY8sbYKms57SSUnvRfKujLxzDqT5rKU0lT6wlQP8aYlIC9mRxf2gUYrIoSofEB22guI-gBqHzY7SUkVIf8tjAD6HcPW_RYrfqoKzXlBZR21LCp53RVCL8415gIwKxECtt0IR9KktG4zzdPXY1z8-aRwBquSIjdpJyx1_uKEU26FtLyLmAH_5jlAApeu_ZqAtGNPc1TobcBwjXCReAPRLLrdGH3EDzkAxO0qF2I'
  },
  {
    id: 'acoustic-seclusion',
    name: 'Acoustic Seclusion',
    category: 'architectural',
    description: 'Advanced sound dampening geometries to mute adjacent urban and environmental frequencies.',
    content: 'Eliminating echoing in high-vaulted spa ceilings using custom micro-perforated wood acoustic slats and heavy structural tapestries designed with abstract organic reliefs.',
    impactScore: 85,
    resourcesCount: 6,
    relatedConcepts: ['Ambient Noise Cancellation', 'Resonator Panels', 'Dolomite Isolation'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxmkm41gqK7H7G-kzqxaa7m8F3X8hgaytYWT552ak9McT_rt-sF4-YJPTscfttgLeu6qEx9KoPOUJ5CXsDk1zeZNGFvgFXWRA154yITpPwtycLl8AKjgXK8mLuIh1uv9IvkMcjH8JzsW7nGQPUYlaqsUK5CROcd0PG7fnlCq_1N35Io6utkKIejRi7UxMEKgshDrabcN8r_wis0eqCA45hHvjOHZq5vS3bTim4w1mKLsyxz_gUf7RezIbzaEBXnIvWWwk0wZSK4xY'
  }
];

export const GRAPH_CONNECTIONS: GraphConnection[] = [
  { source: 'spa-arch', target: 'thermal-dynamics', type: 'regulates' },
  { source: 'spa-arch', target: 'sensory-mats', type: 'utilizes' },
  { source: 'spa-arch', target: 'acoustic-seclusion', type: 'demands' },
  { source: 'sensory-mats', target: 'acoustic-seclusion', type: 'complements' }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'biophilic-hosp',
    title: 'Principles of Biophilic Hospitality',
    category: 'Architecture',
    duration: '6 hrs',
    level: 'Advanced',
    progress: 65,
    description: 'Integrating organic, architectural blueprints with natural foliage, ambient light wells, and natural microclimates to deliver quiet luxury.',
    instructor: 'Jean-Michel Gathy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs9LhVUb4gIoDqYGTqjxZ6xcO-MkV_iFhSCsE9tX7WLtQ2yuWELk7-OTsqjxiPAH4fyTiUCCzX3fo8Vewzb6CWh8iOTm4cPz4tKcZaEz7dxCtCUWJf1QT33fHJreKS3JZ_9D9mULbT7T-KgqiyeUxFV-h1Vg4RpDRv1-FyfBmVeGxCYxSHuxqu07mpd-sW50SWVDr0VEqH9Z3lRg2XUOU0aNzcQrijXp9yMEUiseaW-h-PvPlu7EH_f81BUyGCAI0883gzLY0LokU',
    lessons: [
      {
        id: 'lesson-bio-1',
        title: 'Introduction to Natural Silhouettes',
        duration: '45 mins',
        content: 'Biophilic geometry relies on curves and physical lines inspired by native plants and local geological formations. Rather than placing plant containers on standard desks, we must integrate structures where vegetation grows directly out of stone wall matrices, filtered by indirect sky-wells.',
        quiz: {
          question: 'What is the primary objective of structural integration in biophilic hospitality?',
          options: [
            'Inserting artificial plant pots into offices after builders complete construction',
            'Embedding live botanical systems into standard building columns to optimize air quality and emotional grounding',
            'Adding excessive digital monitors depicting rain forest vistas'
          ],
          correctAnswer: 1,
          explanation: 'Integrating live botanical structures provides a tangible sensory effect of permanent grounding and acoustic insulation.'
        }
      },
      {
        id: 'lesson-bio-2',
        title: 'Thermal Contouring & Water Seclusions',
        duration: '1 hr 15 mins',
        content: 'Integrating silent natural springs and geothermal structures in the heart of hospitality layouts. By shaping high-conductivity limestone paths around these thermal hubs, we establish natural radiant heating pathways.',
        quiz: {
          question: 'How do limestone pathways participate in Thermal Dynamics?',
          options: [
            'They act as simple walking areas with no energetic function',
            'They conduct heat from integrated thermal springs to provide natural floor-to-ceiling radiant heat',
            'They trigger cooling cycles for smart air-con networks'
          ],
          correctAnswer: 1,
          explanation: 'Limestone possesses significant thermal latency, radiating heat steadily and muting the hum of mechanical HVAC blowers.'
        }
      }
    ]
  },
  {
    id: 'omotenashi-tech',
    title: 'Omotenashi 2.0: Invisible Tech & Ethics',
    category: 'Service Curation',
    duration: '4 hrs',
    level: 'Master',
    progress: 32,
    description: 'Synthesizing age-old Japanese hospitality traditions of deep anticipation with hidden sensor suites, ambient predictive computing, and server-side memory.',
    instructor: 'Yusei Marumura',
    imageUrl: 'https://lh3.googleusercontent.com/AB6AXuD5uOUUYWq8b6VYPYTfbPOEU5sBpbSiJ34P4yxnILElR7BiReKIzMrd4XlMThHfekLSVaV4CNkursJWthxrOnimzOrnxwhbT8SeJ-dIUJNxjdCcvRDMfv5rSYxYILuRj9qT7RVTvJP3vdnr4v0ZFeFerN7yG-jUglNsTOrGKdAk1ItcKDNjv-C0bFaa31yHhtVUp3mOjmKUBtPv5Eay3Bqlfag5TrJVGR-4vPKjblY3t0Pdv6i4nl7b3jKiMRaDHEE_D_HkjYuiVes',
    lessons: [
      {
        id: 'lesson-omo-1',
        title: 'The Anticipatory Canvas',
        duration: '35 mins',
        content: 'Anticipatory service requires recognizing guest cycles before requests occur. For instance, modifying ambient bedroom humidity dynamically based on biometric skin data and sleep stage, without asking the guests to modify complex wall consoles.',
        quiz: {
          question: 'Omotenashi 2.0 suggests tech interfaces should be...',
          options: [
            'Vibrant with large flashing neon light bars and buttons everywhere',
            'Completely hidden and pre-emptive, utilizing predictive algorithms to align with guests biological rhythms silently',
            'Inoperable unless controlled via mobile app logins'
          ],
          correctAnswer: 1,
          explanation: 'True luxury means getting what you desire without ever feeling the friction of technology dashboards.'
        }
      }
    ]
  }
];

export const INITIAL_GALLERY: GalleryAsset[] = [
  {
    id: 'gal-plan-1',
    name: 'Zen Spa Wing - Floor Plan',
    category: 'architectural',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa1REZVoSopJ0rQxXTbE1o_lbHFgpLfwkmCXwFDFTgL22rt1fD-zHv4KMwV9q-edyQhwplG78-TrZTAKgU9ghoBd2P827rYw2g1GfNJIOlE3ZVNiuUnwQ9O_4FYoQUbBAajpHMZV3bj3QYRVijDwk11SpUzyqUdDG0D3ntJgfFEtHKJ8zB3H14NqffmSsq90sfXmgds7ZwDyVDuOWecWOabOROW7oJ3csMK_tmgAosg7Q6n1TC078mT7WEs8pXUt4hIjMrvgR0lSA',
    dimensions: '3400 x 2200 px',
    tags: ['Spa', 'Floor Plan', 'Architecture', 'Limestone']
  },
  {
    id: 'gal-mood-1',
    name: 'Serene Materials - Textures',
    category: 'moodboard',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhFGsmz59X7UlXFCtN56yBwEBCFNjwM1APgTVwxXDQbHMQeApKkb25ZChRyx9JzForckqiPKEndTtglk87vEtG_3oW1BSw4jXspQW25ajQg_QzrpaNOPEFeoefNZUtA-cE_U3sXs4qsDf1xD0YdkwKXmLARpO2HdBmIVua1eWkhlt4JEmnfl0gNvZI5ArRUsx_g6P2yKr97zb7rAZb42u6D1PVMx-nFwSf1erbAFhrA36AuzMXlK9HKUbjYBHvW77-ZO2jxI9f-2Q',
    dimensions: '1920 x 1280 px',
    tags: ['Linen', 'Cedar', 'Dolomite', 'Warm Cream']
  },
  {
    id: 'gal-light-1',
    name: 'Lighting Ambience - Dusk',
    category: 'lighting',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI0TGBBK_zFsaL4CC-FGw1No3Z2f1WGYkw4qYIoTKAAYoZv7FNQwCargSLDDVmMwNQo4s0bsYtJa1TCbWr_pJkNC43mNpIeVnAbre9hoZr05NzZcwoWInlY74DzoqWgw1BCjSiCeCb0C_WyP5Qyky4YUwi0OWlDlGjiWth-AH2dTRpCAjvweWcfK3R4-cOldJRovi1ZfuKmhgHQRIdCgWfw3_BfcS9l34VIZY0-Defl3dDRN41A4q3rx1Kcf2do_rSkxc2Y7ciHPQ',
    dimensions: '2560 x 1440 px',
    tags: ['Lobby', 'Dusk', 'Warm Glow', 'Ambient']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-spa',
    name: 'Suites Royales & Sensory Spa',
    type: 'spa',
    budget: '$14.2M',
    tasksCount: 16,
    completedTasksCount: 12,
    description: 'An elite Swiss Alpine spa retreat including 12 detached infinity pool villas, custom sauna vaults, and natural spring integrations.',
    status: 'designing',
    documents: ['Material_Specs_V2.pdf', 'Thermal_Analysis_Swiss.docx', 'Laconium_Guidelines.pdf']
  },
  {
    id: 'proj-garden',
    name: 'Elysora Botanical Gardens',
    type: 'garden',
    budget: '$4.5M',
    tasksCount: 8,
    completedTasksCount: 2,
    description: 'Lush organic multi-level gardens framing the hillside suites, optimized with localized microclimatic thermal channels.',
    status: 'planning',
    documents: ['Plant_Sociology_Survey.docx', 'Irrigation_Blueprints.pdf']
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-spa',
    title: 'Finalize structural stone mockups with dolomite suppliers',
    priority: 'high',
    status: 'inprogress',
    assignee: 'Jean-Michel Gathy',
    deadline: '2026-06-15'
  },
  {
    id: 'task-2',
    projectId: 'proj-spa',
    title: 'Audit sound insulation of spa vault corridors',
    priority: 'medium',
    status: 'todo',
    assignee: 'Vincenzo De Cotiis',
    deadline: '2026-06-22'
  },
  {
    id: 'task-3',
    projectId: 'proj-spa',
    title: 'Approve light conduit specs for circadian floor pathways',
    priority: 'high',
    status: 'completed',
    assignee: 'Elena Thorne',
    deadline: '2026-06-01'
  }
];

export const INITIAL_TRENDS: IdeaTrend[] = [
  {
    id: 'trend-1',
    title: 'Bespoke Bio-Amenity Formulations',
    description: 'Deriving active luxury skincare lipids from live botanical garden cell matrices managed on-property, dynamically customized for guests seasonal skin index.',
    category: 'Wellness',
    impact: 'high',
    simulatedScenario: 'Scenario Simulator: Formulating active lipid chains on-property slashes product transport carbon footprints by 96% and boosts guest skin hydration indices by 42% compared to synthetic imports.'
  },
  {
    id: 'trend-2',
    title: 'Digital-Twin Structural Airflows',
    description: 'Using high-resolution server-side sensor models that match natural wind corridors of local valleys, adjusting villa windows automatically to channel cool mountain currents.',
    category: 'Architecture',
    impact: 'medium',
    simulatedScenario: 'Scenario Simulator: Enabling passive ventilation through digital twins decreases mechanical chiller loads by 34% during peak summer, maintaining pristine quietude.'
  }
];

export const INITIAL_COURSES_MGMT: Course[] = [
  {
    id: 'luxury-yield',
    title: 'Luxury Operations & Yield Management',
    category: 'Operations',
    duration: '5 hrs',
    level: 'Advanced',
    progress: 40,
    description: 'Bespoke forecasting models, premium suite pricing metrics, and dynamic staff alignment to deliver seamless guest experiences.',
    instructor: 'Fabienne Suter',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        id: 'lesson-yield-1',
        title: 'Dynamic Forecasting for Alpine Retreats',
        duration: '45 mins',
        content: 'Traditional hotels rely on generic third-party channels to discount premium rates. Elite alpine suites instead utilize dynamic environmental indices to shift pricing premiums. Rates must never fall below brand baseline to protect luxury exclusivity and maximize premium VIP guest configurations.',
        quiz: {
          question: 'What is the primary operational risk of standard OTA direct discount algorithms for boutique suites?',
          options: [
            'Overbooking wellness spa time allocations',
            'Sovereign brand equity dilution from public rate-slashing',
            'Restricting municipal clean energy grid configurations'
          ],
          correctAnswer: 1,
          explanation: 'Public discounting harms elite brand exclusivity and damages long-term customer trust.'
        }
      },
      {
        id: 'lesson-yield-2',
        title: 'Roster Synchronicity & Wellness Peaks',
        duration: '1 hr 15 mins',
        content: 'Service fatigue occurs when staffing does not match guest cycles. By tracking automated check-in and checkout streams alongside thermal spa bookings, we align our concierge rosters precisely with peaks in biological therapy cycles.',
        quiz: {
          question: 'How does roster synchronicity optimize premium service curation?',
          options: [
            'It forces staff to be on-call 24 hours continuously',
            'It aligns service shifts precisely with real-time biometric and wellness therapy spikes',
            'It automates guest registration so that employees are not required'
          ],
          correctAnswer: 1,
          explanation: 'Coordinating shift schedules with high-demand wellness curves minimizes stress and preserves peak luxury execution.'
        }
      }
    ]
  },
  {
    id: 'sustainable-finance',
    title: 'Sustainable Luxury Finance & Eco-Compliance',
    category: 'Finance',
    duration: '4 hrs',
    level: 'Master',
    progress: 15,
    description: 'Integrating capital expenditures for biophilic systems, natural energy retention audits, and green operational budgets.',
    instructor: 'Marc-Olivier Rochat',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        id: 'lesson-finance-1',
        title: 'Capital Auditing of Deep Biophilic Systems',
        duration: '1 hr',
        content: 'Embedding living thermal green walls or physical dolomite structures requires higher initial investment but cuts long-term HVAC cooling and humidity control bills by 45%. We justify this expense through energy retention and customer loyalty coefficients.',
        quiz: {
          question: 'What is the primary financial justification for high biophilic capital investments?',
          options: [
            'Increasing annual municipal property taxes',
            'Slashing thermodynamic cooling bills by 45% while boosting premium brand positioning and guest retention',
            'Lowering room rates to accommodate larger groups'
          ],
          correctAnswer: 1,
          explanation: 'Natural insulation reduces physical building operational overhead and appeals to environmentally conscious luxury customers.'
        }
      }
    ]
  }
];

export const INITIAL_GALLERY_MGMT: GalleryAsset[] = [
  {
    id: 'gal-mgmt-5',
    name: 'Chiffre d\'affaires minimum pour un hôtel en 2025',
    category: 'finance',
    imageUrl: '/src/assets/images/hotel_revenue_2025_1780860199149.png',
    dimensions: 'Interactive Financial Model',
    tags: ['Yield', 'Calculator', 'Acquisition', 'ROI', '2025 Target']
  },
  {
    id: 'gal-mgmt-1',
    name: 'Q1 Financial Ledger & Budgetary Balance',
    category: 'finance',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
    dimensions: 'Excel Spreadsheet Model',
    tags: ['Operations', 'Excel', 'Budget', 'Alpine Suites']
  },
  {
    id: 'gal-mgmt-2',
    name: 'Staffing Synchronicity & Roster Matrix',
    category: 'staffing',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
    dimensions: 'Matrix Guide',
    tags: ['Staffing', 'Scheduler', 'Operations', 'Concurrence']
  },
  {
    id: 'gal-mgmt-3',
    name: 'Eco-Compliance and Water Reclamation Study',
    category: 'planning',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop',
    dimensions: 'Audit PDF',
    tags: ['Sustainability', 'Greywater', 'Compliance', 'Swiss Alpine']
  },
  {
    id: 'gal-mgmt-4',
    name: 'Standard Operations Handbook (SOP) for Wellness VIPs',
    category: 'operations',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop',
    dimensions: 'SOP Document',
    tags: ['SOP', 'Operations', 'VIP Service', 'Omotenashi']
  }
];
