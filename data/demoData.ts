// KrishiMitra AI - Agricultural Demo Datasets (Clearly Labeled as Demo Data)
import { 
  CommunityPost, 
  CropAlert, 
  WeatherData, 
  SoilHealth, 
  GovtScheme, 
  MarketplaceService, 
  MandiPrice, 
  SustainabilityReport 
} from '../types';

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_01',
    authorId: 'usr_farmer_99',
    authorName: 'Balasaheb Shinde',
    authorRole: 'farmer',
    village: 'Vinchur',
    district: 'Nashik',
    timestamp: '2 hours ago',
    title: 'Yellowing in lower leaves of 35-day-old Soybean – is it Nitrogen deficiency or Yellow Mosaic?',
    content: 'My JS-335 soybean crop was sown 35 days ago. After the continuous drizzle last week, lower leaves are showing pale yellow discoloration between veins. What should I spray? Drip irrigation is installed.',
    crop: 'Soybean',
    photoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80"><rect width="100" height="80" fill="%232d6a4f"/><path d="M50 15 C30 30 30 65 50 72 C70 65 70 30 50 15 Z" fill="%23eab308"/></svg>',
    upvotes: 14,
    helpfulCount: 8,
    isVerifiedByExpert: true,
    expertComment: 'Verified: Leaf examination confirms transient moisture-induced nitrogen leaching, not viral Yellow Mosaic. Whitefly vectors are absent. Apply foliar 19:19:19 @ 5g/L.',
    reportsCount: 0,
    isFlagged: false,
    answers: [
      {
        id: 'ans_01',
        postId: 'post_01',
        authorName: 'Dr. Sunita Deshmukh',
        authorRole: 'expert',
        authorVillage: 'KVK Pimpalgaon',
        content: 'Check the leaf undersides for whitefly nymphs. If whiteflies are absent and veins remain green, this is temporary nitrogen leaching due to water-logging in black soil. Spray 19:19:19 soluble fertilizer @ 5g/liter water + micro-nutrients. Avoid heavy nitrogen soil drenching until the soil aerates.',
        timestamp: '1 hour ago',
        upvotes: 21,
        isVerifiedExpertResponse: true
      },
      {
        id: 'ans_02',
        postId: 'post_01',
        authorName: 'Tukaram Jadhav',
        authorRole: 'farmer',
        authorVillage: 'Niphad',
        content: 'I had the same issue last Kharif. Drenching cow urine mixed with water (1:10) cleared the yellowing within 4 days.',
        timestamp: '45 mins ago',
        upvotes: 6
      }
    ],
    nodeId: 'node_kvk_nashik_01',
    blockHash: '0x8f2d1e99a4c8034567b120ef9a34bc9876543210fedcba987654321012345678',
    signature: 'sig_ed25519_4b1a89f9node_kvk'
  },
  {
    id: 'post_02',
    authorId: 'usr_farmer_88',
    authorName: 'Harpreet Singh',
    authorRole: 'farmer',
    village: 'Samrala',
    district: 'Ludhiana',
    timestamp: '5 hours ago',
    title: 'Experience with Happy Seeder for zero-till wheat sowing directly into paddy straw',
    content: 'Completed 12 acres of wheat sowing directly into standing Basmati residue using a Super Seeder / Happy Seeder. Soil moisture was conserved perfectly and fuel expense dropped by ₹1,400/acre. Attaching field view.',
    crop: 'Wheat',
    upvotes: 38,
    helpfulCount: 22,
    isVerifiedByExpert: true,
    expertComment: 'Field practice endorsed by PAU Ludhiana. Significant reduction in PM2.5 stubble emissions and enhanced organic carbon retention.',
    reportsCount: 0,
    isFlagged: false,
    answers: [
      {
        id: 'ans_03',
        postId: 'post_02',
        authorName: 'Dr. Rajesh Mann',
        authorRole: 'expert',
        authorVillage: 'KVK Ludhiana',
        content: 'Excellent adoption Harpreet ji. Ensure early irrigation at Crown Root Initiation (CRI) stage around 21 days after sowing. Monitor for pink stem borer.',
        timestamp: '3 hours ago',
        upvotes: 15,
        isVerifiedExpertResponse: true
      }
    ],
    nodeId: 'node_central_agronet_02',
    blockHash: '0x3a4b5c6d7e8f901234567890abcdef1234567890abcdef1234567890abcdef12',
    signature: 'sig_ed25519_9c8b7a6fnode_cen'
  },
  {
    id: 'post_03',
    authorId: 'usr_farmer_77',
    authorName: 'Ganesh Shinde',
    authorRole: 'farmer',
    village: 'Ozar',
    district: 'Nashik',
    timestamp: '1 day ago',
    title: 'Pink bollworm pheromone trap catch alert in BT-Cotton near Dindori border',
    content: 'Noticed 12 adult pink bollworm moths in our delta trap over the last 3 nights. Crop is currently at 65-day flower/boll formation stage. Fellow farmers in Dindori taluka, please check your traps immediately.',
    crop: 'Cotton',
    upvotes: 29,
    helpfulCount: 19,
    isVerifiedByExpert: false,
    reportsCount: 0,
    isFlagged: false,
    answers: [
      {
        id: 'ans_04',
        postId: 'post_03',
        authorName: 'KrishiMitra AI Advisor',
        authorRole: 'admin',
        authorVillage: 'Agro AI Engine',
        content: 'AI Notice: Trap catch exceeding 8 moths/night for 3 consecutive nights surpasses the Economic Threshold Level (ETL). Recommended action: Release Trichogramma bactrae egg parasitoids @ 60,000/acre or spray Profenofos 50% EC @ 2ml/L.',
        timestamp: '1 day ago',
        upvotes: 11
      }
    ],
    nodeId: 'node_fpo_sahyadri_03',
    blockHash: '0x9911223344556677889900aabbccddeeff0011223344556677889900aabbccdd',
    signature: 'sig_ed25519_11223344node_fpo'
  }
];

export const INITIAL_CROP_ALERTS: CropAlert[] = [
  {
    id: 'alert_01',
    title: 'Pink Bollworm (Pectinophora) Surge in Flowering Cotton',
    category: 'pest',
    crop: 'Cotton',
    district: 'Nashik',
    taluka: 'Dindori',
    approximateRadiusKm: 6.5,
    severity: 'high',
    verifiedFarmersCount: 8,
    verifiedByExpert: true,
    reportedAt: 'Today, 08:30 AM',
    description: 'Pheromone trap catches exceeded ETL threshold (>8 moths/night) across 4 neighboring villages. High risk to tender bolls.',
    lat: 20.1983,
    lng: 73.8447,
    isDemo: true
  },
  {
    id: 'alert_02',
    title: 'Downy Mildew Risk Warning following Humid Fog',
    category: 'disease',
    crop: 'Grapes / Tomato',
    district: 'Nashik',
    taluka: 'Pimpalgaon Baswant',
    approximateRadiusKm: 5.0,
    severity: 'critical',
    verifiedFarmersCount: 14,
    verifiedByExpert: true,
    reportedAt: 'Yesterday',
    description: 'Relative humidity exceeding 92% with morning dew poses severe sporulation conditions for Plasmopara viticola. Prophylactic copper spray advised.',
    lat: 20.1706,
    lng: 73.9842,
    isDemo: true
  },
  {
    id: 'alert_03',
    title: 'Canal Rotation Water Shortage Notice',
    category: 'water',
    crop: 'Sugarcane & Onion',
    district: 'Ahmednagar',
    taluka: 'Rahuri',
    approximateRadiusKm: 12.0,
    severity: 'medium',
    verifiedFarmersCount: 5,
    verifiedByExpert: false,
    reportedAt: '2 days ago',
    description: 'Irrigation department canal release delayed by 6 days for repair work. Conserve farm pond storage and switch to drip scheduling.',
    lat: 19.3942,
    lng: 74.6514,
    isDemo: true
  },
  {
    id: 'alert_04',
    title: 'Fall Armyworm (FAW) Early Whorl Damage',
    category: 'pest',
    crop: 'Maize',
    district: 'Indore',
    taluka: 'Depalpur',
    approximateRadiusKm: 8.0,
    severity: 'high',
    verifiedFarmersCount: 11,
    verifiedByExpert: true,
    reportedAt: '3 days ago',
    description: 'Windowing symptoms observed in 20-25 day old maize crop. Immediate whorl application of bio-agents or chemical spray recommended.',
    lat: 22.8488,
    lng: 75.5492,
    isDemo: true
  }
];

export const DEMO_WEATHER: WeatherData = {
  district: 'Nashik (Pimpalgaon Rural)',
  tempC: 28.5,
  humidity: 64,
  rainProbability: 15,
  windSpeedKmh: 7.2,
  condition: 'Partly Sunny, Gentle Breeze',
  sprayWindowStatus: 'optimal',
  sprayWindowNote: 'Excellent spraying conditions today between 7:00 AM - 10:30 AM (Wind < 9 km/h, rain chance low).',
  lastUpdated: '15 mins ago (Local Meteorological Feed)',
  isDemo: true,
  forecast: [
    { day: 'Today', date: '29 Oct', tempMax: 31, tempMin: 19, rainProb: 15, condition: 'Partly Cloudy', icon: '🌤️' },
    { day: 'Fri', date: '30 Oct', tempMax: 32, tempMin: 18, rainProb: 10, condition: 'Sunny & Clear', icon: '☀️' },
    { day: 'Sat', date: '31 Oct', tempMax: 30, tempMin: 19, rainProb: 25, condition: 'Passing Clouds', icon: '⛅' },
    { day: 'Sun', date: '01 Nov', tempMax: 29, tempMin: 20, rainProb: 45, condition: 'Isolated Showers', icon: '🌦️' }
  ]
};

export const DEMO_SOIL_HEALTH: SoilHealth = {
  soilType: 'Medium Deep Black Clay (Vertisol)',
  ph: 7.4,
  organicCarbonPct: 0.58, // Needs improvement
  nitrogenKgHa: 210, // Low
  phosphorusKgHa: 24, // Medium
  potassiumKgHa: 340, // High
  healthScore: 68,
  lastTestDate: '14 May 2026 (Govt Soil Health Card)',
  isSampleData: true
};

export const DEMO_SUSTAINABILITY: SustainabilityReport = {
  overallScore: 74,
  pillars: {
    soilHealth: {
      name: 'Soil Organic Carbon & Structure',
      score: 16,
      maxScore: 25,
      status: 'moderate',
      summary: 'Organic carbon is at 0.58%. Adding farmyard manure or vermicompost will improve microbial activity and water retention.',
      tips: ['Incorporate crop residue rather than burning', 'Apply 3-4 tonnes of FYM per acre before Rabi sowing']
    },
    waterStewardship: {
      name: 'Micro-Irrigation & Water Conservation',
      score: 22,
      maxScore: 25,
      status: 'good',
      summary: 'Drip irrigation installed across 80% acreage. Saves an estimated 35-40% water compared to furrow flooding.',
      tips: ['Add inline pressure gauges to detect emitter clogging', 'Schedule irrigation during early morning to cut evaporation']
    },
    cropRotation: {
      name: 'Crop Diversity & Legume Integration',
      score: 18,
      maxScore: 20,
      status: 'good',
      summary: 'Good rotation with Soybean (nitrogen fixer) followed by Rabi Wheat and Vegetables.',
      tips: ['Consider summer green manuring with Sunn hemp (Dhaincha)']
    },
    integratedPestMgmt: {
      name: 'Bio-control & Rational Pesticide Use',
      score: 10,
      maxScore: 15,
      status: 'moderate',
      summary: 'Yellow sticky traps installed. Synthetic pesticide sprays applied only when ETL exceeded.',
      tips: ['Deploy pheromone traps for early moth detection', 'Use neem oil as first line of defense']
    },
    inputCostEfficiency: {
      name: 'Input Cost Optimization',
      score: 8,
      maxScore: 15,
      status: 'moderate',
      summary: 'Excess DAP application noted last season. Soil-test based fertilizer will reduce spending.',
      tips: ['Switch to split nitrogen application to minimize leaching losses']
    }
  },
  estimatedInputSavingsRsPerAcre: 4850,
  recommendations: [
    'Apply 3 tonnes of decomposed compost per acre before Rabi season.',
    'Install tensiometers or simple soil moisture sensors to optimize drip frequency.',
    'Test with Trichoderma bio-fungicide seed treatment to avoid expensive chemical root drenching.'
  ],
  missingDataPoints: [
    'Secondary micro-nutrients (Zinc & Boron) test report missing (+10 accuracy points upon lab test entry).',
    'Electricity consumption meter reading for tube well.'
  ],
  disclaimer: 'Educational scoring model based on self-reported agronomic practices and Soil Health Card guidelines. Consult district agriculture officers for certified carbon credit validation.'
};

export const GOVT_SCHEMES: GovtScheme[] = [
  {
    id: 'sch_pm_kisan',
    name: 'PM-Kisan Samman Nidhi Yojana',
    nameHi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    nameMr: 'प्रधानमंत्री किसान सन्मान निधी योजना',
    ministry: 'Ministry of Agriculture & Farmers Welfare, GoI',
    eligibleCrops: ['All Foodgrains', 'Horticulture', 'Oilseeds', 'Commercial'],
    subsidyPercentage: 'Direct Benefit Transfer (DBT)',
    maxBenefit: '₹6,000 per year (in 3 equal installments of ₹2,000)',
    description: 'Provides income support to all landholding farmer families across the country having cultivable land in their names.',
    applicationUrl: 'https://pmkisan.gov.in',
    documentsRequired: ['Aadhaar Card', 'Land ownership proof (7/12 extract or Jamabandi)', 'Bank Account linked to NPCI/Aadhaar'],
    lastVerifiedDate: 'Updated October 2026'
  },
  {
    id: 'sch_pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    nameHi: 'प्रधानमंत्री फसल बीमा योजना',
    nameMr: 'प्रधानमंत्री पीक विमा योजना',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    eligibleCrops: ['Kharif & Rabi Food crops', 'Oilseeds', 'Annual Commercial/Horticulture'],
    subsidyPercentage: 'Govt pays 80-90% of premium',
    maxBenefit: 'Full sum insured payout based on yield loss or prevented sowing',
    description: 'Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest stages. Nominal farmer premium: 2% for Kharif, 1.5% for Rabi, 5% for Horticulture.',
    applicationUrl: 'https://pmfby.gov.in',
    documentsRequired: ['Crop Sowing Certificate / Patwari Report', 'Land records', 'Bank passbook copy', 'Aadhaar Card'],
    lastVerifiedDate: 'Updated October 2026'
  },
  {
    id: 'sch_smam',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    nameHi: 'कृषि यंत्रीकरण पर उप-मिशन (SMAM)',
    nameMr: 'कृषी यांत्रिकीकरण उप-अभियान',
    ministry: 'Department of Agriculture & Cooperation',
    eligibleCrops: ['All Crops'],
    subsidyPercentage: '40% to 50% subsidy on farm implements',
    maxBenefit: 'Up to ₹1,25,000 on Tractors, Rotavators, Super Seeders, and Drones',
    description: 'Promotes modern agricultural machinery among small and marginal farmers, and provides financial assistance to establish Custom Hiring Centres (CHCs).',
    applicationUrl: 'https://agrimachinery.nic.in',
    documentsRequired: ['Identity Proof', 'Land Registry', 'Quotation from authorized dealer', 'Bank Account details'],
    lastVerifiedDate: 'Updated October 2026'
  },
  {
    id: 'sch_per_drop',
    name: 'Per Drop More Crop (Micro-Irrigation Subsidy)',
    nameHi: 'प्रति बूँद अधिक फसल (ड्रिप एवं स्प्रिंकलर)',
    nameMr: 'प्रति थेंब अधिक पीक (ठिबक व तुषार सिंचन)',
    ministry: 'Ministry of Jal Shakti & MoAFW',
    eligibleCrops: ['Vegetables', 'Fruits', 'Sugarcane', 'Cotton', 'Pulses'],
    subsidyPercentage: '55% for Small/Marginal farmers, 45% for other farmers',
    maxBenefit: 'Up to ₹55,000 per hectare for Drip and Sprinkler systems',
    description: 'Focuses on enhancing water use efficiency at farm level through micro-irrigation systems and precision water management.',
    applicationUrl: 'https://pmksy.gov.in',
    documentsRequired: ['Soil & Water test report', 'Land 7/12 document', 'Water source verification', 'Aadhaar Card'],
    lastVerifiedDate: 'Updated October 2026'
  }
];

export const MANDI_PRICES: MandiPrice[] = [
  {
    id: 'mandi_01',
    commodity: 'Soybean (Yellow)',
    commodityHi: 'सोयाबीन (पीला)',
    commodityMr: 'सोयाबीन (पिवळा)',
    market: 'Lasalgaon APMC',
    district: 'Nashik',
    minPrice: 4320,
    maxPrice: 4780,
    modalPrice: 4625,
    priceDate: 'Today (Live APMC Bulletin)',
    trend: 'up',
    unit: '₹ / Quintal'
  },
  {
    id: 'mandi_02',
    commodity: 'Onion (Red/Gavran)',
    commodityHi: 'प्याज (लाल)',
    commodityMr: 'कांदा (गावरान/लाल)',
    market: 'Pimpalgaon Baswant APMC',
    district: 'Nashik',
    minPrice: 1850,
    maxPrice: 3100,
    modalPrice: 2650,
    priceDate: 'Today',
    trend: 'up',
    unit: '₹ / Quintal'
  },
  {
    id: 'mandi_03',
    commodity: 'Cotton (Medium Staple)',
    commodityHi: 'कपास (मध्यम स्टेपल)',
    commodityMr: 'कापूस',
    market: 'Akola APMC',
    district: 'Akola',
    minPrice: 6800,
    maxPrice: 7450,
    modalPrice: 7210,
    priceDate: 'Yesterday',
    trend: 'stable',
    unit: '₹ / Quintal'
  },
  {
    id: 'mandi_04',
    commodity: 'Wheat (Sharbati / Lokwan)',
    commodityHi: 'गेहूँ (लोकवान)',
    commodityMr: 'गहू (लोकवान)',
    market: 'Indore Mandi',
    district: 'Indore',
    minPrice: 2450,
    maxPrice: 3020,
    modalPrice: 2780,
    priceDate: 'Today',
    trend: 'stable',
    unit: '₹ / Quintal'
  },
  {
    id: 'mandi_05',
    commodity: 'Tomato (Hybrid)',
    commodityHi: 'टमाटर (हाइब्रिड)',
    commodityMr: 'टोमॅटो (हायब्रिड)',
    market: 'Narayangaon Market Yard',
    district: 'Pune',
    minPrice: 900,
    maxPrice: 1800,
    modalPrice: 1450,
    priceDate: 'Today',
    trend: 'down',
    unit: '₹ / Crates (20 kg)'
  }
];

export const MARKETPLACE_SERVICES: MarketplaceService[] = [
  {
    id: 'srv_01',
    title: 'Precision Agri-Drone Spraying Service',
    category: 'drone',
    providerName: 'KisanUdan Tech & Agro Services',
    contactPhone: '+91 98224 55120',
    district: 'Nashik & Ahmednagar',
    address: 'Near MIDC Ambad, Nashik, Maharashtra',
    pricing: '₹450 per acre (Includes GPS route mapping & ultra-low volume nozzle spray)',
    verified: true,
    rating: 4.8
  },
  {
    id: 'srv_02',
    title: 'Custom Hiring Centre: 50HP 4WD Tractors & Rotavators',
    category: 'equipment',
    providerName: 'Shri Ram Agro Machineries CHC',
    contactPhone: '+91 94220 89321',
    district: 'Nashik',
    address: 'Station Road, Niphad, Dist. Nashik',
    pricing: '₹750 / hour with experienced operator and fuel',
    verified: true,
    rating: 4.6
  },
  {
    id: 'srv_03',
    title: 'Certified NABL Soil & Water Testing Laboratory',
    category: 'soil_testing',
    providerName: 'MahaAgro Agri-Diagnostics & Soil Lab',
    contactPhone: '+91 97631 44550',
    district: 'Nashik',
    address: 'Pimpalgaon Baswant Market Gate, Nashik',
    pricing: '₹350 for 12-parameter complete Soil Health Card report within 48 hours',
    verified: true,
    rating: 4.9
  },
  {
    id: 'srv_04',
    title: 'Solar Controlled Cold Storage & Onion Warehouses',
    category: 'storage',
    providerName: 'Sahyadri Agri Warehousing & Cold Chain',
    contactPhone: '+91 2557 241000',
    district: 'Nashik',
    address: 'Survey No. 314, Mohadi, Tal. Dindori, Nashik',
    pricing: '₹65 / crate / month (Temperature 2°C - 4°C, controlled relative humidity)',
    verified: true,
    rating: 4.9
  }
];
