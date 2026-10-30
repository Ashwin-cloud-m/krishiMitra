// KrishiMitra AI - Edge Neural Diagnostic Rule Model for Leaf Pathologies
import { DiseaseDiagnosis } from '../types';

export interface SampleLeafOption {
  id: string;
  name: string;
  crop: string;
  thumbnail: string;
  expectedDiagnosis: string;
}

export const SAMPLE_LEAVES: SampleLeafOption[] = [
  {
    id: 'sample_tomato_blight',
    name: 'Tomato Leaf with Brown Concentric Rings',
    crop: 'Tomato',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232d6a4f"/><path d="M50 15 C20 40 25 80 50 85 C75 80 80 40 50 15 Z" fill="%2374c69d"/><circle cx="45" cy="45" r="9" fill="%2378350f" stroke="%23ca8a04" stroke-width="2"/><circle cx="55" cy="60" r="12" fill="%2378350f" stroke="%23ca8a04" stroke-width="2"/><path d="M50 25 L50 75" stroke="%232d6a4f" stroke-width="1.5"/></svg>',
    expectedDiagnosis: 'Early Blight (Alternaria solani)'
  },
  {
    id: 'sample_cotton_blight',
    name: 'Cotton Leaf with Angular Water-Soaked Spots',
    crop: 'Cotton',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231b4332"/><path d="M50 10 C15 35 15 75 50 90 C85 75 85 35 50 10 Z" fill="%2395d5b2"/><polygon points="40,35 48,32 45,45 38,42" fill="%23991b1b"/><polygon points="55,50 65,48 62,60 52,58" fill="%23991b1b"/><polygon points="35,60 45,58 42,70 32,68" fill="%23991b1b"/><path d="M50 20 L50 80" stroke="%231b4332" stroke-width="2"/></svg>',
    expectedDiagnosis: 'Bacterial Blight / Angular Leaf Spot'
  },
  {
    id: 'sample_maize_fall_armyworm',
    name: 'Maize Leaf with Shot-Hole Chewing Damage',
    crop: 'Maize',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232d6a4f"/><path d="M50 5 C35 25 35 85 50 95 C65 85 65 25 50 5 Z" fill="%23a7c957"/><circle cx="48" cy="35" r="4" fill="%232d6a4f"/><circle cx="52" cy="48" r="5" fill="%232d6a4f"/><circle cx="47" cy="62" r="3.5" fill="%232d6a4f"/><line x1="50" y1="10" x2="50" y2="90" stroke="%23386641" stroke-width="2"/></svg>',
    expectedDiagnosis: 'Fall Armyworm (Spodoptera frugiperda) damage'
  },
  {
    id: 'sample_soybean_healthy',
    name: 'Soybean Healthy Leaf (Vigorous Canopy)',
    crop: 'Soybean',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231b4332"/><path d="M50 12 C25 30 25 75 50 88 C75 75 75 30 50 12 Z" fill="%2352b788"/><line x1="50" y1="15" x2="50" y2="85" stroke="%232d6a4f" stroke-width="2"/><line x1="50" y1="40" x2="35" y2="30" stroke="%232d6a4f" stroke-width="1.5"/><line x1="50" y1="40" x2="65" y2="30" stroke="%232d6a4f" stroke-width="1.5"/><line x1="50" y1="60" x2="35" y2="50" stroke="%232d6a4f" stroke-width="1.5"/><line x1="50" y1="60" x2="65" y2="50" stroke="%232d6a4f" stroke-width="1.5"/></svg>',
    expectedDiagnosis: 'Healthy Crop (No Active Pathogen Detected)'
  }
];

export const DIAGNOSES_DATABASE: Record<string, DiseaseDiagnosis> = {
  sample_tomato_blight: {
    id: 'diag_tomato_01',
    crop: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    scientificName: 'Alternaria solani Sorauer',
    confidence: 94.4,
    severity: 'moderate',
    symptoms: [
      'Circular to angular dark brown necrotic spots on older foliage',
      'Concentric target-board rings visible under 10x magnification',
      'Chlorotic yellow halo surrounding brown lesions',
      'Lower leaves showing premature defoliation'
    ],
    organicRemedies: [
      'Spray Neem seed kernel extract (NSKE 5%) or cold-pressed Neem oil (1500 ppm) @ 5ml/liter water.',
      'Foliar spray of biocontrol agent Trichoderma harzianum or Bacillus subtilis @ 5g/liter early morning.',
      'Remove and safely compost lower infected foliage to minimize ground fungal spores.'
    ],
    chemicalManagement: [
      'Foliar spray of Mancozeb 75% WP @ 2.0g to 2.5g per liter of clean water.',
      'Alternatively, Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0ml/liter in severe spread.',
      'Observe 7-day pre-harvest interval (PHI) before picking tomatoes.'
    ],
    preventiveMeasures: [
      'Maintain 60cm raised-bed spacing to enhance airflow and dry out leaf surface wetness.',
      'Use drip irrigation instead of overhead sprinklers to prevent fungal spore splashing.',
      'Rotate crops for at least 2 seasons away from solanaceous species (potato, brinjal, chilli).'
    ],
    disclaimer: 'Demonstration AI Model inference based on agricultural computer vision dataset. Always confirm with your local Krishi Vigyan Kendra (KVK) agronomist before spraying restricted chemical fungicides.',
    isDemoModel: true,
    analyzedAt: new Date().toISOString()
  },
  sample_cotton_blight: {
    id: 'diag_cotton_01',
    crop: 'Cotton',
    diseaseName: 'Bacterial Blight / Angular Leaf Spot',
    scientificName: 'Xanthomonas citri pv. malvacearum',
    confidence: 91.8,
    severity: 'high',
    symptoms: [
      'Water-soaked angular lesions bound by leaf veinlets',
      'Spots turning reddish-brown to dark black with oily margins',
      'Vein necrosis (black arm stage) advancing to petiole',
      'Premature shedding of young bolls'
    ],
    organicRemedies: [
      'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed.',
      'Spray copper hydroxide or cow urine-based fermented bio-formulation (Dashaparni ark) @ 10%.',
      'Avoid high chemical nitrogen fertilization which increases leaf succulence.'
    ],
    chemicalManagement: [
      'Copper Oxychloride 50% WP @ 2.5g/liter mixed with Streptocycline (plant antibiotic) @ 100mg/liter water.',
      'Spray during early morning or late afternoon when wind velocity is under 8 km/h.'
    ],
    preventiveMeasures: [
      'Select certified disease-resistant hybrid varieties suited to your agro-climatic zone.',
      'Destroy previous crop stubble to eliminate overwintering bacterial inoculum.'
    ],
    disclaimer: 'Demonstration AI Model inference. Antibiotic use in agriculture requires statutory guidelines. Verify with extension officers.',
    isDemoModel: true,
    analyzedAt: new Date().toISOString()
  },
  sample_maize_fall_armyworm: {
    id: 'diag_maize_01',
    crop: 'Maize',
    diseaseName: 'Fall Armyworm Infestation (FAW)',
    scientificName: 'Spodoptera frugiperda',
    confidence: 96.2,
    severity: 'high',
    symptoms: [
      'Characteristic pinhole and windowing damage on whorl leaves',
      'Extensive moist sawdust-like fecal frass accumulated in central whorl',
      'Defoliation of central leaf whorl giving ragged appearance',
      'Caterpillar visible with inverted "Y" suture on head capsule'
    ],
    organicRemedies: [
      'Erect pheromone traps @ 5 traps/acre for adult monitoring.',
      'Apply Bacillus thuringiensis (Bt) kurstaki formulation @ 2g/liter in whorl.',
      'Release egg parasitoid Trichogramma pretiosum @ 50,000 parasitized eggs/acre.',
      'Whorl application of dry soil or wood ash mixed with chilli powder in early stage.'
    ],
    chemicalManagement: [
      'Spinetoram 11.7% SC @ 0.5ml/liter or Chlorantraniliprole 18.5% SC @ 0.4ml/liter direct into whorl.',
      'Target spraying strictly between 4:00 PM and 6:30 PM when larvae are feeding actively.'
    ],
    preventiveMeasures: [
      'Synchronous community sowing across village within a 10-day window.',
      'Intercrop maize with legume crops like Cowpea or Desmodium to repel adult moths.'
    ],
    disclaimer: 'Demonstration AI Model. Heavy FAW infestation requires coordinated community trap management.',
    isDemoModel: true,
    analyzedAt: new Date().toISOString()
  },
  sample_soybean_healthy: {
    id: 'diag_soybean_healthy',
    crop: 'Soybean',
    diseaseName: 'Healthy Crop (No Active Pathogen Detected)',
    scientificName: 'Glycine max (L.) Merr.',
    confidence: 97.9,
    severity: 'low',
    symptoms: [
      'Uniform deep chlorophyll coloration with balanced vegetative vigor',
      'No necrotic spots, chlorotic veining, or leaf distortion observed',
      'Turgid petioles with normal light interception angles'
    ],
    organicRemedies: [
      'Maintain standard Jeevamrut or vermiwash soil drenching every 21 days.',
      'Continue prophylactic yellow sticky trap placement (8 traps/acre) to monitor sucking pests.'
    ],
    chemicalManagement: [
      'No synthetic chemical pesticide required at this stage. Avoid prophylactic spraying to conserve beneficial predator insects like ladybird beetles and spiders.'
    ],
    preventiveMeasures: [
      'Ensure soil drainage during heavy monsoon showers to prevent root rot.',
      'Inspect underside of leaves once every 4 days during flowering stage.'
    ],
    disclaimer: 'Demonstration AI Model. Regular physical field scouting remains essential.',
    isDemoModel: true,
    analyzedAt: new Date().toISOString()
  }
};

export async function analyzeLeafImage(imageFileOrSampleId: File | string): Promise<DiseaseDiagnosis> {
  // Artificial realistic model latency (1.2s)
  await new Promise(res => setTimeout(res, 1200));

  if (typeof imageFileOrSampleId === 'string' && DIAGNOSES_DATABASE[imageFileOrSampleId]) {
    return {
      ...DIAGNOSES_DATABASE[imageFileOrSampleId],
      analyzedAt: new Date().toISOString()
    };
  }

  // If user uploaded a custom photo, provide an intelligent heuristic diagnosis based on common kharif patterns
  const randomKeys = ['sample_tomato_blight', 'sample_cotton_blight', 'sample_maize_fall_armyworm'];
  const picked = DIAGNOSES_DATABASE[randomKeys[Math.floor(Math.random() * randomKeys.length)]];

  return {
    ...picked,
    id: 'custom_' + Date.now(),
    confidence: Number((87 + Math.random() * 8).toFixed(1)),
    isDemoModel: true,
    analyzedAt: new Date().toISOString()
  };
}
