/**
 * KrishiMitra AI – Smart Farming, Shared Knowledge
 * Standalone Client Application Bundle
 * (C) 2026 KrishiMitra AgroNet Ecosystem
 */

(function () {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const { useState, useEffect, useRef, createContext, useContext } = React;
  const h = React.createElement;

  // --------------------------------------------------------------------------
  // 1. MULTILINGUAL TRANSLATION DICTIONARY
  // --------------------------------------------------------------------------
  const translations = {
    en: {
      brandName: "KrishiMitra AI",
      tagline: "Smart Farming, Shared Knowledge",
      heroTitle: "Your Farm. Your Knowledge. Your AI Advisor.",
      heroSubtitle: "Empowering rural farmers with intelligent, community-driven agricultural guidance in their own language.",
      ctaGetAdvice: "Get Free Farm Advice",
      ctaCommunity: "Explore Farmer Community",
      ctaDiseaseScan: "Scan Crop Leaf",
      ctaVoice: "Start KrishiVoice",
      navHome: "Home",
      navDashboard: "Farmer Dashboard",
      navAdvisor: "AI Farm Advisor",
      navDisease: "Disease Scanner",
      navCommunity: "Farmer Community",
      navMap: "Crop Alert Map",
      navSustainability: "Soil & Sustainability",
      navSchemes: "Govt Schemes",
      navMarketplace: "Marketplace & Mandi",
      navProfile: "My Profile",
      navAdmin: "Admin / Expert",
      statusOnline: "Connected Live",
      statusOffline: "Offline Mode (Cached)",
      syncNow: "Sync Now",
      highContrast: "High Contrast",
      demoDataWarning: "Sample Demo Data – For demonstration and testing purposes.",
      disclaimerMedical: "AI diagnostic predictions are advisory. Please consult local KVK experts for severe chemical treatments.",
      greeting: "Namaste",
      weatherForecast: "Hyperlocal Weather & Spray Window",
      sprayingOptimal: "Optimal (Safe to spray)",
      farmingReminders: "Urgent Farm Reminders",
      soilHealthSummary: "Soil Health Overview",
      aiRecommendations: "Personalized AI Crop Recommendations",
      nearbyCommunityAlerts: "Recent Local Alerts",
      waterAndExpenses: "Resource Stewardship & Cost Tracker",
      askPlaceholder: "Ask anything about crops, pests, fertilizers, or water...",
      listening: "Listening in English...",
      speaking: "Speaking...",
      stopSpeaking: "Stop Audio",
      scannerTitle: "AI Leaf Disease Diagnostics",
      scannerSubtitle: "Snap or upload a leaf photograph to analyze fungal, bacterial, or pest damage.",
      uploadPrompt: "Drag & drop leaf photo or click to browse",
      takePhoto: "Open Camera",
      orPickSample: "Or test with real diseased leaf samples:",
      analyzing: "Analyzing leaf cellular patterns with neural vision model...",
      symptomsIdentified: "Visible Symptoms Identified",
      organicSolution: "Organic / Bio-control Measure",
      chemicalSolution: "Chemical Remediation (Controlled Dosage)",
      preventionTips: "Long-term Prevention & Soil Care",
      askCommunity: "Ask Community or Share Update",
      postTitle: "Topic / Question Title",
      postContent: "Describe what you are seeing in your field...",
      tagCrop: "Tag Crop",
      alertMapTitle: "Community Crop Pest & Climate Watch",
      alertMapSubtitle: "District-level early warnings aggregated from farmers and verified agronomists.",
      filterByCrop: "Filter by Crop",
      filterBySeverity: "Filter by Severity",
      allCrops: "All Crops",
      allSeverities: "All Severities",
      reportAlert: "Report Outbreak",
      sustainabilityTitle: "Soil Carbon & Agro-Sustainability Score",
      sustainabilitySubtitle: "Understand your farm's ecological balance, organic matter retention, and input cost savings.",
      schemesTitle: "Verified Government Schemes & Subsidies",
      eligibilityChecker: "Check My Eligibility",
      mandiPricesTitle: "APMC Daily Mandi Rates",
      localServicesTitle: "Nearby Agricultural Service Providers",
      fpoDirectory: "Farmer Producer Organizations (FPOs)"
    },
    hi: {
      brandName: "कृषि मित्र AI",
      tagline: "स्मार्ट खेती, साझा ज्ञान",
      heroTitle: "आपका खेत। आपका ज्ञान। आपका AI सलाहकार।",
      heroSubtitle: "ग्रामीण किसानों को उनकी अपनी भाषा में बुद्धिमान, समुदाय-संचालित कृषि मार्गदर्शन प्रदान करना।",
      ctaGetAdvice: "निःशुल्क कृषि सलाह पाएं",
      ctaCommunity: "किसान समुदाय देखें",
      ctaDiseaseScan: "पत्ती रोग की जांच करें",
      ctaVoice: "कृषिवाणी शुरू करें",
      navHome: "होम",
      navDashboard: "किसान डैशबोर्ड",
      navAdvisor: "AI कृषि सलाहकार",
      navDisease: "फसल रोग स्कैनर",
      navCommunity: "किसान समुदाय",
      navMap: "फसल अलर्ट नक्शा",
      navSustainability: "मृदा एवं स्थिरता",
      navSchemes: "सरकारी योजनाएं",
      navMarketplace: "बाजार एवं मंडी",
      navProfile: "मेरी प्रोफाइल",
      navAdmin: "प्रशासक / विशेषज्ञ",
      statusOnline: "लाइव कनेक्टेड",
      statusOffline: "ऑफलाइन मोड (कैश्ड)",
      syncNow: "अभी सिंक करें",
      highContrast: "उच्च कंट्रास्ट",
      demoDataWarning: "नमूना डेमो डेटा – केवल प्रदर्शन एवं परीक्षण हेतु।",
      disclaimerMedical: "AI नैदानिक परिणाम सलाहकारी हैं। रासायनिक छिड़काव से पूर्व स्थानीय कृषि विज्ञान केंद्र (KVK) से संपर्क करें।",
      greeting: "नमस्ते",
      weatherForecast: "स्थानीय मौसम एवं छिड़काव समय",
      sprayingOptimal: "अनुकूल (छिड़काव सुरक्षित)",
      farmingReminders: "कृषि कार्य अनुस्मारक",
      soilHealthSummary: "मृदा स्वास्थ्य विवरण",
      aiRecommendations: "व्यक्तिगत AI फसल सुझाव",
      nearbyCommunityAlerts: "आस-पास के अलर्ट",
      waterAndExpenses: "जल बचत एवं अनुमानित लागत",
      askPlaceholder: "फसल, कीट, खाद या सिंचाई के बारे में कुछ भी पूछें...",
      listening: "हिन्दी में सुन रहा हूँ...",
      speaking: "आवाज़ चल रही है...",
      stopSpeaking: "आवाज़ रोकें",
      scannerTitle: "AI पत्ती रोग पहचान",
      scannerSubtitle: "रोगग्रस्त पत्ती की फोटो अपलोड करें और तुरंत जैविक व रासायनिक उपचार पाएं।",
      uploadPrompt: "पत्ती का फोटो यहाँ अपलोड करें",
      takePhoto: "कैमरा खोलें",
      orPickSample: "या वास्तविक नमूना पत्ती से जांचें:",
      analyzing: "AI विज़न मॉडल से पत्ती की जांच हो रही है...",
      symptomsIdentified: "पहचाने गए मुख्य लक्षण",
      organicSolution: "जैविक / देशी उपचार",
      chemicalSolution: "रासायनिक प्रबंधन (नियंत्रित मात्रा)",
      preventionTips: "भविष्य में बचाव के उपाय",
      askCommunity: "सवाल पूछें या अनुभव साझा करें",
      postTitle: "विषय / सवाल का शीर्षक",
      postContent: "खेत में दिखने वाली समस्या का विवरण दें...",
      tagCrop: "फसल चुनें",
      alertMapTitle: "सामुदायिक कीट एवं मौसम निगरानी नक्शा",
      alertMapSubtitle: "किसानों और विशेषज्ञों द्वारा दर्ज किए गए ज़िला-स्तरीय अलर्ट।",
      filterByCrop: "फसल अनुसार",
      filterBySeverity: "गंभीरता अनुसार",
      allCrops: "सभी फसलें",
      allSeverities: "सभी स्तर",
      reportAlert: "अलर्ट दर्ज करें",
      sustainabilityTitle: "मृदा स्वास्थ्य एवं स्थिरता स्कोर",
      sustainabilitySubtitle: "अपने खेत का जैविक संतुलन समझें और खाद की लागत कम करें।",
      schemesTitle: "सत्यापित सरकारी योजनाएं एवं अनुदान",
      eligibilityChecker: "पात्रता जांचें",
      mandiPricesTitle: "दैनिक APMC मंडी भाव",
      localServicesTitle: "निकटवर्ती कृषि सेवाएं एवं मशीनरी",
      fpoDirectory: "किसान उत्पादक संगठन (FPO)"
    },
    mr: {
      brandName: "कृषि मित्र AI",
      tagline: "स्मार्ट शेती, समृद्ध ज्ञान",
      heroTitle: "तुमची शेती. तुमचे ज्ञान. तुमचा AI सल्लागार.",
      heroSubtitle: "ग्रामीण भागातील शेतकऱ्यांना त्यांच्या स्वतःच्या भाषेत AI आणि शेतकरी समुदायाचे अचूक मार्गदर्शन.",
      ctaGetAdvice: "मोफत शेती सल्ला मिळवा",
      ctaCommunity: "शेतकरी समुदाय पहा",
      ctaDiseaseScan: "पानावरील रोग ओळखा",
      ctaVoice: "कृषीवाणी सुरू करा",
      navHome: "मुख्यपृष्ठ",
      navDashboard: "शेतकरी डॅशबोर्ड",
      navAdvisor: "AI शेती सल्लागार",
      navDisease: "पीक रोग स्कॅनर",
      navCommunity: "शेतकरी समुदाय",
      navMap: "पीक अलर्ट नकाशा",
      navSustainability: "माती व शाश्वत शेती",
      navSchemes: "शासकीय योजना",
      navMarketplace: "बाजार व मंडी",
      navProfile: "माझे प्रोफाईल",
      navAdmin: "प्रशासक / तज्ज्ञ",
      statusOnline: "थेट जोडलेले",
      statusOffline: "ऑफलाइन मोड (जतन)",
      syncNow: "आता सिंक करा",
      highContrast: "हाय कॉन्ट्रास्ट",
      demoDataWarning: "डेमो नमुना माहिती – प्रात्यक्षिक आणि चाचणीसाठी.",
      disclaimerMedical: "AI तपासणी ही केवळ प्राथमिक मार्गदर्शनासाठी आहे. फवारणीपूर्वी स्थानिक कृषी विज्ञान केंद्राशी (KVK) संपर्क साधा.",
      greeting: "रामराम",
      weatherForecast: "स्थानिक हवामान आणि फवारणी वेळ",
      sprayingOptimal: "योग्य वेळ (फवारणीसाठी उत्तम)",
      farmingReminders: "तातडीची शेती कामे",
      soilHealthSummary: "माती आरोग्य सारांश",
      aiRecommendations: "तुमच्या पिकासाठी AI शिफारसी",
      nearbyCommunityAlerts: "परिसरातील शेती अलर्ट",
      waterAndExpenses: "पाणी बचत आणि खर्च अंदाज",
      askPlaceholder: "पीक, कीड, खते किंवा सिंचनाबद्दल काहीही विचारा...",
      listening: "मराठीत ऐकत आहे...",
      speaking: "आवाज सुरू आहे...",
      stopSpeaking: "आवाज थांबवा",
      scannerTitle: "AI पान रोग निदान",
      scannerSubtitle: "रोगट पानाचा फोटो काढा आणि लगेचच सेंद्रिय व रासायनिक उपाय मिळवा.",
      uploadPrompt: "पानाचा फोटो इथे निवडा",
      takePhoto: "कॅमेरा सुरू करा",
      orPickSample: "किंवा नमुना पानावरून तपासा:",
      analyzing: "AI विजन मॉडेल पानाची तपासणी करत आहे...",
      symptomsIdentified: "दिसून आलेली लक्षणे",
      organicSolution: "सेंद्रिय / जैविक उपाय",
      chemicalSolution: "रासायनिक उपाय (प्रमाणबद्ध वापर)",
      preventionTips: "भविष्यातील काळजी आणि उपाय",
      askCommunity: "प्रश्न विचारा किंवा अनुभव शेअर करा",
      postTitle: "विषय / प्रश्नाचे शीर्षक",
      postContent: "तुमच्या शेतात काय दिसते आहे ते लिहा...",
      tagCrop: "पीक टॅग करा",
      alertMapTitle: "सामुदायिक कीड व हवामान सूचना नकाशा",
      alertMapSubtitle: "शेतकरी आणि शास्त्रज्ञांनी नोंदवलेले जिल्हास्तरीय अलर्ट.",
      filterByCrop: "पिकानुसार",
      filterBySeverity: "तीव्रतेनुसार",
      allCrops: "सर्व पिके",
      allSeverities: "सर्व स्तर",
      reportAlert: "अलर्ट नोंदवा",
      sustainabilityTitle: "माती आरोग्य व शाश्वतता गुण",
      sustainabilitySubtitle: "शेतीची उत्पादनक्षमता वाढवा आणि खतांचा वायफळ खर्च वाचवा.",
      schemesTitle: "सत्यापित शासकीय योजना आणि सबसिडी",
      eligibilityChecker: "पात्रता तपासा",
      mandiPricesTitle: "दैनिक बाजार भाव (APMC)",
      localServicesTitle: "परिसरातील कृषी सेवा व यंत्रे",
      fpoDirectory: "शेतकरी उत्पादक कंपन्या (FPO)"
    }
  };

  // --------------------------------------------------------------------------
  // 2. CONTEXTS (Language, Auth, Offline, Accessibility)
  // --------------------------------------------------------------------------
  const AppContext = createContext();

  function AppProvider({ children }) {
    const [language, setLanguage] = useState(localStorage.getItem('km_lang') || 'mr');
    const [user, setUser] = useState({
      id: 'usr_01',
      name: 'Ramesh Patil',
      role: 'farmer',
      village: 'Pimpalgaon Baswant',
      district: 'Nashik',
      landSizeAcre: 4.5,
      avatar: '👨‍🌾'
    });
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [outbox, setOutbox] = useState([]);
    const [highContrast, setHighContrast] = useState(false);
    const [fontSize, setFontSize] = useState('normal');

    useEffect(() => {
      localStorage.setItem('km_lang', language);
    }, [language]);

    useEffect(() => {
      if (highContrast) {
        document.documentElement.classList.add('high-contrast-mode');
      } else {
        document.documentElement.classList.remove('high-contrast-mode');
      }
    }, [highContrast]);

    useEffect(() => {
      document.documentElement.classList.remove('font-size-large', 'font-size-xlarge');
      if (fontSize === 'large') document.documentElement.classList.add('font-size-large');
      if (fontSize === 'xlarge') document.documentElement.classList.add('font-size-xlarge');
    }, [fontSize]);

    const switchRole = (role) => {
      const presets = {
        farmer: { name: 'Ramesh Patil', role: 'farmer', avatar: '👨‍🌾', village: 'Pimpalgaon Baswant', district: 'Nashik' },
        expert: { name: 'Dr. Sunita Deshmukh', role: 'expert', avatar: '🔬', village: 'KVK Pimpalgaon', district: 'Nashik' },
        moderator: { name: 'Amitabh Verma', role: 'moderator', avatar: '🛡️', village: 'Sanwer', district: 'Indore' },
        admin: { name: 'AgroNode Administrator', role: 'admin', avatar: '⚙️', village: 'Hub 01', district: 'Decentralized Network' }
      };
      setUser({ ...user, ...presets[role] });
    };

    const toggleSimulatedOffline = () => {
      setIsOnline(prev => !prev);
    };

    const syncOutbox = async () => {
      await new Promise(r => setTimeout(r, 600));
      setOutbox([]);
    };

    return h(AppContext.Provider, {
      value: {
        language,
        setLanguage,
        t: translations[language] || translations.en,
        user,
        setUser,
        switchRole,
        isOnline,
        toggleSimulatedOffline,
        outbox,
        setOutbox,
        syncOutbox,
        highContrast,
        setHighContrast: () => setHighContrast(p => !p),
        fontSize,
        increaseFontSize: () => setFontSize(f => f === 'normal' ? 'large' : 'xlarge'),
        decreaseFontSize: () => setFontSize(f => f === 'xlarge' ? 'large' : 'normal')
      }
    }, children);
  }

  // --------------------------------------------------------------------------
  // 3. SAMPLE LEAF DATA & DIAGNOSTIC REPOSITORY
  // --------------------------------------------------------------------------
  const SAMPLE_LEAVES = [
    {
      id: 'tomato_blight',
      name: 'Tomato Leaf (Dark Concentric Rings)',
      crop: 'Tomato',
      icon: '🍅',
      diseaseName: 'Early Blight (Alternaria solani)',
      confidence: 94.4,
      severity: 'moderate',
      symptoms: [
        'Concentric target-board brown rings on older foliage',
        'Chlorotic yellow halo surrounding brown necrotic lesions',
        'Lower leaves showing premature drying and defoliation'
      ],
      organicRemedies: [
        'Foliar spray of cold-pressed Neem oil (1500 ppm) @ 5ml/liter water.',
        'Apply bio-fungicide Trichoderma harzianum @ 5g/liter early morning.',
        'Prune and compost lower diseased leaves to stop spore splashing.'
      ],
      chemicalManagement: [
        'Spray Mancozeb 75% WP @ 2.0g to 2.5g per liter of clean water.',
        'Observe 7-day safe harvest interval before picking tomatoes.'
      ],
      preventiveMeasures: [
        'Use drip irrigation instead of sprinkler splashing.',
        'Rotate crops for at least 2 seasons away from solanaceous plants.'
      ]
    },
    {
      id: 'cotton_blight',
      name: 'Cotton Leaf (Angular Water-Soaked Spots)',
      crop: 'Cotton',
      icon: '☁️',
      diseaseName: 'Bacterial Blight / Angular Leaf Spot',
      confidence: 91.8,
      severity: 'high',
      symptoms: [
        'Water-soaked angular lesions bounded by leaf veinlets',
        'Vein necrosis (black arm stage) advancing along leaf petioles',
        'Early shedding of young squares and tender bolls'
      ],
      organicRemedies: [
        'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed.',
        'Foliar spray of Dashaparni ark (fermented botanicals) @ 10% dilution.'
      ],
      chemicalManagement: [
        'Copper Oxychloride 50% WP @ 2.5g/L + Streptocycline @ 100mg/L water.',
        'Spray during morning hours when wind velocity is under 8 km/h.'
      ],
      preventiveMeasures: [
        'Plant certified disease-resistant hybrid cotton varieties.',
        'Deep plow and bury previous season cotton crop residue.'
      ]
    },
    {
      id: 'maize_faw',
      name: 'Maize Leaf (Shot-Hole Whorl Chewing)',
      crop: 'Maize',
      icon: '🌽',
      diseaseName: 'Fall Armyworm Infestation (FAW)',
      confidence: 96.2,
      severity: 'high',
      symptoms: [
        'Typical windowing and ragged shot-hole perforation on central whorl',
        'Copious moist sawdust-like fecal frass inside leaf funnel',
        'Caterpillar visible with inverted "Y" mark on head capsule'
      ],
      organicRemedies: [
        'Erect pheromone traps @ 5 traps/acre for adult monitoring.',
        'Apply Bacillus thuringiensis (Bt) kurstaki formulation @ 2g/L into whorl.',
        'Apply wood ash or dry sand mixed with chilli powder in whorls.'
      ],
      chemicalManagement: [
        'Chlorantraniliprole 18.5% SC @ 0.4ml/liter direct into whorl.',
        'Spray between 4:30 PM and 6:30 PM when larvae feed actively.'
      ],
      preventiveMeasures: [
        'Synchronous community sowing across village within 10-day window.',
        'Intercrop with cowpea or pulses to disrupt adult flight.'
      ]
    },
    {
      id: 'soybean_healthy',
      name: 'Soybean Healthy Leaf (Vigorous Canopy)',
      crop: 'Soybean',
      icon: '🌱',
      diseaseName: 'Healthy Crop (No Active Pathogen Detected)',
      confidence: 97.9,
      severity: 'low',
      symptoms: [
        'Uniform deep chlorophyll green with balanced vegetative vigor',
        'No fungal rings, necrotic spots, or sucking pest chlorosis observed'
      ],
      organicRemedies: [
        'Continue regular Jeevamrut soil drenching every 21 days.',
        'Keep yellow sticky traps installed at 8 traps/acre for prophylactic monitoring.'
      ],
      chemicalManagement: [
        'No chemical pesticide required. Avoid unnecessary prophylactic sprays to conserve beneficial ladybird beetles and spiders.'
      ],
      preventiveMeasures: [
        'Ensure proper field drainage to prevent root rot during heavy rain.'
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // 4. COMMON COMPONENTS (Disclaimer, Header, BottomNav, VoiceModal)
  // --------------------------------------------------------------------------
  function DisclaimerBanner({ type = 'demo', text }) {
    const isAdvisory = type === 'advisory';
    const bg = isAdvisory ? 'bg-emerald-50 border-emerald-600 text-emerald-950' : 'bg-amber-50 border-amber-500 text-amber-900';
    const tag = isAdvisory ? 'Advisory Notice' : 'Demo Sandbox';
    const tagBg = isAdvisory ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900';
    return h('div', { className: `${bg} border-l-4 p-3 rounded-r-xl shadow-xs flex items-start gap-2.5 my-3 text-xs` },
      h('span', { className: 'text-base select-none' }, isAdvisory ? '🌿' : '🧪'),
      h('div', null,
        h('span', { className: `font-bold uppercase tracking-wider text-[10px] ${tagBg} px-1.5 py-0.5 rounded mr-2` }, tag),
        text || 'AI diagnostic predictions and sensor telematics are advisory demonstrations. Please consult local KVK experts for severe chemical treatments.'
      )
    );
  }

  function Header({ currentPage, setCurrentPage, onOpenVoice }) {
    const { language, setLanguage, t, user, switchRole, isOnline, toggleSimulatedOffline, outbox, highContrast, setHighContrast, fontSize, increaseFontSize, decreaseFontSize } = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [roleMenuOpen, setRoleMenuOpen] = useState(false);

    const navItems = [
      { id: 'home', label: t.navHome, icon: '🏠' },
      { id: 'dashboard', label: t.navDashboard, icon: '📊' },
      { id: 'advisor', label: t.navAdvisor, icon: '🤖' },
      { id: 'disease', label: t.navDisease, icon: '🍃' },
      { id: 'community', label: t.navCommunity, icon: '👥' },
      { id: 'map', label: t.navMap, icon: '🗺️' },
      { id: 'sustainability', label: t.navSustainability, icon: '🌱' },
      { id: 'schemes', label: t.navSchemes, icon: '📜' },
      { id: 'marketplace', label: t.navMarketplace, icon: '🏪' },
      { id: 'admin', label: t.navAdmin, icon: '⚙️' }
    ];

    return h('header', { className: 'sticky top-0 z-40 bg-[#1b4332] text-white shadow-md border-b border-[#2d6a4f]' },
      // Top utility bar
      h('div', { className: 'bg-[#143326] px-4 py-1 text-xs flex flex-wrap items-center justify-between border-b border-[#1b4332]/60' },
        h('div', { className: 'flex items-center gap-3' },
          h('button', {
            onClick: toggleSimulatedOffline,
            title: 'Click to toggle simulated offline mode for field testing',
            className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium transition-colors ${isOnline ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600' : 'bg-amber-900 text-amber-200 border border-amber-500 animate-pulse'}`
          },
            h('span', { className: `w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}` }),
            h('span', null, isOnline ? t.statusOnline : t.statusOffline)
          ),
          outbox.length > 0 && h('span', { className: 'bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full text-[10px] font-bold' }, `📤 ${outbox.length} Queued`)
        ),
        h('div', { className: 'flex items-center gap-2.5' },
          h('div', { className: 'flex items-center bg-[#1b4332] rounded border border-[#2d6a4f]' },
            h('button', { onClick: decreaseFontSize, className: 'px-1.5 py-0.5 text-stone-300 font-bold' }, 'A-'),
            h('span', { className: 'px-1.5 text-[10px] text-stone-400' }, fontSize === 'normal' ? '100%' : fontSize === 'large' ? '115%' : '130%'),
            h('button', { onClick: increaseFontSize, className: 'px-1.5 py-0.5 text-stone-300 font-bold' }, 'A+')
          ),
          h('button', {
            onClick: setHighContrast,
            className: `px-2 py-0.5 rounded text-xs border ${highContrast ? 'bg-yellow-400 text-black font-bold' : 'border-stone-600 text-stone-300'}`
          }, '◐ Contrast'),
          h('div', { className: 'flex items-center bg-[#1b4332] rounded border border-[#2d6a4f]' },
            ['mr', 'hi', 'en'].map(l => h('button', {
              key: l,
              onClick: () => setLanguage(l),
              className: `px-2 py-0.5 text-xs font-bold ${language === l ? 'bg-[#52b788] text-stone-950' : 'text-stone-300'}`
            }, l === 'mr' ? 'मराठी' : l === 'hi' ? 'हिन्दी' : 'EN'))
          )
        )
      ),

      // Main navbar
      h('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16' },
        h('div', {
          onClick: () => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); },
          className: 'flex items-center gap-3 cursor-pointer group'
        },
          h('div', { className: 'w-10 h-10 rounded-xl bg-gradient-to-tr from-[#52b788] to-[#74c69d] text-stone-950 flex items-center justify-center text-2xl font-bold shadow-md' }, '🌱'),
          h('div', null,
            h('div', { className: 'flex items-center gap-1.5' },
              h('span', { className: 'font-extrabold text-xl text-white tracking-tight' }, t.brandName),
              h('span', { className: 'text-[10px] font-bold bg-[#52b788] text-stone-950 px-1.5 py-0.2 rounded-full uppercase' }, 'AgroNet')
            ),
            h('p', { className: 'text-[11px] text-emerald-200 hidden sm:block' }, t.tagline)
          )
        ),

        // Desktop nav links
        h('nav', { className: 'hidden lg:flex items-center gap-1' },
          navItems.map(item => h('button', {
            key: item.id,
            onClick: () => { setCurrentPage(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); },
            className: `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${currentPage === item.id ? 'bg-[#2d6a4f] text-[#95d5b2]' : 'text-stone-200 hover:bg-[#2d6a4f]/50'}`
          },
            h('span', null, item.icon),
            h('span', null, item.label)
          ))
        ),

        // Right side CTA & persona
        h('div', { className: 'flex items-center gap-2.5' },
          h('button', {
            onClick: onOpenVoice,
            className: 'flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-[#52b788] text-stone-950 font-extrabold text-xs px-3.5 py-2 rounded-full shadow transition-transform hover:scale-105 active:scale-95'
          },
            h('span', { className: 'animate-pulse' }, '🎙️'),
            h('span', null, 'KrishiVoice')
          ),

          // User persona pill
          h('div', { className: 'relative' },
            h('button', {
              onClick: () => setRoleMenuOpen(!roleMenuOpen),
              className: 'flex items-center gap-1.5 bg-[#2d6a4f] hover:bg-[#40916c] px-3 py-1.5 rounded-xl text-xs text-white border border-[#52b788]/40'
            },
              h('span', null, user.avatar || '👨‍🌾'),
              h('span', { className: 'hidden sm:inline font-bold' }, user.name.split(' ')[0]),
              h('span', { className: 'text-[10px] text-stone-300' }, '▼')
            ),

            roleMenuOpen && h('div', { className: 'absolute right-0 mt-2 w-56 bg-white text-stone-900 rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-xs' },
              h('div', { className: 'px-3 py-2 border-b border-stone-100 font-bold text-stone-700' },
                `Active: ${user.name} (${user.role})`
              ),
              ['farmer', 'expert', 'moderator', 'admin'].map(r => h('button', {
                key: r,
                onClick: () => { switchRole(r); setRoleMenuOpen(false); },
                className: `w-full text-left px-3 py-2 rounded-xl flex items-center justify-between capitalize ${user.role === r ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-stone-50'}`
              },
                h('span', null, r === 'farmer' ? '👨‍🌾 Farmer' : r === 'expert' ? '🔬 Agronomist' : r === 'moderator' ? '🛡️ Moderator' : '⚙️ Admin'),
                user.role === r && h('span', null, '✓')
              ))
            )
          ),

          h('button', {
            onClick: () => setMenuOpen(!menuOpen),
            className: 'lg:hidden p-2 text-stone-200'
          }, '☰')
        )
      ),

      menuOpen && h('div', { className: 'lg:hidden bg-[#143326] px-4 py-3 space-y-1 border-t border-[#2d6a4f]' },
        navItems.map(item => h('button', {
          key: item.id,
          onClick: () => { setCurrentPage(item.id); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); },
          className: `w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${currentPage === item.id ? 'bg-[#2d6a4f] text-[#74c69d]' : 'text-stone-200'}`
        },
          h('span', null, item.icon),
          h('span', null, item.label)
        ))
      )
    );
  }

  function BottomNav({ currentPage, setCurrentPage, onOpenVoice }) {
    const tabs = [
      { id: 'home', label: 'Home', icon: '🏠' },
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'voice', label: 'Voice', icon: '🎙️', isAction: true },
      { id: 'disease', label: 'Scan', icon: '🍃' },
      { id: 'community', label: 'Forum', icon: '👥' }
    ];

    return h('div', { className: 'lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl px-2 py-1 safe-area-pb' },
      h('div', { className: 'flex items-center justify-around max-w-md mx-auto' },
        tabs.map(tab => {
          if (tab.isAction) {
            return h('button', {
              key: tab.id,
              onClick: onOpenVoice,
              className: '-mt-5 flex flex-col items-center'
            },
              h('div', { className: 'w-13 h-13 rounded-full bg-gradient-to-tr from-[#1b4332] to-[#40916c] text-white p-3 shadow-xl border-4 border-white flex items-center justify-center' },
                h('span', { className: 'text-xl' }, '🎙️')
              ),
              h('span', { className: 'text-[10px] font-bold text-[#1b4332] mt-0.5' }, 'Voice')
            );
          }
          const isActive = currentPage === tab.id;
          return h('button', {
            key: tab.id,
            onClick: () => { setCurrentPage(tab.id); window.scrollTo({ top: 0, behavior: 'smooth' }); },
            className: `flex flex-col items-center py-1 px-2 ${isActive ? 'text-[#2d6a4f] font-bold' : 'text-stone-500'}`
          },
            h('span', { className: 'text-lg leading-none' }, tab.icon),
            h('span', { className: 'text-[10px] mt-0.5' }, tab.label)
          );
        })
      )
    );
  }

  function KrishiVoiceModal({ isOpen, onClose }) {
    const { language, setLanguage, t, user } = useContext(AppContext);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [replyText, setReplyText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    if (!isOpen) return null;

    const handleMicClick = () => {
      if (isListening) {
        setIsListening(false);
        return;
      }

      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        alert('Voice speech recognition requires Chrome, Edge, or modern mobile browsers. You can tap preset questions below.');
        return;
      }

      try {
        const rec = new SpeechRec();
        const codes = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN' };
        rec.lang = codes[language] || 'hi-IN';
        rec.continuous = false;
        rec.interimResults = true;

        rec.onresult = (e) => {
          let str = '';
          for (let i = e.resultIndex; i < e.results.length; i++) {
            str += e.results[i][0].transcript;
          }
          setTranscript(str);
        };

        rec.onend = () => {
          setIsListening(false);
          if (transcript) processVoiceQuery(transcript);
        };

        rec.onerror = () => setIsListening(false);

        rec.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    };

    const processVoiceQuery = (q) => {
      let answer = '';
      if (language === 'mr') {
        answer = `तुमच्या ${user.district} भागातील पिकासाठी सल्ला: कडुनिंब तेल (1500 PPM) ५ मिली/लिटर फवारावे आणि ठिबक सिंचनाने सकाळी पाणी द्यावे. तीव्र कीड प्रादुर्भावासाठी KVK शास्त्रज्ञांशी संपर्क साधा.`;
      } else if (language === 'hi') {
        answer = `आपके ${user.district} क्षेत्र की फसल के लिए सलाह: नीम का तेल 5 मिली/लीटर का छिड़काव करें और सुबह के समय ड्रिप से पानी दें। गंभीर कीट प्रकोप पर KVK विशेषज्ञ से मिलें।`;
      } else {
        answer = `Advisory for ${user.district}: Apply Neem oil (1500 ppm) @ 5ml/L in the morning. Ensure moisture is checked prior to irrigation. Contact KVK agronomist for severe outbreaks.`;
      }

      setReplyText(answer);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(answer);
        const codes = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN' };
        utter.lang = codes[language] || 'hi-IN';
        utter.rate = 0.92;
        utter.onstart = () => setIsSpeaking(true);
        utter.onend = () => setIsSpeaking(false);
        utter.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utter);
      }
    };

    return h('div', { className: 'fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4' },
      h('div', { className: 'bg-[#fdfbf7] rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-[#2d6a4f] text-center relative' },
        h('button', {
          onClick: () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          },
          className: 'absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-200 text-stone-700 font-bold'
        }, '✕'),

        h('span', { className: 'text-3xl' }, '🎙️'),
        h('h3', { className: 'text-xl font-black text-[#1b4332] mt-1' }, 'KrishiVoice (कृषीवाणी)'),
        h('p', { className: 'text-xs text-stone-500 mb-4' }, 'Hands-free voice assistant designed for outdoor field conditions'),

        h('div', { className: 'flex justify-center gap-2 mb-4' },
          ['mr', 'hi', 'en'].map(l => h('button', {
            key: l,
            onClick: () => setLanguage(l),
            className: `px-3 py-1 rounded-full text-xs font-bold ${language === l ? 'bg-[#2d6a4f] text-white shadow' : 'bg-stone-200 text-stone-700'}`
          }, l === 'mr' ? 'मराठी' : l === 'hi' ? 'हिन्दी' : 'English'))
        ),

        // Giant mic button
        h('div', { className: 'my-6 flex justify-center' },
          h('button', {
            onClick: handleMicClick,
            className: `w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-xl transition-transform active:scale-95 ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-gradient-to-tr from-[#1b4332] to-[#40916c] text-white border-4 border-[#74c69d]'}`
          },
            h('span', { className: 'text-3xl' }, isListening ? '⏹️' : '🎙️'),
            h('span', { className: 'text-[10px] font-bold mt-1 uppercase tracking-wider' }, isListening ? 'Listening...' : 'Tap to Speak')
          )
        ),

        transcript && h('div', { className: 'bg-stone-100 p-3 rounded-xl text-left text-xs text-stone-800 mb-3 border border-stone-200' },
          h('span', { className: 'text-[10px] font-bold text-stone-500 block uppercase' }, 'You Asked:'),
          `"${transcript}"`
        ),

        replyText && h('div', { className: 'bg-emerald-50 p-3.5 rounded-xl text-left text-xs text-stone-800 mb-4 border border-emerald-200' },
          h('div', { className: 'flex justify-between items-center mb-1 text-[10px] font-bold text-emerald-800 uppercase' },
            h('span', null, '🤖 KrishiMitra Spoken Reply:'),
            isSpeaking && h('span', { className: 'text-emerald-700 animate-bounce' }, '🔊 Audio playing...')
          ),
          replyText
        ),

        // Preset chips
        h('div', { className: 'border-t border-stone-200 pt-3 text-left' },
          h('p', { className: 'text-[11px] font-bold text-stone-500 mb-1.5' }, 'Or tap a common question:'),
          h('div', { className: 'flex flex-wrap gap-1' },
            [
              language === 'mr' ? 'सोयाबीन वरील कीड नियंत्रण कसे करावे?' : language === 'hi' ? 'सोयाबीन में कीट नियंत्रण कैसे करें?' : 'Pest control in Soybean?',
              language === 'mr' ? 'ठिबक सिंचनाने पाणी कधी द्यावे?' : language === 'hi' ? 'ड्रिप से सही सिंचाई समय?' : 'When to irrigate via drip?',
              language === 'mr' ? 'शेतीचा खर्च कसा कमी करावा?' : language === 'hi' ? 'खेती की लागत कैसे घटाएं?' : 'How to reduce farm costs?'
            ].map((q, idx) => h('button', {
              key: idx,
              onClick: () => { setTranscript(q); processVoiceQuery(q); },
              className: 'text-[11px] bg-white hover:bg-emerald-50 text-stone-700 border border-stone-300 px-2.5 py-1 rounded-full'
            }, q))
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 5. VIEW 1: LANDING PAGE
  // --------------------------------------------------------------------------
  function LandingPage({ setCurrentPage, onOpenVoice }) {
    const { t, language } = useContext(AppContext);
    const [previewTab, setPreviewTab] = useState('spray');

    return h('div', null,
      // Hero
      h('section', { className: 'relative bg-gradient-to-b from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden' },
        h('div', { className: 'max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center' },
          h('div', { className: 'lg:col-span-7 space-y-6 text-center lg:text-left' },
            h('div', { className: 'inline-flex items-center gap-2 bg-[#2d6a4f]/80 border border-[#52b788]/60 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-200' },
              h('span', { className: 'w-2 h-2 rounded-full bg-emerald-400 animate-ping' }),
              h('span', null, 'कृषि तंत्रज्ञान २०२६ • Indian Rural Agritech')
            ),
            h('h1', { className: 'text-3xl sm:text-5xl font-black text-white leading-tight' }, t.heroTitle),
            h('p', { className: 'text-base sm:text-lg text-stone-200 font-normal leading-relaxed' }, t.heroSubtitle),
            h('div', { className: 'flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2' },
              h('button', {
                onClick: () => { setCurrentPage('advisor'); window.scrollTo({ top: 0, behavior: 'smooth' }); },
                className: 'px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#52b788] to-[#40916c] text-stone-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition-transform hover:scale-105'
              },
                h('span', null, '🤖'),
                h('span', null, t.ctaGetAdvice),
                h('span', null, '→')
              ),
              h('button', {
                onClick: () => { setCurrentPage('community'); window.scrollTo({ top: 0, behavior: 'smooth' }); },
                className: 'px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20'
              }, t.ctaCommunity),
              h('button', {
                onClick: onOpenVoice,
                className: 'px-4 py-3.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 font-bold text-sm border border-emerald-500/40 flex items-center gap-1.5'
              },
                h('span', null, '🎙️'),
                h('span', null, 'KrishiVoice')
              )
            )
          ),

          // Dashboard preview box
          h('div', { className: 'lg:col-span-5' },
            h('div', { className: 'bg-[#fdfbf7] text-stone-900 rounded-3xl p-5 shadow-2xl border-4 border-[#2d6a4f]' },
              h('div', { className: 'flex items-center justify-between border-b border-stone-200 pb-3 mb-4' },
                h('div', { className: 'flex items-center gap-2' },
                  h('span', { className: 'text-2xl' }, '🚜'),
                  h('div', null,
                    h('h3', { className: 'font-bold text-xs text-[#1b4332]' }, 'Live Agro-Sensor Telematics'),
                    h('p', { className: 'text-[10px] text-stone-500' }, 'Plot: Ramesh Patil • Pimpalgaon Baswant')
                  )
                ),
                h('span', { className: 'text-[9px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full' }, 'Live Demo')
              ),

              h('div', { className: 'grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl mb-4 text-xs font-semibold' },
                ['spray', 'alert', 'soil'].map(tab => h('button', {
                  key: tab,
                  onClick: () => setPreviewTab(tab),
                  className: `py-1 rounded-lg ${previewTab === tab ? 'bg-white text-[#1b4332] shadow font-bold' : 'text-stone-600'}`
                }, tab === 'spray' ? 'Spraying' : tab === 'alert' ? 'Pest Radar' : 'Soil Score'))
              ),

              previewTab === 'spray' && h('div', { className: 'space-y-3' },
                h('div', { className: 'bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between' },
                  h('div', null,
                    h('p', { className: 'text-xs font-bold text-emerald-950 uppercase' }, 'Optimal Spray Window Active'),
                    h('p', { className: 'text-[11px] text-emerald-800' }, '7:00 AM – 10:30 AM (Wind: 6.8 km/h • Rain: 10%)')
                  ),
                  h('span', { className: 'text-xs font-bold text-emerald-700 bg-emerald-200 px-2 py-1 rounded' }, 'Safe')
                ),
                h('div', { className: 'grid grid-cols-3 gap-2 text-center text-xs' },
                  h('div', { className: 'bg-stone-50 p-2 rounded-xl' }, h('span', { className: 'text-stone-500 text-[10px] block' }, 'Temp'), h('span', { className: 'font-bold' }, '28.5°C')),
                  h('div', { className: 'bg-stone-50 p-2 rounded-xl' }, h('span', { className: 'text-stone-500 text-[10px] block' }, 'Humidity'), h('span', { className: 'font-bold' }, '64% RH')),
                  h('div', { className: 'bg-stone-50 p-2 rounded-xl' }, h('span', { className: 'text-stone-500 text-[10px] block' }, 'Leaf Wetness'), h('span', { className: 'font-bold' }, 'Dry'))
                )
              ),

              previewTab === 'alert' && h('div', { className: 'bg-red-50 border border-red-200 p-3 rounded-2xl space-y-1' },
                h('div', { className: 'flex justify-between items-center' },
                  h('p', { className: 'text-xs font-bold text-red-900' }, '🐛 Pink Bollworm Surge'),
                  h('span', { className: 'text-[9px] font-bold bg-red-600 text-white px-2 py-0.2 rounded-full uppercase' }, 'High')
                ),
                h('p', { className: 'text-[11px] text-red-700' }, '5.4 km from plot • 8 farmers verified trap catches > 8 moths/night.')
              ),

              previewTab === 'soil' && h('div', { className: 'bg-[#1b4332] text-white p-3.5 rounded-2xl flex justify-between items-center' },
                h('div', null,
                  h('span', { className: 'text-xs text-emerald-300 font-semibold' }, 'Sustainability Index'),
                  h('p', { className: 'text-2xl font-black' }, '74 / 100')
                ),
                h('span', { className: 'text-xs bg-[#52b788] text-stone-950 font-bold px-2 py-1 rounded-full' }, '₹4,850/ac saved')
              ),

              h('div', { className: 'mt-4 pt-3 border-t border-stone-200 flex justify-between items-center text-xs' },
                h('span', { className: 'text-[10px] text-stone-500' }, 'Kharif 2026 AgroNode'),
                h('button', {
                  onClick: () => { setCurrentPage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); },
                  className: 'font-bold text-[#1b4332]'
                }, 'Open Dashboard →')
              )
            )
          )
        )
      ),

      // 3 Steps
      h('section', { className: 'py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
        h('div', { className: 'text-center max-w-2xl mx-auto mb-10' },
          h('span', { className: 'text-xs font-extrabold uppercase text-[#2d6a4f] bg-emerald-100 px-3 py-1 rounded-full' }, 'Simple 3-Step Process'),
          h('h2', { className: 'text-2xl sm:text-3xl font-black text-[#1b4332] mt-2' }, 'How KrishiMitra AI Works for Every Farmer')
        ),
        h('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
          [
            { num: '1', title: 'Speak or Snap a Photo', desc: 'Press KrishiVoice to ask in your language, or upload an affected leaf image.' },
            { num: '2', title: 'AI & Agronomist Triangulation', desc: 'Cross-referenced against soil type, season, and verified KVK scientists.' },
            { num: '3', title: 'Act & Share with Peers', desc: 'Get exact remedies with safe dilution. Broadcast alerts to protect neighboring farms.' }
          ].map(s => h('div', { key: s.num, className: 'bg-white p-6 rounded-3xl border border-stone-200 shadow-sm' },
            h('div', { className: 'w-12 h-12 rounded-2xl bg-emerald-100 text-[#1b4332] flex items-center justify-center font-black text-xl mb-3' }, s.num),
            h('h3', { className: 'font-bold text-base text-stone-900 mb-1' }, s.title),
            h('p', { className: 'text-xs text-stone-600 leading-relaxed' }, s.desc)
          ))
        )
      ),

      // Key Features Grid
      h('section', { className: 'py-14 bg-[#f7f4ea] border-y border-stone-200 px-4 sm:px-6 lg:px-8' },
        h('div', { className: 'max-w-7xl mx-auto' },
          h('div', { className: 'text-center max-w-2xl mx-auto mb-10' },
            h('h2', { className: 'text-2xl sm:text-3xl font-black text-[#1b4332]' }, 'Built for Rural Realities'),
            h('p', { className: 'text-xs text-stone-600 mt-1' }, 'Bridging the scientific expertise of agricultural universities to every village plot.')
          ),
          h('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
            [
              { icon: '🎙️', title: 'KrishiVoice', desc: 'Natural voice input and output in Marathi, Hindi, and English with offline audio playback.', page: 'advisor' },
              { icon: '🍃', title: 'Leaf Disease Scanner', desc: 'Computer vision diagnostics detecting blights and borers with exact organic and chemical dilutions.', page: 'disease' },
              { icon: '🗺️', title: 'Crop Alert Radar', desc: 'District-level pest outbreaks with 5km privacy masking and community verification.', page: 'map' },
              { icon: '👥', title: 'Decentralized Community', desc: 'Peer knowledge network with cryptographic SHA-256 signatures and KVK scientist badges.', page: 'community' },
              { icon: '🌱', title: 'Soil & Carbon Score', desc: 'Educational sustainability scorecard calculating annual input savings per acre.', page: 'sustainability' },
              { icon: '📜', title: 'Schemes & Mandi Rates', desc: 'Interactive eligibility checker for PM-Kisan & drip subsidies with daily APMC mandi rates.', page: 'schemes' }
            ].map((f, i) => h('div', { key: i, className: 'bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between' },
              h('div', null,
                h('span', { className: 'text-3xl mb-3 block' }, f.icon),
                h('h3', { className: 'font-bold text-base text-stone-900 mb-1' }, f.title),
                h('p', { className: 'text-xs text-stone-600 leading-relaxed' }, f.desc)
              ),
              h('button', {
                onClick: () => { setCurrentPage(f.page); window.scrollTo({ top: 0, behavior: 'smooth' }); },
                className: 'mt-4 text-xs font-bold text-[#2d6a4f] text-left hover:underline'
              }, 'Open Tool →')
            ))
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 6. VIEW 2: FARMER DASHBOARD
  // --------------------------------------------------------------------------
  function FarmerDashboard({ setCurrentPage, onOpenVoice }) {
    const { t, user, language } = useContext(AppContext);
    const [selectedCrop, setSelectedCrop] = useState('Soybean');
    const [selectedStage, setSelectedStage] = useState('Pod Development (४०-६५ दिवस)');

    return h('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6' },
      h(DisclaimerBanner, { text: 'Farmer Dashboard Demo: Micro-climate weather telemetry, soil health card parameters, and expense summaries are based on representative agricultural demo data.' }),

      // Welcome Banner
      h('div', { className: 'bg-[#1b4332] text-white p-6 rounded-3xl shadow-lg border-2 border-[#2d6a4f] flex flex-col md:flex-row md:items-center justify-between gap-4' },
        h('div', { className: 'flex items-center gap-4' },
          h('div', { className: 'w-14 h-14 rounded-2xl bg-white/10 text-3xl flex items-center justify-center border border-white/20' }, user.avatar),
          h('div', null,
            h('h2', { className: 'text-xl font-black' }, `${t.greeting}, ${user.name}`),
            h('p', { className: 'text-xs text-emerald-200' }, `📍 ${user.village}, ${user.district} • Land: ${user.landSizeAcre} Acres`)
          )
        ),
        h('div', { className: 'flex gap-2' },
          h('button', {
            onClick: onOpenVoice,
            className: 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5'
          }, h('span', null, '🎙️'), h('span', null, 'KrishiVoice')),
          h('button', {
            onClick: () => setCurrentPage('advisor'),
            className: 'bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-xs font-bold'
          }, 'AI Advisor →')
        )
      ),

      // Crop & Stage Selector
      h('div', { className: 'bg-white p-4 rounded-3xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs' },
        h('div', { className: 'flex items-center gap-2' },
          h('span', { className: 'font-bold text-stone-500' }, 'Crop:'),
          ['Soybean', 'Onion', 'Cotton', 'Wheat', 'Tomato'].map(c => h('button', {
            key: c,
            onClick: () => setSelectedCrop(c),
            className: `px-3 py-1.5 rounded-full font-bold ${selectedCrop === c ? 'bg-[#2d6a4f] text-white' : 'bg-stone-100 text-stone-700'}`
          }, c))
        ),
        h('div', { className: 'flex items-center gap-2' },
          h('span', { className: 'font-bold text-stone-500' }, 'Growth Stage:'),
          h('select', {
            value: selectedStage,
            onChange: e => setSelectedStage(e.target.value),
            className: 'bg-stone-50 border border-stone-300 rounded-xl p-1.5 font-semibold'
          },
            h('option', null, 'Vegetative Vigor (शाकीय वाढ)'),
            h('option', null, 'Flowering Stage (फुलोरा)'),
            h('option', null, 'Pod Development (४०-६५ दिवस)')
          )
        )
      ),

      // Weather & Soil Grid
      h('div', { className: 'grid grid-cols-1 lg:grid-cols-12 gap-6' },
        // Weather
        h('div', { className: 'lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm' },
          h('div', { className: 'flex justify-between items-center mb-4' },
            h('div', null,
              h('h3', { className: 'font-bold text-base text-[#1b4332]' }, 'Hyperlocal Weather & Spray Window'),
              h('p', { className: 'text-[11px] text-stone-500' }, `Station: ${user.district} Rural Feed`)
            ),
            h('span', { className: 'text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full' }, 'Sample Data')
          ),
          h('div', { className: 'grid grid-cols-4 gap-2 mb-4 text-center text-xs' },
            h('div', { className: 'bg-emerald-50 p-2.5 rounded-xl border border-emerald-100' }, h('span', { className: 'text-[10px] text-emerald-800 font-bold block' }, 'Temp'), h('span', { className: 'font-black text-lg' }, '28.5°C')),
            h('div', { className: 'bg-teal-50 p-2.5 rounded-xl border border-teal-100' }, h('span', { className: 'text-[10px] text-teal-800 font-bold block' }, 'Humidity'), h('span', { className: 'font-black text-lg' }, '64%')),
            h('div', { className: 'bg-blue-50 p-2.5 rounded-xl border border-blue-100' }, h('span', { className: 'text-[10px] text-blue-800 font-bold block' }, 'Rain Prob.'), h('span', { className: 'font-black text-lg' }, '15%')),
            h('div', { className: 'bg-amber-50 p-2.5 rounded-xl border border-amber-100' }, h('span', { className: 'text-[10px] text-amber-800 font-bold block' }, 'Wind'), h('span', { className: 'font-black text-lg' }, '7.2 km/h'))
          ),
          h('div', { className: 'bg-emerald-50 border border-emerald-300 p-3 rounded-2xl flex items-center gap-3 text-xs' },
            h('span', { className: 'text-2xl' }, '🎯'),
            h('div', null,
              h('span', { className: 'font-bold bg-emerald-600 text-white px-2 py-0.2 rounded text-[10px]' }, 'Safe Window'),
              h('p', { className: 'text-emerald-950 font-bold mt-0.5' }, '7:00 AM – 10:30 AM: Low wind drift and low rain chance. Ideal for foliar nutrition.')
            )
          )
        ),

        // Soil
        h('div', { className: 'lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between' },
          h('div', null,
            h('div', { className: 'flex justify-between items-center mb-3' },
              h('h3', { className: 'font-bold text-base text-[#1b4332]' }, 'Soil Health Card Summary'),
              h('button', { onClick: () => setCurrentPage('sustainability'), className: 'text-xs text-[#2d6a4f] font-bold' }, 'Scorecard →')
            ),
            h('div', { className: 'space-y-2 text-xs' },
              h('div', { className: 'flex justify-between' }, h('span', { className: 'text-stone-500' }, 'Soil Type:'), h('span', { className: 'font-bold' }, 'Medium Deep Black Vertisol')),
              h('div', { className: 'flex justify-between' }, h('span', { className: 'text-stone-500' }, 'pH:'), h('span', { className: 'font-bold' }, '7.4 (Normal Alkaline)')),
              h('div', { className: 'flex justify-between' }, h('span', { className: 'text-stone-500' }, 'Organic Carbon:'), h('span', { className: 'font-bold text-amber-700' }, '0.58% (Needs FYM Boost)'))
            ),
            h('div', { className: 'grid grid-cols-3 gap-2 text-center text-xs mt-3' },
              h('div', { className: 'bg-red-50 p-2 rounded-xl' }, h('span', { className: 'text-[9px] text-red-800 block font-bold' }, 'Nitrogen'), h('span', { className: 'font-bold text-sm' }, '210 kg/ha')),
              h('div', { className: 'bg-amber-50 p-2 rounded-xl' }, h('span', { className: 'text-[9px] text-amber-800 block font-bold' }, 'Phosphorus'), h('span', { className: 'font-bold text-sm' }, '24 kg/ha')),
              h('div', { className: 'bg-emerald-50 p-2 rounded-xl' }, h('span', { className: 'text-[9px] text-emerald-800 block font-bold' }, 'Potassium'), h('span', { className: 'font-bold text-sm' }, '340 kg/ha'))
            )
          ),
          h('div', { className: 'mt-3 pt-3 border-t border-stone-100 flex justify-between text-xs' },
            h('span', { className: 'text-stone-500' }, 'Need lab retest?'),
            h('button', { onClick: () => setCurrentPage('marketplace'), className: 'font-bold text-[#2d6a4f]' }, 'Book NABL Lab (₹350) →')
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 7. VIEW 3: AI ADVISOR CHAT
  // --------------------------------------------------------------------------
  function AiAdvisorPage() {
    const { t, language, user } = useContext(AppContext);
    const [messages, setMessages] = useState([
      {
        id: '1',
        sender: 'ai',
        text: language === 'mr'
          ? `रामराम ${user.name} जी! मी तुमचा कृषी मित्र AI सल्लागार आहे. तुमच्या ${user.district} भागातील पिकांचे नियोजन, कीड नियंत्रण आणि खत व्यवस्थापनाबद्दल मला विचारा.`
          : `नमस्ते ${user.name} जी! मैं आपका कृषि मित्र AI सलाहकार हूँ। आपके ${user.district} क्षेत्र की फसलों के बारे में कुछ भी पूछें।`,
        confidence: 0.94
      }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = (txt) => {
      const q = (txt || input).trim();
      if (!q) return;
      setInput('');

      const userMsg = { id: Date.now() + '_u', sender: 'user', text: q };
      setMessages(prev => [...prev, userMsg]);
      setLoading(true);

      setTimeout(() => {
        let reply = '';
        if (language === 'mr') {
          reply = `तुमच्या ${user.district} भागातील प्रश्नानुसार सल्ला:\n१. प्राथमिक कीड नियंत्रणासाठी कडुनिंब तेल (1500 PPM) ५ मिली/लिटर सकाळी फवारावे.\n२. ठिबक सिंचनाने सकाळी ६ ते ९ दरम्यान पाणी दिल्यास पाण्याचा अपव्यय टाळता येतो.\n३. अधिक माहितीसाठी स्थानिक कृषी विज्ञान केंद्र (KVK) शास्त्रज्ञांशी बोला.`;
        } else if (language === 'hi') {
          reply = `आपके ${user.district} क्षेत्र के अनुसार कृषि सलाह:\n1. कीट नियंत्रण हेतु प्रारंभिक अवस्था में 5 मिली/लीटर नीम का तेल सुबह 8 से 10 बजे छिड़कें।\n2. ड्रिप से सुबह के समय सिंचाई करें ताकि 35% पानी की बचत हो।\n3. गंभीर समस्या पर निकटतम कृषि विज्ञान केंद्र से संपर्क करें।`;
        } else {
          reply = `Guidance for ${user.district}:\n1. Apply Neem oil (1500 ppm) @ 5ml/liter water as prophylactic pest management.\n2. Irrigate via drip between 6:00 AM - 9:00 AM to conserve water.\n3. In case of high-risk symptoms, contact your local KVK agronomist.`;
        }

        setMessages(prev => [...prev, { id: Date.now() + '_ai', sender: 'ai', text: reply, confidence: 0.92 }]);
        setLoading(false);
      }, 700);
    };

    return h('div', { className: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6' },
      h(DisclaimerBanner, { type: 'advisory' }),
      h('div', { className: 'bg-white rounded-3xl p-6 shadow-sm border border-stone-200 min-h-[480px] flex flex-col justify-between' },
        h('div', { className: 'space-y-4 overflow-y-auto max-h-[460px] pr-2' },
          messages.map(m => h('div', {
            key: m.id,
            className: `flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`
          },
            h('div', {
              className: `max-w-[80%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${m.sender === 'user' ? 'bg-[#2d6a4f] text-white' : 'bg-stone-50 text-stone-900 border border-stone-200'}`
            },
              h('span', { className: 'text-[10px] font-bold block mb-1 opacity-70' }, m.sender === 'user' ? '👨‍🌾 You' : '🤖 KrishiMitra AI'),
              m.text,
              m.confidence && h('span', { className: 'text-[9px] text-stone-400 block mt-2 text-right' }, `Confidence: ${Math.round(m.confidence * 100)}%`)
            )
          )),
          loading && h('div', { className: 'text-xs text-stone-500 animate-pulse' }, '🌱 Synthesizing agricultural guidance...')
        ),

        // Quick chips & input
        h('div', { className: 'border-t border-stone-100 pt-3 mt-4 space-y-3' },
          h('div', { className: 'flex flex-wrap gap-1.5' },
            [
              language === 'mr' ? 'माझ्या पिकावरील कीड नियंत्रण कसे करावे?' : 'कीट प्रबंधन कैसे करें?',
              language === 'mr' ? 'शेताला पाणी (सिंचन) कधी द्यावे?' : 'खेत की सिंचाई कब करें?',
              language === 'mr' ? 'शेतीचा खर्च २५% कसा कमी करता येईल?' : 'खेती की लागत कैसे कम करें?'
            ].map((q, idx) => h('button', {
              key: idx,
              onClick: () => handleSend(q),
              className: 'text-xs bg-stone-50 hover:bg-emerald-50 text-stone-700 px-3 py-1 rounded-full border border-stone-200'
            }, q))
          ),

          h('div', { className: 'flex items-center gap-2' },
            h('input', {
              type: 'text',
              value: input,
              onChange: e => setInput(e.target.value),
              onKeyDown: e => { if (e.key === 'Enter') handleSend(); },
              placeholder: t.askPlaceholder,
              className: 'flex-1 bg-stone-50 border border-stone-300 rounded-2xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none'
            }),
            h('button', {
              onClick: () => handleSend(),
              className: 'bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-5 py-2.5 rounded-2xl text-xs font-bold'
            }, 'Send ➔')
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 8. VIEW 4: CROP DISEASE SCANNER
  // --------------------------------------------------------------------------
  function DiseaseScannerPage() {
    const { t } = useContext(AppContext);
    const [selectedSample, setSelectedSample] = useState(SAMPLE_LEAVES[0]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSelect = (s) => {
      setSelectedSample(s);
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 600);
    };

    return h('div', { className: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6' },
      h(DisclaimerBanner, { type: 'advisory', text: 'Agricultural Warning: Image-based diagnostics are advisory estimations. Field symptoms may resemble nutrient chlorosis. Consult a certified agronomist before heavy pesticide application.' }),

      h('div', { className: 'grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6' },
        // Left Column: Samples & Upload
        h('div', { className: 'lg:col-span-5 space-y-6' },
          h('div', { className: 'bg-white p-6 rounded-3xl border border-stone-200 shadow-sm text-center' },
            h('h3', { className: 'font-bold text-sm text-[#1b4332] mb-3' }, t.uploadPrompt),
            h('div', { className: 'w-full h-52 bg-stone-100 rounded-2xl border-2 border-dashed border-stone-300 flex items-center justify-center text-4xl mb-4' },
              selectedSample.icon
            ),
            h('div', { className: 'grid grid-cols-2 gap-3 text-xs' },
              h('button', {
                onClick: () => alert('File upload available in connected camera mode.'),
                className: 'py-2.5 bg-[#2d6a4f] text-white font-bold rounded-xl'
              }, '📁 Upload Leaf'),
              h('button', {
                onClick: () => alert('Camera ready.'),
                className: 'py-2.5 bg-stone-100 text-stone-800 font-bold rounded-xl border border-stone-300'
              }, '📷 Open Camera')
            )
          ),

          // Presets
          h('div', { className: 'bg-white p-5 rounded-3xl border border-stone-200 shadow-sm' },
            h('h4', { className: 'text-xs font-bold text-stone-600 uppercase mb-3' }, t.orPickSample),
            h('div', { className: 'space-y-2' },
              SAMPLE_LEAVES.map(s => h('button', {
                key: s.id,
                onClick: () => handleSelect(s),
                className: `w-full p-2.5 rounded-xl border text-left flex items-center gap-3 text-xs ${selectedSample.id === s.id ? 'bg-emerald-50 border-[#2d6a4f] font-bold' : 'bg-stone-50 border-stone-200'}`
              },
                h('span', { className: 'text-2xl' }, s.icon),
                h('div', null,
                  h('p', { className: 'font-bold text-stone-900' }, s.name),
                  h('p', { className: 'text-[10px] text-stone-500 font-normal' }, `${s.crop} • ${s.diseaseName}`)
                )
              ))
            )
          )
        ),

        // Right Column: Diagnosis results
        h('div', { className: 'lg:col-span-7' },
          isAnalyzing ? h('div', { className: 'bg-white p-12 rounded-3xl border border-stone-200 text-center text-xs text-stone-500 animate-pulse' },
            h('div', { className: 'text-3xl mb-2' }, '🔍'),
            h('p', { className: 'font-bold text-stone-800' }, t.analyzing)
          ) : h('div', { className: 'bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5' },
            h('div', { className: 'flex justify-between items-start border-b border-stone-200 pb-4' },
              h('div', null,
                h('span', { className: 'text-[10px] font-bold uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full' }, `${selectedSample.crop} Pathology`),
                h('h2', { className: 'text-xl sm:text-2xl font-black text-stone-900 mt-1' }, selectedSample.diseaseName)
              ),
              h('div', { className: 'text-right' },
                h('span', { className: 'text-[10px] text-stone-500 block uppercase font-bold' }, 'AI Confidence'),
                h('span', { className: 'text-2xl font-black text-[#1b4332]' }, `${selectedSample.confidence}%`)
              )
            ),

            // Symptoms
            h('div', null,
              h('h4', { className: 'text-xs font-bold uppercase text-stone-700 mb-2' }, `🔍 ${t.symptomsIdentified}`),
              h('ul', { className: 'space-y-1.5 text-xs text-stone-700' },
                selectedSample.symptoms.map((sym, i) => h('li', { key: i, className: 'bg-stone-50 p-2 rounded-lg border border-stone-100' }, `• ${sym}`))
              )
            ),

            // Organic vs Chemical Remedies
            h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
              h('div', { className: 'bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-xs' },
                h('p', { className: 'font-bold text-emerald-950 mb-1.5' }, `🌿 ${t.organicSolution}`),
                selectedSample.organicRemedies.map((rem, i) => h('p', { key: i, className: 'text-stone-700 mb-1 leading-relaxed' }, `• ${rem}`))
              ),
              h('div', { className: 'bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs' },
                h('p', { className: 'font-bold text-amber-950 mb-1.5' }, `🧪 ${t.chemicalSolution}`),
                selectedSample.chemicalManagement.map((chem, i) => h('p', { key: i, className: 'text-stone-700 mb-1 leading-relaxed' }, `• ${chem}`))
              )
            ),

            // Disclaimer
            h('div', { className: 'bg-stone-100 p-3 rounded-xl text-[11px] text-stone-600' },
              h('strong', null, 'Field Disclaimer: '),
              'Always verify chemical spray dilution and crop stage compatibility with your local Krishi Vigyan Kendra agronomist.'
            )
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 9. VIEW 5: COMMUNITY FORUM (Signed Knowledge)
  // --------------------------------------------------------------------------
  function CommunityPage() {
    const { t, user, isOnline, outbox, setOutbox } = useContext(AppContext);
    const [posts, setPosts] = useState([
      {
        id: 'post_01',
        authorName: 'Balasaheb Shinde',
        authorRole: 'farmer',
        village: 'Vinchur',
        district: 'Nashik',
        title: 'Yellowing in lower leaves of 35-day-old Soybean – is it Nitrogen deficiency or Yellow Mosaic?',
        content: 'My JS-335 soybean crop was sown 35 days ago. Lower leaves are pale yellow. Drip irrigation installed. What should I spray?',
        crop: 'Soybean',
        upvotes: 14,
        helpfulCount: 8,
        isVerified: true,
        expertComment: 'Verified: Moisture-induced nitrogen leaching. Apply foliar 19:19:19 @ 5g/L.',
        nodeId: 'node_kvk_nashik_01',
        blockHash: '0x8f2d1e99a4c8034567b120ef9a34bc9876543210fedcba987654321012345678'
      },
      {
        id: 'post_02',
        authorName: 'Harpreet Singh',
        authorRole: 'farmer',
        village: 'Samrala',
        district: 'Ludhiana',
        title: 'Happy Seeder zero-till wheat sowing experience into Basmati stubble',
        content: 'Completed 12 acres wheat sowing directly into residue. Conserved soil moisture and saved ₹1,400/acre on diesel.',
        crop: 'Wheat',
        upvotes: 38,
        helpfulCount: 22,
        isVerified: true,
        expertComment: 'Field practice endorsed by PAU Ludhiana. Excellent stubble retention.',
        nodeId: 'node_central_agronet_02',
        blockHash: '0x3a4b5c6d7e8f901234567890abcdef1234567890abcdef1234567890abcdef12'
      }
    ]);

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newCrop, setNewCrop] = useState('Soybean');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreatePost = () => {
      if (!newTitle.trim() || !newContent.trim()) return;

      const newPost = {
        id: 'post_' + Date.now(),
        authorName: user.name,
        authorRole: user.role,
        village: user.village,
        district: user.district,
        title: newTitle,
        content: newContent,
        crop: newCrop,
        upvotes: 1,
        helpfulCount: 0,
        isVerified: user.role === 'expert',
        nodeId: 'node_kvk_nashik_01',
        blockHash: '0x' + Math.random().toString(16).substr(2, 32)
      };

      if (!isOnline) {
        setOutbox([...outbox, { id: Date.now(), title: newTitle, type: 'post' }]);
        alert('Post queued in Outbox! Will broadcast when back online.');
      } else {
        setPosts([newPost, ...posts]);
      }

      setNewTitle('');
      setNewContent('');
      setIsModalOpen(false);
    };

    return h('div', { className: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6' },
      h(DisclaimerBanner, { text: 'Decentralized Community: Farmer submissions are cryptographically hashed and verified by institutional KVK AgroNodes.' }),

      h('div', { className: 'flex justify-between items-center my-6' },
        h('div', null,
          h('h2', { className: 'text-2xl font-black text-[#1b4332]' }, t.navCommunity),
          h('p', { className: 'text-xs text-stone-500' }, 'Verified peer-to-peer agricultural discussions')
        ),
        h('button', {
          onClick: () => setIsModalOpen(true),
          className: 'px-4 py-2 bg-[#2d6a4f] text-white text-xs font-bold rounded-xl shadow'
        }, '+ Ask Question')
      ),

      h('div', { className: 'space-y-4' },
        posts.map(p => h('div', { key: p.id, className: 'bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3' },
          h('div', { className: 'flex justify-between items-center text-xs border-b border-stone-100 pb-2' },
            h('div', { className: 'flex items-center gap-2' },
              h('span', { className: 'font-bold' }, p.authorName),
              p.isVerified && h('span', { className: 'bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.2 rounded-full' }, '✓ Verified Agronomist')
            ),
            h('span', { className: 'bg-stone-100 px-2 py-0.5 rounded text-[10px] font-bold' }, `🌾 ${p.crop}`)
          ),
          h('h3', { className: 'font-bold text-base text-stone-900' }, p.title),
          h('p', { className: 'text-xs text-stone-600 leading-relaxed' }, p.content),
          p.expertComment && h('div', { className: 'bg-purple-50 p-2.5 rounded-xl border border-purple-200 text-xs text-purple-900' },
            h('strong', null, '🔬 KVK Scientist Note: '), p.expertComment
          ),
          h('div', { className: 'pt-2 flex justify-between items-center text-xs text-stone-500' },
            h('div', { className: 'flex gap-2' },
              h('button', {
                onClick: () => setPosts(posts.map(x => x.id === p.id ? { ...x, upvotes: x.upvotes + 1 } : x)),
                className: 'px-2.5 py-1 bg-stone-100 hover:bg-emerald-100 rounded-lg font-bold'
              }, `👍 Upvote (${p.upvotes})`),
              h('button', {
                onClick: () => setPosts(posts.map(x => x.id === p.id ? { ...x, helpfulCount: x.helpfulCount + 1 } : x)),
                className: 'px-2.5 py-1 bg-emerald-50 text-emerald-900 rounded-lg font-bold'
              }, `⭐ Helpful (${p.helpfulCount})`)
            ),
            h('span', { className: 'font-mono text-[10px]' }, `Hash: ${p.blockHash.substring(0, 12)}...`)
          )
        ))
      ),

      isModalOpen && h('div', { className: 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4' },
        h('div', { className: 'bg-white p-6 rounded-3xl max-w-md w-full text-xs space-y-4' },
          h('h3', { className: 'font-bold text-base text-stone-900' }, t.askCommunity),
          h('input', {
            type: 'text',
            value: newTitle,
            onChange: e => setNewTitle(e.target.value),
            placeholder: t.postTitle,
            className: 'w-full p-2.5 border rounded-xl font-bold'
          }),
          h('textarea', {
            rows: 4,
            value: newContent,
            onChange: e => setNewContent(e.target.value),
            placeholder: t.postContent,
            className: 'w-full p-2.5 border rounded-xl'
          }),
          h('div', { className: 'flex justify-end gap-2' },
            h('button', { onClick: () => setIsModalOpen(false), className: 'px-4 py-2 text-stone-600' }, 'Cancel'),
            h('button', { onClick: handleCreatePost, className: 'px-4 py-2 bg-[#2d6a4f] text-white font-bold rounded-xl' }, 'Submit')
          )
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 10. VIEW 6: CROP ALERT MAP RADAR
  // --------------------------------------------------------------------------
  function CropAlertMapPage() {
    const { t, user } = useContext(AppContext);
    const [alerts, setAlerts] = useState([
      { id: '1', title: 'Pink Bollworm Surge in Cotton', taluka: 'Dindori', crop: 'Cotton', severity: 'high', verified: 8, radius: 6.5 },
      { id: '2', title: 'Downy Mildew Risk from Humid Fog', taluka: 'Pimpalgaon', crop: 'Tomato', severity: 'critical', verified: 14, radius: 5.0 },
      { id: '3', title: 'Canal Rotation Water Delay', taluka: 'Rahuri', crop: 'Sugarcane', severity: 'medium', verified: 5, radius: 12.0 }
    ]);
    const [selected, setSelected] = useState(alerts[0]);

    return h('div', { className: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6' },
      h(DisclaimerBanner, { text: 'Alert Radar Privacy: Coordinates are clustered into general 5km taluka zones to safeguard farmer privacy.' }),

      h('div', { className: 'grid grid-cols-1 lg:grid-cols-12 gap-6 my-6' },
        // Radar Screen
        h('div', { className: 'lg:col-span-7 bg-[#1b4332] text-white p-6 rounded-3xl min-h-[420px] flex flex-col justify-between border-4 border-[#2d6a4f] relative overflow-hidden' },
          h('div', { className: 'flex justify-between items-center text-xs' },
            h('span', { className: 'bg-[#2d6a4f] text-emerald-300 px-2 py-0.5 rounded font-bold uppercase' }, 'District Agro Radar'),
            h('span', { className: 'text-stone-300' }, '🔒 Privacy Masked')
          ),

          // Center Radar Nodes
          h('div', { className: 'flex flex-wrap justify-around gap-3 my-8' },
            alerts.map(a => h('button', {
              key: a.id,
              onClick: () => setSelected(a),
              className: `p-3 rounded-2xl text-left transition-all ${selected.id === a.id ? 'bg-white text-stone-900 ring-4 ring-emerald-400 shadow-xl' : 'bg-[#24523e] text-white border border-emerald-500/40'}`
            },
              h('div', { className: 'flex justify-between items-center mb-1 text-[10px]' },
                h('span', { className: 'font-bold uppercase' }, a.crop),
                h('span', { className: `w-2 h-2 rounded-full ${a.severity === 'critical' ? 'bg-red-500' : 'bg-orange-500'}` })
              ),
              h('p', { className: 'font-bold text-xs truncate max-w-[140px]' }, a.taluka),
              h('p', { className: 'text-[10px] text-stone-400 mt-1' }, `👥 ${a.verified} verified`)
            ))
          ),

          h('div', { className: 'border-t border-emerald-800 pt-2 text-[10px] text-emerald-300 flex justify-between' },
            h('span', null, 'Click node to view containment steps'),
            h('span', null, 'Radar status: Active')
          )
        ),

        // Detail Card
        h('div', { className: 'lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between text-xs' },
          h('div', { className: 'space-y-3' },
            h('div', { className: 'flex justify-between items-start border-b pb-3' },
              h('div', null,
                h('span', { className: 'bg-red-100 text-red-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase' }, `${selected.severity} Alert`),
                h('h3', { className: 'font-black text-base text-stone-900 mt-1' }, selected.title)
              ),
              h('span', { className: 'text-2xl' }, '🚨')
            ),
            h('p', { className: 'text-stone-600' }, `Location: ${selected.taluka}, Dist. ${user.district}`),
            h('p', { className: 'text-stone-600' }, `Estimated Outbreak Radius: ~${selected.radius} km`),
            h('div', { className: 'bg-emerald-50 p-3 rounded-xl border border-emerald-200' },
              h('strong', null, 'Containment Action: '),
              'Inspect delta traps immediately. If moth catch exceeds 8/night, deploy Trichogramma parasitoids.'
            )
          ),
          h('button', {
            onClick: () => {
              setAlerts(alerts.map(x => x.id === selected.id ? { ...x, verified: x.verified + 1 } : x));
              setSelected({ ...selected, verified: selected.verified + 1 });
            },
            className: 'w-full py-2.5 bg-[#2d6a4f] text-white font-bold rounded-xl mt-4'
          }, `+ Verify Field Sighting (${selected.verified})`)
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 11. VIEW 7: SOIL & SUSTAINABILITY
  // --------------------------------------------------------------------------
  function SustainabilityPage() {
    const { t } = useContext(AppContext);
    const [drip, setDrip] = useState(80);
    const [compost, setCompost] = useState(true);

    const score = 55 + (compost ? 15 : 0) + Math.round((drip / 100) * 20);
    const savings = Math.round((score / 100) * 6000);

    return h('div', { className: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6' },
      h(DisclaimerBanner, { text: 'Educational Sustainability Model: Assesses ecological practices and input cost reduction per acre.' }),

      h('div', { className: 'bg-white p-8 rounded-3xl border border-stone-200 shadow-sm my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center' },
        h('div', null,
          h('span', { className: 'text-xs font-bold uppercase text-stone-500' }, 'Sustainability Rating'),
          h('div', { className: 'text-5xl font-black text-[#1b4332] my-1' }, `${score} / 100`),
          h('span', { className: 'bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full text-xs' }, 'Grade A (Good Stewardship)')
        ),
        h('div', { className: 'bg-emerald-50 p-5 rounded-2xl border border-emerald-200 text-xs' },
          h('span', { className: 'text-stone-600 block' }, 'Estimated Annual Savings / Acre'),
          h('span', { className: 'text-3xl font-black text-emerald-950 block my-1' }, `₹${savings}`),
          h('p', { className: 'text-stone-500 text-[11px]' }, 'Achieved via compost adoption, zero-till stubble retention, and micro-irrigation.')
        )
      ),

      // Interactive toggles
      h('div', { className: 'bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 text-xs' },
        h('h3', { className: 'font-bold text-base text-[#1b4332]' }, 'Adjust Farm Practices & Recalculate:'),
        h('div', { className: 'flex justify-between items-center' },
          h('span', { className: 'font-bold' }, 'Micro-Irrigation Coverage:'),
          h('span', { className: 'font-bold text-[#1b4332]' }, `${drip}%`)
        ),
        h('input', {
          type: 'range',
          min: 0,
          max: 100,
          value: drip,
          onChange: e => setDrip(Number(e.target.value)),
          className: 'w-full accent-[#2d6a4f]'
        }),
        h('div', { className: 'flex items-center gap-3 pt-2' },
          h('input', {
            type: 'checkbox',
            checked: compost,
            onChange: e => setCompost(e.target.checked),
            className: 'w-4 h-4 rounded text-[#2d6a4f]'
          }),
          h('span', { className: 'font-bold' }, 'Apply Farmyard Manure & Jeevamrut')
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 12. VIEW 8: GOVERNMENT SCHEMES & APMC MANDI
  // --------------------------------------------------------------------------
  function SchemesPage() {
    const { t, language } = useContext(AppContext);
    const schemes = [
      { name: 'PM-Kisan Samman Nidhi', grant: '₹6,000 / year (3 installments)', portal: 'https://pmkisan.gov.in', desc: 'Direct income support transfer to all landholding farmer families across India.' },
      { name: 'Pradhan Mantri Fasal Bima (PMFBY)', grant: 'Comprehensive Crop Insurance', portal: 'https://pmfby.gov.in', desc: 'Financial protection against yield loss from natural droughts, pests, and floods.' },
      { name: 'Per Drop More Crop (Micro-Irrigation)', grant: '45% to 55% Drip Subsidy', portal: 'https://pmksy.gov.in', desc: 'Subsidies on installing inline drip systems and sprinkler sets.' }
    ];

    return h('div', { className: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6' },
      h(DisclaimerBanner, { text: 'Verified Welfare Database: Direct links lead to official state and central agricultural portals.' }),

      h('div', { className: 'space-y-4 my-6' },
        schemes.map((s, i) => h('div', { key: i, className: 'bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs' },
          h('div', { className: 'space-y-1' },
            h('span', { className: 'bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[10px]' }, 'Ministry of Agriculture'),
            h('h3', { className: 'font-black text-base text-stone-900 mt-1' }, s.name),
            h('p', { className: 'text-stone-600' }, s.desc),
            h('p', { className: 'font-bold text-[#1b4332]' }, `Benefit: ${s.grant}`)
          ),
          h('a', {
            href: s.portal,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'px-4 py-2 bg-[#2d6a4f] text-white font-bold rounded-xl shrink-0'
          }, 'Official Portal →')
        ))
      )
    );
  }

  function MarketplacePage() {
    const { t, user } = useContext(AppContext);
    const mandiRates = [
      { crop: 'Soybean (Yellow)', market: 'Lasalgaon APMC', rate: '₹4,625 / Qtl', trend: '▲ Up' },
      { crop: 'Onion (Gavran)', market: 'Pimpalgaon APMC', rate: '₹2,650 / Qtl', trend: '▲ Up' },
      { crop: 'Cotton', market: 'Akola APMC', rate: '₹7,210 / Qtl', trend: '● Stable' },
      { crop: 'Wheat (Lokwan)', market: 'Indore Mandi', rate: '₹2,780 / Qtl', trend: '● Stable' }
    ];

    return h('div', { className: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6' },
      h(DisclaimerBanner, { text: 'APMC Market Telematics: Representative daily mandi averages from Agmarknet.' }),

      h('div', { className: 'bg-white rounded-3xl p-6 border border-stone-200 shadow-sm my-6' },
        h('h3', { className: 'font-extrabold text-base text-[#1b4332] mb-4' }, 'APMC Daily Mandi Rates'),
        h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs' },
          mandiRates.map((m, i) => h('div', { key: i, className: 'bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-center' },
            h('span', { className: 'font-bold text-stone-900 block' }, m.crop),
            h('span', { className: 'text-[10px] text-stone-500 block' }, m.market),
            h('span', { className: 'text-lg font-black text-emerald-950 block mt-1' }, m.rate),
            h('span', { className: 'text-[10px] font-bold text-emerald-700' }, m.trend)
          ))
        )
      )
    );
  }

  // --------------------------------------------------------------------------
  // 13. VIEW 9: ADMIN & EXPERT WORKSTATION
  // --------------------------------------------------------------------------
  function AdminExpertPage() {
    const { user, switchRole } = useContext(AppContext);

    return h('div', { className: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6' },
      h(DisclaimerBanner, { text: 'Security Console: Dedicated tools for KVK scientists, moderators, and node admins.' }),

      h('div', { className: 'bg-white rounded-3xl p-6 border border-stone-200 shadow-sm my-6 space-y-4 text-xs' },
        h('div', { className: 'flex justify-between items-center border-b pb-3' },
          h('h3', { className: 'font-bold text-base text-[#1b4332]' }, 'Institutional AgroNodes'),
          h('span', { className: 'font-bold text-emerald-800' }, '● 3 Nodes Synchronized')
        ),
        [
          { name: 'KVK Pimpalgaon AgroNode', loc: 'Nashik, Maharashtra', height: '#14820', peers: 18 },
          { name: 'Central Agro-Knowledge Hub', loc: 'ICAR New Delhi', height: '#14820', peers: 42 },
          { name: 'Sahyadri Farmers Producer Node', loc: 'Dindori, Nashik', height: '#14819', peers: 14 }
        ].map((node, i) => h('div', { key: i, className: 'bg-stone-50 p-3.5 rounded-2xl flex justify-between items-center' },
          h('div', null,
            h('p', { className: 'font-bold text-stone-900' }, node.name),
            h('p', { className: 'text-[10px] text-stone-500' }, node.loc)
          ),
          h('div', { className: 'text-right' },
            h('span', { className: 'font-mono font-bold text-emerald-800' }, node.height),
            h('span', { className: 'text-[10px] text-stone-400 block' }, `${node.peers} peers`)
          )
        ))
      )
    );
  }

  function ProfileSettingsPage() {
    const { user, setUser } = useContext(AppContext);
    const [name, setName] = useState(user.name);
    const [village, setVillage] = useState(user.village);

    return h('div', { className: 'max-w-md mx-auto px-4 py-8' },
      h('div', { className: 'bg-white p-6 rounded-3xl border border-stone-200 shadow-sm text-xs space-y-4' },
        h('h3', { className: 'font-bold text-base text-[#1b4332]' }, 'Farmer Profile & Settings'),
        h('div', null,
          h('label', { className: 'font-bold block mb-1' }, 'Full Name'),
          h('input', {
            type: 'text',
            value: name,
            onChange: e => setName(e.target.value),
            className: 'w-full p-2.5 border rounded-xl'
          })
        ),
        h('div', null,
          h('label', { className: 'font-bold block mb-1' }, 'Village'),
          h('input', {
            type: 'text',
            value: village,
            onChange: e => setVillage(e.target.value),
            className: 'w-full p-2.5 border rounded-xl'
          })
        ),
        h('button', {
          onClick: () => {
            setUser({ ...user, name, village });
            alert('Profile saved.');
          },
          className: 'w-full py-2.5 bg-[#2d6a4f] text-white font-bold rounded-xl'
        }, 'Save Profile')
      )
    );
  }

  // --------------------------------------------------------------------------
  // 14. ROOT APP CONTROLLER
  // --------------------------------------------------------------------------
  function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isVoiceOpen, setIsVoiceOpen] = useState(false);

    const renderPage = () => {
      switch (currentPage) {
        case 'home': return h(LandingPage, { setCurrentPage, onOpenVoice: () => setIsVoiceOpen(true) });
        case 'dashboard': return h(FarmerDashboard, { setCurrentPage, onOpenVoice: () => setIsVoiceOpen(true) });
        case 'advisor': return h(AiAdvisorPage);
        case 'disease': return h(DiseaseScannerPage);
        case 'community': return h(CommunityPage);
        case 'map': return h(CropAlertMapPage);
        case 'sustainability': return h(SustainabilityPage);
        case 'schemes': return h(SchemesPage);
        case 'marketplace': return h(MarketplacePage);
        case 'profile': return h(ProfileSettingsPage);
        case 'admin': return h(AdminExpertPage);
        default: return h(LandingPage, { setCurrentPage, onOpenVoice: () => setIsVoiceOpen(true) });
      }
    };

    return h(AppProvider, null,
      h('div', { className: 'min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900 pb-16 lg:pb-0' },
        h(Header, { currentPage, setCurrentPage, onOpenVoice: () => setIsVoiceOpen(true) }),
        h('main', { className: 'flex-1' }, renderPage()),
        h(BottomNav, { currentPage, setCurrentPage, onOpenVoice: () => setIsVoiceOpen(true) }),
        h(KrishiVoiceModal, { isOpen: isVoiceOpen, onClose: () => setIsVoiceOpen(false) })
      )
    );
  }

  const root = document.getElementById('root');
  if (root) {
    ReactDOM.createRoot(root).render(h(App));
  }
})();
