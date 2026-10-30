// KrishiMitra AI - Offline Cached Educational Knowledge Guides

export interface OfflineGuide {
  id: string;
  title: string;
  category: 'pest_control' | 'organic_inputs' | 'irrigation' | 'soil_care';
  readTime: string;
  summary: string;
  steps: string[];
  keyAdvice: string;
}

export const OFFLINE_GUIDES: OfflineGuide[] = [
  {
    id: 'guide_jeevamrut',
    title: 'How to Prepare Standard Jeevamrut (जीवामृत) at Farm',
    category: 'organic_inputs',
    readTime: '3 min read',
    summary: 'A potent bio-culture providing billions of beneficial soil microorganisms, enhancing nutrient uptake and reducing chemical dependency.',
    steps: [
      'Take a 200-liter plastic drum. Add 10 kg fresh indigenous cow dung and 5-10 liters fresh cow urine.',
      'Add 2 kg jaggery (organic cane sugar) and 2 kg pulse flour (gram / besan).',
      'Add a handful (approx. 100g) of undisturbed fertile soil from farm borders or banyan tree base (natural microbial inoculant).',
      'Fill drum with approx. 190 liters clean water. Stir clockwise for 2 minutes with a wooden stick.',
      'Cover with a damp gunny bag in shade. Stir twice daily for 5-7 days. Apply via drip or irrigation water.'
    ],
    keyAdvice: 'Use within 12 days of preparation for peak microbial count. Do not mix with synthetic fungicides.'
  },
  {
    id: 'guide_drip_maintenance',
    title: 'Acid Treatment for Clogged Drip Irrigation Emitters',
    category: 'irrigation',
    readTime: '4 min read',
    summary: 'Hard water causes calcium carbonate scaling inside dripper labyrinths, cutting discharge uniformity by up to 50%.',
    steps: [
      'Flush lateral lines thoroughly by opening end caps with pump running at full pressure.',
      'Determine hydrochloric acid (HCl 33%) dosage: approximately 1.5 to 2 liters per 1,000 liters of system water volume to achieve target pH 4.0.',
      'Inject acid through venturi injector into running drip system.',
      'Turn off pump when acidified water reaches the furthest lateral emitter. Let acid dwell for 12 to 24 hours to dissolve scale.',
      'Re-start pump and flush system vigorously with plain water to clear dislodged mineral deposits.'
    ],
    keyAdvice: 'Always wear rubber gloves and safety goggles when handling acid. Always add acid to water, never water to acid.'
  },
  {
    id: 'guide_yellow_traps',
    title: 'Deploying Sticky & Pheromone Traps for Pest Scouting',
    category: 'pest_control',
    readTime: '2 min read',
    summary: 'Early detection of sucking pests and borers prevents severe outbreaks and eliminates unnecessary chemical sprays.',
    steps: [
      'Yellow Sticky Traps: Install 8-10 traps per acre at 1 foot above crop canopy to trap whiteflies, aphids, and leafminers.',
      'Blue Sticky Traps: Install 6-8 traps per acre specifically targeting thrips in chilli, onion, and cotton.',
      'Pheromone Traps: Use specific female sex pheromone lures (e.g., Helilure for Helicoverpa, Spodolure for Spodoptera). Install 5 traps/acre.',
      'Inspect trap counts every 3 days. Clean sticky surface and replace pheromone lures every 25-30 days.'
    ],
    keyAdvice: 'Trap counts indicate pest population pressure. Spray only when Economic Threshold Level (ETL) is breached.'
  }
];
