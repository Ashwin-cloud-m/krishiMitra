# 🌾 KrishiMitra AI – Smart Farming, Shared Knowledge
### (कृषि मित्र AI • स्मार्ट शेती, समृद्ध ज्ञान • स्मार्ट खेती, साझा ज्ञान)

A decentralized, AI-powered agricultural advisory web platform engineered specifically for rural farming communities in India. **KrishiMitra AI** combines edge computer vision, local weather telematics, mother-tongue voice assistance, and a cryptographically verified peer knowledge network to empower small and marginal farmers.

---

## 🌟 Vision & Key Highlights

1. **Authentic Startup Visual Polish**: Nature-inspired aesthetic using forest greens (`#1b4332`), leaf greens (`#52b788`), warm cream (`#fdfbf7`), and earthy brown tones (`#8c5e34`). Clean typography (Inter + Noto Sans Devanagari) and high-contrast rural accessibility controls.
2. **Mother Tongue Voice-First (KrishiVoice / कृषीवाणी)**: Hands-free voice assistant supporting **Marathi (मराठी)**, **Hindi (हिन्दी)**, and **English (en-IN)** with real-time Speech-to-Text and Text-to-Speech synthesis tuned for outdoor field conditions.
3. **AI Leaf Disease Diagnostics**: Instant computer vision leaf pathology scanner for fungal, bacterial, and pest infestations. Features sample leaves for instant testing, visible symptoms checklist, dual organic bio-control and controlled chemical remediation, and strict safety disclaimers.
4. **Decentralized Knowledge Ledger**: Community discussions cryptographically hashed with SHA-256 and signed across participating institutional nodes (Krishi Vigyan Kendra AgroNodes and Sahyadri Farmer Producer Organizations). Exportable verifiable block ledger.
5. **Community Crop Alert Radar**: District-level early warning radar tracking Fall Armyworm, Pink Bollworm, downy mildew, and canal water shortages. Protects farmer GPS privacy via approximate 5km taluka clusters.
6. **PWA Offline-First Architecture**: Service worker caching of vital educational manuals, offline farm task tracking, and an Outbox Queue for posts and outbreak alerts submitted without connectivity.
7. **Soil & Carbon Sustainability Scorecard (0–100)**: Interactive ecological calculator quantifying organic matter management, drip irrigation coverage, and legume crop rotation with estimated annual input cost savings (₹/acre).
8. **Verified Government Schemes & Daily APMC Mandi**: Interactive 4-step subsidy eligibility checker (PM-Kisan, PMFBY, Per Drop More Crop) and live APMC market prices for soybean, onion, cotton, and wheat.
9. **Role-Based Security Console**: Interfaces for **Farmers**, **KVK Agronomist Experts**, **Community Moderators**, and **Decentralized Node Administrators**.

---

## 📂 Project Structure

```
proashwin/
├── package.json               # Project metadata & dependencies
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Nature-inspired agricultural palette
├── vite.config.ts             # Vite bundler configuration
├── server.js                  # Zero-dependency Node.js HTTP server & API gateway
├── README.md                  # Comprehensive platform documentation
│
├── public/                    # Production browser assets & PWA shell
│   ├── index.html             # Accessible entry page with PWA metadata
│   ├── app.js                 # Standalone client application bundle
│   ├── manifest.json          # PWA Web App Manifest
│   ├── sw.js                  # Service Worker with cache-first strategy
│   └── favicon.svg            # Sprout & leaf brand emblem
│
└── src/                       # Type-safe React + TypeScript source code
    ├── main.tsx               # React 18 DOM mount & SW registration
    ├── App.tsx                # Master state container & view router
    ├── index.css              # Custom themes, accessibility font scales
    ├── types/                 # Interfaces (User, Advisory, Disease, Alert, Node)
    ├── i18n/                  # Translations (English, Hindi, Marathi) & context
    ├── context/               # AuthContext, OfflineContext, AccessibilityContext
    ├── services/              # SpeechEngine, LeafVisionModel, CryptographicNode, ApiClient
    ├── data/                  # Datasets (APMC Mandi, Govt Schemes, Offline Guides, Alerts)
    ├── components/            # Reusable Navbar, BottomNav, Footer, KrishiVoiceModal, Disclaimer
    └── pages/                 # 12 complete platform views
        ├── LandingPage.tsx
        ├── FarmerDashboard.tsx
        ├── AiAdvisorPage.tsx
        ├── DiseaseScannerPage.tsx
        ├── CommunityPage.tsx
        ├── CropAlertMapPage.tsx
        ├── SustainabilityPage.tsx
        ├── SchemesPage.tsx
        ├── MarketplacePage.tsx
        ├── AuthPage.tsx
        ├── ProfileSettingsPage.tsx
        └── AdminExpertPage.tsx
```

---

## 🚀 Quick Start Instructions

### Option 1: Instant Run with Built-in Server
You can launch the platform with the included server:
```powershell
node server.js
```
The server will start on `http://localhost:3000`.

### Option 2: Direct Browser Launch
Because the application includes the standalone bundle in `public/app.js`, you can simply open `public/index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, or Safari) on desktop or mobile.

### Option 3: Development with Vite
If you have standard `npm` installed on your machine:
```bash
npm install
npm run dev
```

---

## 🛠️ Feature Walkthrough

### 1. Landing Page
- **Hero Title**: *"Your Farm. Your Knowledge. Your AI Advisor."*
- **Interactive Telematics Preview**: Switch between real-time Spray Window Feasibility, Pest Radar warnings, and Soil Carbon scores.
- **3-Step Farmer Onboarding**: Simple visual walkthrough (Speak/Snap → Triangulate → Act & Share).
- **Smallholder Economic Benefits**: Highlights 25-30% input cost reduction, 35% water savings, and mother-tongue accessibility.
- **Illustrative Community Stories**: Real-world case studies clearly labeled with verification disclaimers.

### 2. Farmer Dashboard
- **Crop & Stage Switcher**: Switch between Soybean, Onion, Cotton, Wheat, and Tomato with growth stages.
- **Micro-Climate Spray Window**: Optimal hours (e.g. 7:00 AM - 10:30 AM) calculated from wind velocity (<9 km/h) and rain probability.
- **Soil Health Card Indicators**: Displays pH (7.4), Organic Carbon (0.58%), and N-P-K nutrient status.
- **Urgent Farm Reminders**: Scheduled foliar spraying, sticky trap scouting, and drip filter backwash.
- **Resource Stewardship**: Tracks water liters saved and input spending against Kharif budget.

### 3. AI Farm Advisory Assistant
- **Interactive Chat Interface**: Ask questions via text or voice.
- **Farm Calibration Drawer**: Farmers can customize crop name, soil type, sowing stage, and irrigation method.
- **Voice Readout (TTS)**: Tap "Listen" to have the AI response spoken aloud in natural Marathi, Hindi, or English.
- **Uncertainty Calibration & Risk Escalation**: Confidence scores displayed with direct emergency call links to local Krishi Vigyan Kendra scientists.

### 4. Leaf Disease Diagnostic Scanner
- **One-Click Pre-set Samples**: Test instantly with Tomato Early Blight, Cotton Bacterial Blight, Maize Fall Armyworm, or Healthy Soybean.
- **Cellular Pattern Diagnostics**: Visible symptoms checklist with dual organic bio-control and controlled chemical remediation options.
- **Agronomic Disclaimer**: Advises physical field scouting before heavy pesticide application.

### 5. Decentralized Peer Knowledge Network
- **Cryptographic Content Hashing**: Posts are hashed using SHA-256 (`crypto.subtle`) and signed by originating institutional nodes.
- **Role Attribution**: Clear visual distinction between **👨‍🌾 Farmers**, **🔬 Verified KVK Agronomists**, and **🤖 KrishiMitra AI**.
- **Community Upvotes & Helpful Counter**: Transparent reputation metrics.
- **Exportable Knowledge Ledger**: One-click download of all cryptographically signed posts as an interoperable JSON bundle.

### 6. KrishiVoice Assistant (कृषीवाणी)
- **Voice-First Design**: Giant pulsing microphone with high-contrast controls for sunlight field visibility.
- **Multilingual Support**: Marathi (`mr-IN`), Hindi (`hi-IN`), and English (`en-IN`).
- **Low-Bandwidth Mode**: Strips heavy assets and prioritizes lightweight audio synthesis.

### 7. Community Crop Alert Map Radar
- **District-Level Outbreak Mapping**: Early warnings for pink bollworm, downy mildew, and canal water rotation delays.
- **Farmer Privacy Shield**: Approximate 5km taluka radius prevents disclosing exact plot coordinates.
- **Outbreak Reporting**: Report new field observations with instant peer verification.

### 8. Soil & Carbon Sustainability Scorecard
- **Dynamic 0–100 Score**: Recalculates in real time based on compost adoption, drip coverage percentage, and stubble retention.
- **Farmer Economic Return**: Displays estimated annual input savings (₹/acre) and carbon sequestration credit eligibility.

### 9. APMC Mandi Rates & Verified Schemes
- **Daily Mandi Rates**: Live market modal rates for Lasalgaon, Pimpalgaon, Akola, and Indore with trend arrows.
- **Subsidies & Schemes**: Interactive eligibility checker for PM-Kisan Samman Nidhi, PMFBY, and micro-irrigation subsidies.
- **Local Services Directory**: Contact info for custom tractor hiring, agri-drones, and NABL soil testing laboratories.

### 10. Role-Based Administration Console
- **KVK Agronomist Workstation**: Pending diagnosis verification queue.
- **Moderator Panel**: Flagged post inspection and misinformation removal.
- **Node Cluster Telemetry**: Peer ping, block height tracking, and cryptographic signature inspector across 3 institutional nodes.

---

## 🔒 Security & Privacy Practices

- **Zero Fabricated Readings**: Demo datasets are explicitly flagged with warning banners.
- **Privacy by Design**: Sensitive farmer GPS coordinates are generalized into 5km taluka clusters.
- **Decentralized Verification**: Posts carry SHA-256 hashes and digital signatures to prevent retroactive tampering.
- **Graceful Fallbacks**: Works offline via PWA caching and browser speech synthesis.

---

## 📜 License
KrishiMitra AI is open-source under the [MIT License](LICENSE).
*(C) 2026 KrishiMitra AgroNet Ecosystem • Empowering Rural Agricultural Communities*
