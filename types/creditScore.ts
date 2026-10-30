/**
 * Alternative Credit Scoring Model Types
 *
 * Comprehensive type definitions for an alternative credit scoring system
 * designed for unbanked/underbanked populations — specifically farmers
 * in rural India who lack traditional credit bureau history (e.g., CIBIL).
 *
 * The model leverages non-traditional data sources such as mobile money
 * transactions, utility payments, agricultural productivity, social capital,
 * rental history, and digital footprint to generate a credit score on a
 * 300–900 scale (aligned with CIBIL conventions).
 */

// ─────────────────────────────────────────────────────────────
// 1. Applicant Profile
// ─────────────────────────────────────────────────────────────

/** Gender options for applicant profiles */
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

/**
 * CreditApplicant
 *
 * Represents a farmer or rural applicant seeking credit.
 * Contains basic KYC-level identity information along with
 * location details relevant to the Indian rural context.
 */
export interface CreditApplicant {
  /** Unique identifier for the applicant */
  id: string;

  /** Full name of the applicant */
  name: string;

  /** Mobile phone number (primary contact & mobile money identifier) */
  phone: string;

  /** Village or hamlet name */
  village: string;

  /** District within the state */
  district: string;

  /** Indian state of residence */
  state: string;

  /** Last 4 digits of Aadhaar number for lightweight verification */
  aadhaarLastFour: string;

  /** Date of birth in ISO 8601 format (YYYY-MM-DD) */
  dateOfBirth: string;

  /** Gender of the applicant */
  gender: Gender;
}

// ─────────────────────────────────────────────────────────────
// 2. Alternative Data Sources
// ─────────────────────────────────────────────────────────────

/**
 * MobileMoneyData
 *
 * Captures the applicant's mobile money / digital wallet usage patterns.
 * Consistent mobile money activity is a strong proxy for cash-flow
 * regularity and financial discipline.
 */
export interface MobileMoneyData {
  /** Total number of transactions over the evaluation period */
  transactionCount: number;

  /** Average monthly transaction volume in INR */
  avgMonthlyVolume: number;

  /** Number of peer-to-peer transfers per month (indicates network activity) */
  p2pTransferFrequency: number;

  /**
   * Consistency score for recurring bill payments via mobile money.
   * 0 = no consistency, 100 = perfectly consistent every month.
   */
  billPaymentConsistency: number;

  /** Primary mobile money platform (e.g., 'PhonePe', 'GPay', 'Paytm') */
  mobilePlatform: string;

  /** Age of the mobile money account in days */
  accountAgeDays: number;

  /** Average number of mobile recharges per month */
  rechargeFrequency: number;
}

/**
 * A single monthly utility payment record.
 */
export interface UtilityPaymentRecord {
  /** Month of payment in YYYY-MM format */
  month: string;

  /** Amount paid in INR */
  amountPaid: number;

  /** Whether the payment was made on or before the due date */
  onTime: boolean;

  /** Name of the utility provider */
  provider: string;
}

/**
 * UtilityPaymentData
 *
 * Tracks electricity and water bill payment history.
 * On-time utility payments are a well-documented predictor
 * of credit-worthiness in financial inclusion literature.
 */
export interface UtilityPaymentData {
  /** Monthly electricity bill payment records */
  electricityPaymentHistory: UtilityPaymentRecord[];

  /** Monthly water bill payment records */
  waterBillHistory: UtilityPaymentRecord[];

  /**
   * Average number of days late across all utility payments.
   * 0 means all payments were on time; higher values indicate delays.
   */
  daysLateAvg: number;
}

/** Land ownership classification for agricultural land */
export type LandOwnershipType = 'owned' | 'leased' | 'shared';

/**
 * AgricultureData
 *
 * Captures farming-related data that reflects the applicant's
 * economic productivity, investment behaviour, and risk management.
 * This is the most domain-specific data source and carries
 * significant weight for rural farmer credit scoring.
 */
export interface AgricultureData {
  /** Type of land ownership */
  landOwnership: LandOwnershipType;

  /** Total cultivable land in acres */
  landSizeAcres: number;

  /** Number of different crop varieties grown (higher = more diversified risk) */
  cropDiversity: number;

  /** Average yield per acre in quintals */
  avgYieldPerAcre: number;

  /** Total investment in irrigation infrastructure in INR */
  irrigationInvestment: number;

  /** List of farming equipment owned (e.g., 'tractor', 'rotavator', 'sprayer') */
  equipmentOwned: string[];

  /** Total years of farming experience */
  farmingExperienceYears: number;

  /** Whether the farmer holds organic certification */
  organicCertified: boolean;

  /** Whether the farmer uses drip or micro-irrigation techniques */
  usesDrip: boolean;

  /**
   * Crop insurance history — array of past insurance records.
   * Each entry includes season, provider, premium paid, and claim status.
   */
  cropInsuranceHistory: CropInsuranceRecord[];
}

/**
 * A single crop insurance record for a season.
 */
export interface CropInsuranceRecord {
  /** Agricultural season (e.g., 'Kharif 2024', 'Rabi 2023') */
  season: string;

  /** Insurance provider name */
  provider: string;

  /** Premium amount paid in INR */
  premiumPaid: number;

  /** Whether a claim was filed */
  claimFiled: boolean;

  /** Whether the claim was settled (null if no claim was filed) */
  claimSettled: boolean | null;
}

/**
 * SocialCapitalData
 *
 * Measures community trust, group participation, and social
 * network strength. In rural India, Self-Help Groups (SHGs)
 * and cooperatives serve as powerful trust proxies.
 */
export interface SocialCapitalData {
  /** Whether the applicant is a member of a Self-Help Group */
  selfHelpGroupMember: boolean;

  /** Number of consecutive months the applicant has contributed to group savings */
  groupSavingsMonths: number;

  /**
   * Community trust score derived from endorsements by community members.
   * 0 = no endorsements, 100 = highest possible community trust.
   */
  communityTrustScore: number;

  /** Whether the applicant is a member of an agricultural cooperative */
  cooperativeMembership: boolean;

  /** Number of successful referrals made by the applicant */
  referralCount: number;

  /** Number of established relationships with local businesses (suppliers, buyers) */
  localBusinessRelationships: number;
}

/**
 * A single monthly rental payment record.
 */
export interface RentalPaymentRecord {
  /** Month of payment in YYYY-MM format */
  month: string;

  /** Whether the rent was paid for this month */
  paid: boolean;

  /** Whether the payment was made on or before the due date */
  onTime: boolean;
}

/**
 * RentalPaymentData
 *
 * Tracks rental payment history for applicants who rent
 * housing or agricultural land. Consistent rental payments
 * demonstrate financial responsibility.
 */
export interface RentalPaymentData {
  /** Monthly rent amount in INR */
  monthlyRent: number;

  /** Monthly rental payment records */
  paymentHistory: RentalPaymentRecord[];

  /** Whether the landlord has verified the payment history */
  landlordVerified: boolean;
}

/**
 * DigitalFootprint
 *
 * Assesses the applicant's digital engagement level.
 * While not a direct financial indicator, digital literacy
 * and engagement correlate with access to information,
 * market prices, and modern farming techniques.
 */
export interface DigitalFootprint {
  /** Whether the applicant owns a smartphone */
  smartphoneOwnership: boolean;

  /** Number of months of active internet usage */
  internetUsageMonths: number;

  /**
   * Composite score of app usage patterns (farming apps, banking apps, etc.).
   * 0 = no meaningful app usage, 100 = highly engaged digital user.
   */
  appUsageScore: number;

  /** Number of e-commerce transactions (AgriMarket, Amazon, Flipkart, etc.) */
  ecommerceTransactions: number;

  /** Whether the applicant has an active social media presence */
  socialMediaPresence: boolean;
}

/**
 * AlternativeDataSources
 *
 * Aggregation of all non-traditional data sources used to
 * compute the alternative credit score. Each sub-section can
 * be partially available — the scoring model handles missing
 * data gracefully with adjusted weights.
 */
export interface AlternativeDataSources {
  /** Mobile money / digital wallet transaction data */
  mobileMoney: MobileMoneyData;

  /** Electricity and water utility payment history */
  utilityPayments: UtilityPaymentData;

  /** Agricultural productivity and investment data */
  agriculture: AgricultureData;

  /** Community trust and social group participation data */
  socialCapital: SocialCapitalData;

  /** Housing or land rental payment records */
  rental: RentalPaymentData;

  /** Digital engagement and literacy indicators */
  digitalFootprint: DigitalFootprint;
}

// ─────────────────────────────────────────────────────────────
// 3. Credit Score Result
// ─────────────────────────────────────────────────────────────

/** Risk category derived from the overall credit score */
export type RiskCategory = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';

/**
 * ScoreBreakdownItem
 *
 * Represents a single category's contribution to the overall
 * credit score, including the contributing factors.
 */
export interface ScoreBreakdownItem {
  /** Name of the scoring category (e.g., 'Mobile Money', 'Agriculture') */
  category: string;

  /** Score achieved in this category */
  score: number;

  /** Weight of this category in the overall score (0–1, all weights sum to 1) */
  weight: number;

  /** Maximum possible score for this category */
  maxScore: number;

  /** Human-readable factors that influenced the score in this category */
  factors: string[];
}

/**
 * CreditScoreResult
 *
 * The complete output of the alternative credit scoring model.
 * Contains the overall score, risk classification, detailed
 * breakdown by category, actionable recommendations, and
 * eligible credit products.
 */
export interface CreditScoreResult {
  /**
   * Overall credit score on a 300–900 scale,
   * aligned with CIBIL/TransUnion conventions in India.
   * - 300–499: Very High Risk
   * - 500–599: High Risk
   * - 600–699: Moderate Risk
   * - 700–799: Low Risk
   * - 800–900: Very Low Risk
   */
  overallScore: number;

  /** Risk category classification based on the overall score */
  riskCategory: RiskCategory;

  /**
   * Confidence level of the score prediction (0–100).
   * Higher values indicate more data was available and
   * the model's prediction is more reliable.
   */
  confidence: number;

  /** Detailed per-category score breakdown */
  breakdown: ScoreBreakdownItem[];

  /**
   * Actionable recommendations for the applicant to improve
   * their credit score (e.g., "Join a Self-Help Group",
   * "Set up auto-pay for electricity bills").
   */
  recommendations: string[];

  /** Credit products the applicant is eligible for based on their score */
  eligibleProducts: CreditProduct[];

  /** ISO 8601 timestamp when the score was generated */
  generatedAt: string;

  /** Whether this result was generated from demo/synthetic data */
  isDemo: boolean;
}

// ─────────────────────────────────────────────────────────────
// 4. Credit Product
// ─────────────────────────────────────────────────────────────

/** Types of credit products available for rural farmers */
export type CreditProductType =
  | 'micro_loan'
  | 'crop_loan'
  | 'equipment_loan'
  | 'kcc'
  | 'shg_loan';

/**
 * CreditProduct
 *
 * Represents a loan or credit product that the applicant
 * may qualify for based on their alternative credit score.
 * Includes Indian rural finance products like Kisan Credit
 * Card (KCC) and SHG group loans.
 */
export interface CreditProduct {
  /** Unique identifier for the credit product */
  id: string;

  /** Display name of the product (e.g., 'Kisan Credit Card') */
  name: string;

  /** Type/category of the credit product */
  type: CreditProductType;

  /** Name of the financial institution or MFI providing the product */
  provider: string;

  /** Maximum loan amount in INR */
  maxAmount: number;

  /**
   * Interest rate range as a human-readable string
   * (e.g., '4.0% - 7.0% p.a.')
   */
  interestRateRange: string;

  /** Loan tenure in months */
  tenureMonths: number;

  /** Minimum credit score required to be eligible for this product */
  minScoreRequired: number;

  /** Key features and benefits of the product */
  features: string[];
}

// ─────────────────────────────────────────────────────────────
// 5. Score History
// ─────────────────────────────────────────────────────────────

/**
 * ScoreHistoryEntry
 *
 * A single point-in-time record of the applicant's credit score.
 * Used to track score trends and identify improvement or
 * deterioration patterns over time.
 */
export interface ScoreHistoryEntry {
  /** Date of the score snapshot in ISO 8601 format (YYYY-MM-DD) */
  date: string;

  /** Credit score at this point in time (300–900) */
  score: number;

  /**
   * Change from the previous score entry.
   * Positive values indicate improvement, negative values indicate decline.
   * null for the first entry in history.
   */
  change: number | null;

  /** Key factors that influenced the score change */
  factors: string[];
}

// ─────────────────────────────────────────────────────────────
// 6. Model Configuration
// ─────────────────────────────────────────────────────────────

/**
 * CreditScoreConfig
 *
 * Configuration for the alternative credit scoring model's
 * category weights. Weights should sum to 1.0 (100%).
 * Adjusting these weights allows the model to be tuned
 * for different regional contexts or lender preferences.
 */
export interface CreditScoreConfig {
  /** Weight assigned to mobile money transaction data (0–1) */
  mobileMoney: number;

  /** Weight assigned to utility payment history (0–1) */
  utilityPayments: number;

  /** Weight assigned to agricultural data (0–1) */
  agriculture: number;

  /** Weight assigned to social capital indicators (0–1) */
  socialCapital: number;

  /** Weight assigned to rental payment history (0–1) */
  rental: number;

  /** Weight assigned to digital footprint data (0–1) */
  digitalFootprint: number;
}

/**
 * Default weights for the alternative credit scoring model.
 * Agriculture receives the highest weight for farmer applicants,
 * followed by mobile money and social capital.
 */
export const DEFAULT_CREDIT_SCORE_WEIGHTS: CreditScoreConfig = {
  mobileMoney: 0.20,
  utilityPayments: 0.15,
  agriculture: 0.30,
  socialCapital: 0.15,
  rental: 0.10,
  digitalFootprint: 0.10,
};
