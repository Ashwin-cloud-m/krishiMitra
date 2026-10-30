// KrishiMitra AI - Core Types & Interfaces

export type UserRole = 'farmer' | 'expert' | 'moderator' | 'admin';
export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  state: string;
  district: string;
  village: string;
  landSizeAcre: number;
  primaryCrops: string[];
  preferredLanguage: SupportedLanguage;
  verifiedBadge?: boolean;
  expertCredentials?: string;
  avatar?: string;
}

export type RiskLevel = 'low' | 'moderate' | 'high';

export interface AdvisoryMessage {
  id: string;
  sender: 'user' | 'ai' | 'expert';
  text: string;
  timestamp: string;
  language: SupportedLanguage;
  confidence?: number; // e.g. 0.88 (88%)
  riskLevel?: RiskLevel;
  expertReferralRequired?: boolean;
  kvkContact?: {
    name: string;
    phone: string;
    district: string;
  };
  contextSnapshot?: Partial<FarmContext>;
  isDemo?: boolean;
}

export interface FarmContext {
  cropName: string;
  village: string;
  district: string;
  soilType: string;
  sowingDate?: string;
  cropStage: string;
  irrigationMethod: string;
  photoUrl?: string;
}

export interface DiseaseDiagnosis {
  id: string;
  crop: string;
  diseaseName: string;
  scientificName?: string;
  confidence: number; // 0 - 100
  severity: 'low' | 'moderate' | 'high' | 'severe';
  symptoms: string[];
  organicRemedies: string[];
  chemicalManagement: string[];
  preventiveMeasures: string[];
  disclaimer: string;
  isDemoModel: boolean;
  analyzedAt: string;
  sampleImageUrl?: string;
}

export interface CommunityAnswer {
  id: string;
  postId: string;
  authorName: string;
  authorRole: UserRole;
  authorVillage: string;
  content: string;
  timestamp: string;
  upvotes: number;
  isVerifiedExpertResponse?: boolean;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  village: string;
  district: string;
  timestamp: string;
  title: string;
  content: string;
  crop: string;
  photoUrl?: string;
  upvotes: number;
  helpfulCount: number;
  isVerifiedByExpert: boolean;
  expertComment?: string;
  reportsCount: number;
  isFlagged: boolean;
  answers: CommunityAnswer[];
  nodeId: string; // Decentralized Node Origin
  blockHash: string; // Cryptographic hash
  signature: string; // Cryptographic signature
}

export type AlertCategory = 'pest' | 'disease' | 'weather' | 'water';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface CropAlert {
  id: string;
  title: string;
  category: AlertCategory;
  crop: string;
  district: string;
  taluka: string;
  approximateRadiusKm: number;
  severity: AlertSeverity;
  verifiedFarmersCount: number;
  verifiedByExpert: boolean;
  reportedAt: string;
  description: string;
  photoUrl?: string;
  lat: number;
  lng: number;
  isDemo: boolean;
}

export interface WeatherDay {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  district: string;
  tempC: number;
  humidity: number;
  rainProbability: number;
  windSpeedKmh: number;
  condition: string;
  sprayWindowStatus: 'optimal' | 'moderate' | 'avoid';
  sprayWindowNote: string;
  forecast: WeatherDay[];
  lastUpdated: string;
  isDemo: boolean;
}

export interface SoilHealth {
  soilType: string;
  ph: number;
  organicCarbonPct: number;
  nitrogenKgHa: number;
  phosphorusKgHa: number;
  potassiumKgHa: number;
  healthScore: number;
  lastTestDate?: string;
  isSampleData: boolean;
}

export interface SustainabilityPillar {
  name: string;
  score: number;
  maxScore: number;
  status: 'good' | 'moderate' | 'needs_improvement';
  summary: string;
  tips: string[];
}

export interface SustainabilityReport {
  overallScore: number; // 0 - 100
  pillars: {
    soilHealth: SustainabilityPillar;
    waterStewardship: SustainabilityPillar;
    cropRotation: SustainabilityPillar;
    integratedPestMgmt: SustainabilityPillar;
    inputCostEfficiency: SustainabilityPillar;
  };
  estimatedInputSavingsRsPerAcre: number;
  recommendations: string[];
  missingDataPoints: string[];
  disclaimer: string;
}

export interface GovtScheme {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  ministry: string;
  eligibleCrops: string[];
  subsidyPercentage: string;
  maxBenefit: string;
  description: string;
  applicationUrl: string;
  documentsRequired: string[];
  lastVerifiedDate: string;
}

export interface MarketplaceService {
  id: string;
  title: string;
  category: 'equipment' | 'soil_testing' | 'drone' | 'storage' | 'fpo';
  providerName: string;
  contactPhone: string;
  district: string;
  address: string;
  pricing: string;
  verified: boolean;
  rating: number;
}

export interface MandiPrice {
  id: string;
  commodity: string;
  commodityHi: string;
  commodityMr: string;
  market: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceDate: string;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

export interface DecentralizedNode {
  nodeId: string;
  nodeName: string;
  organization: string;
  location: string;
  blockHeight: number;
  peersCount: number;
  latencyMs: number;
  syncStatus: 'synced' | 'syncing' | 'offline';
  publicKeySnippet: string;
}
