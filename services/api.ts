// KrishiMitra AI - Unified API Client Layer (Online & Offline Resilient)
import { 
  AdvisoryMessage, 
  FarmContext, 
  DiseaseDiagnosis, 
  SupportedLanguage,
  WeatherData,
  CommunityPost
} from '../types';
import { analyzeLeafImage } from './diseaseModel';
import { DEMO_WEATHER, INITIAL_COMMUNITY_POSTS } from '../data/demoData';

export class ApiService {
  /**
   * Generates contextual agricultural advice based on farmer inputs
   */
  public static async askAdvisory(
    query: string,
    context: FarmContext,
    language: SupportedLanguage
  ): Promise<AdvisoryMessage> {
    try {
      // Attempt live backend API call if online
      const response = await fetch('/api/advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, context, language })
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      // Fall through to local intelligent heuristic model
    }

    // Local edge inference logic
    await new Promise(res => setTimeout(res, 900));

    const q = query.toLowerCase();
    const crop = context.cropName || 'crop';
    const soil = context.soilType || 'soil';
    const stage = context.cropStage || 'vegetative stage';
    const district = context.district || 'your district';

    let text = '';
    let confidence = 0.91;
    let riskLevel: 'low' | 'moderate' | 'high' = 'low';
    let expertReferralRequired = false;

    // Check specific query intents
    if (q.includes('pest') || q.includes('कीट') || q.includes('कीड') || q.includes('spray') || q.includes('फवारणी') || q.includes('छिड़काव')) {
      riskLevel = 'moderate';
      if (language === 'hi') {
        text = `आपके ${district} क्षेत्र में ${crop} की ${stage} अवस्था के लिए कीट प्रबंधन मार्गदर्शन:
1. सबसे पहले खेत में 5 फेरोमोन ट्रैप और 8 पीले चिपचिपे ट्रैप प्रति एकड़ लगाएं ताकि कीटों की संख्या का सटीक पता चल सके।
2. प्राथमिक रोकथाम के लिए 5 मिली/लीटर नीम का तेल (1500 PPM) का छिड़काव सुबह 8 से 10 बजे के बीच करें।
3. रासायनिक कीटनाशक तभी छिड़कें जब आर्थिक नुकसान स्तर (ETL) पार हो जाए। अधिक जानकारी हेतु निकटतम KVK विशेषज्ञ से संपर्क करें।`;
      } else if (language === 'mr') {
        text = `तुमच्या ${district} जिल्ह्यातील ${crop} पिकाच्या ${stage} अवस्थेसाठी कीड व्यवस्थापन सल्ला:
१. सर्वप्रथम शेतात एकरी ५ कामगंध सापळे आणि ८ पिवळे चिकट सापळे लावा, जेणेकरून किडींचा प्रादुर्भाव समजेल.
२. प्राथमिक अवस्थेत निंबोळी अर्क (५%) किंवा ५ मिली/लिटर कडुनिंब तेल (1500 PPM) सकाळी फवारा.
३. रासायनिक फवारणी केवळ गरजेनुसार करा. तीव्र प्रादुर्भावासाठी स्थानिक KVK कृषी शास्त्रज्ञांचा सल्ला घ्या.`;
      } else {
        text = `Pest Management Guidance for ${crop} during ${stage} in ${district}:
1. Install 5 pheromone traps and 8 yellow sticky traps per acre to monitor pest population thresholds.
2. Apply cold-pressed Neem oil (1500 ppm) @ 5ml/liter of water in early morning as a prophylactic measure.
3. Reserve synthetic chemical sprays only if infestation crosses the Economic Threshold Level (ETL). Contact your local KVK for verified dosage.`;
      }
    } else if (q.includes('water') || q.includes('irriga') || q.includes('सिंचाई') || q.includes('पाणी') || q.includes('सिंचन')) {
      if (language === 'hi') {
        text = `${soil} मिट्टी में ${crop} के लिए सिंचाई का सही समय:
1. आपकी ${soil} मिट्टी में नमी धारण क्षमता को देखते हुए, मिट्टी की ऊपरी 2-3 सेमी परत सूखने पर ही पानी दें।
2. ${context.irrigationMethod || 'ड्रिप'} से सुबह 6 से 9 बजे के बीच सिंचाई करें, जिससे वाष्पीकरण से पानी की बर्बादी 30% तक रुकती है।
3. आगामी मौसम में बारिश की संभावना देखकर ही अगला चक्र तय करें।`;
      } else if (language === 'mr') {
        text = `${soil} मातीत ${crop} पिकासाठी सिंचन सल्ला:
१. ${soil} मातीतील ओलावा लक्षात घेऊन, वरचा २-३ सेमी थर कोरडा झाल्यावरच पाणी द्यावे.
२. ${context.irrigationMethod || 'ठिबक'} सिंचनाने सकाळी ६ ते ९ दरम्यान पाणी दिल्यास पाण्याचे बाष्पीभवन ३०% टक्क्यांनी कमी होते.
३. पुढील ३ दिवसांत पावसाची शक्यता तपासूनच सिंचनाचे नियोजन करा.`;
      } else {
        text = `Irrigation Advisory for ${crop} in ${soil}:
1. Based on the water retention characteristics of ${soil}, irrigate when the top 2-3 cm root-zone soil feels crumbly.
2. Using ${context.irrigationMethod || 'Drip Irrigation'}, run the cycle between 6:00 AM - 9:00 AM to minimize evaporative loss by up to 35%.
3. Synchronize with the 3-day rainfall forecast before irrigating.`;
      }
    } else if (q.includes('nutrient') || q.includes('fertiliz') || q.includes('खाद') || q.includes('खत') || q.includes('urea') || q.includes('dap')) {
      if (language === 'hi') {
        text = `${crop} की ${stage} अवस्था में पोषण प्रबंधन:
1. इस अवस्था में पौधे को संतुलित पोटाश और सूक्ष्म पोषक तत्वों (जिंक, बोरॉन) की सर्वाधिक आवश्यकता होती है।
2. अत्यधिक यूरिया (नाइट्रोजन) देने से बचें, क्योंकि इससे फसल नरम होकर कीटों का खतरा बढ़ता है। 19:19:19 या 13:00:45 का पर्णीय छिड़काव 5 ग्राम/लीटर पानी में करें।
3. मिट्टी की जांच रिपोर्ट के अनुसार ही डीएपी व पोटाश की मात्रा तय करें।`;
      } else if (language === 'mr') {
        text = `${crop} पिकाच्या ${stage} अवस्थेतील खत व्यवस्थापन:
१. या वाढीच्या अवस्थेत पिकाला पोटॅश व सूक्ष्म अन्नद्रव्यांची (झिंक व बोरॉन) मुख्य गरज असते.
२. जास्त युरिया देणे टाळा, कारण त्यामुळे पिकावर कीड वाढण्याची भीती असते. १९:१९:१९ किंवा १३:००:४५ या विद्राव्य खताची ५ ग्रॅम/लिटर पाण्यातून फवारणी करा.
३. माती परीक्षण अहवालानुसारच रासायनिक खतांचा डोस ठरवा.`;
      } else {
        text = `Nutrient Management for ${crop} at ${stage}:
1. At this stage, the crop requires balanced potassium and micronutrients (Zinc, Boron) for strong cell wall development.
2. Avoid excessive top-dressing of pure urea, as excessive vegetative softness attracts sucking pests. Use soluble 19:19:19 @ 5g/L water foliar spray.
3. Align fertilizer dosage with your Soil Health Card report to save input costs.`;
      }
    } else if (q.includes('cost') || q.includes('खर्च') || q.includes('बचत') || q.includes('reduce')) {
      if (language === 'hi') {
        text = `${crop} की खेती में लागत 25% तक कम करने के 3 व्यावहारिक उपाय:
1. जीवामृत व घनजीवामृत घर पर बनाएं: रासायनिक खाद का 30% खर्च पहले साल में ही बचेगा।
2. कस्टम हायरिंग सेंटर (CHC) से उपकरण किराए पर लें: महंगे ट्रैक्टर/स्प्रेयर खरीदने के बजाय स्थानीय सेवा प्रदाता चुनें।
3. सरकारी योजनाओं (SMAM व पर ड्रॉप मोर क्रॉप) का 40-55% अनुदान लेकर ड्रिप सिस्टम लगाएं।`;
      } else if (language === 'mr') {
        text = `${crop} शेतीमधील उत्पादन खर्च २५% कमी करण्याचे ३ उपाय:
१. स्वतः शेतात जीवामृत व गांडूळ खत तयार करा: यामुळे रासायनिक खतांचा ३०% खर्च पहिल्याच वर्षात वाचेल.
२. अवजारे भाडेतत्त्वावर (CHC) वापरा: महागडी यंत्रे खरेदी करण्याऐवजी कस्टम हायरिंग केंद्राचा लाभ घ्या.
३. ठिबक सिंचन व तुषार सिंचनासाठी शासनाचे ५५% अनुदान मिळवून पाण्याची व विजेची बचत करा.`;
      } else {
        text = `3 Practical Strategies to Cut Cultivation Costs in ${crop}:
1. On-farm bio-input production: Preparing Jeevamrut and vermicompost reduces synthetic NPK fertilizer expenditure by 25-30%.
2. Leverage Custom Hiring Centers (CHCs): Renting tractors and boom sprayers avoids high capital debt.
3. Access Government Subsidies: Apply for the 55% micro-irrigation subsidy under 'Per Drop More Crop' to slash water and electricity bills.`;
      }
    } else {
      if (language === 'hi') {
        text = `आपके प्रश्न के आधार पर ${crop} (${soil}, ${district}) हेतु समग्र सलाह:
- वर्तमान फसल अवस्था (${stage}) में नियमित रूप से पौधों की निगरानी करें।
- किसी भी संदिग्ध पत्ती के लक्षण दिखने पर तुरंत हमारे "रोग स्कैनर" में फोटो अपलोड करें।
- मौसम पूर्वानुमान के अनुसार आगामी 2 दिनों तक मौसम अनुकूल है, आवश्यक कृषि कार्य संपन्न करें।`;
      } else if (language === 'mr') {
        text = `तुमच्या प्रश्नानुसार ${crop} (${soil}, ${district}) पिकासाठी सर्वसाधारण सल्ला:
- सध्याच्या वाढीच्या अवस्थेत (${stage}) पिकाची नियमित पाहणी करा.
- पानांवर रोग किंवा डाग दिसल्यास ताबडतोब "पीक रोग स्कॅनर" द्वारे फोटो काढून खात्री करा.
- हवामान अंदाजानुसार पुढील २ दिवस हवामान कोरडे असल्याने आवश्यक शेतीकामे पूर्ण करा.`;
      } else {
        text = `Advisory for ${crop} on ${soil} in ${district}:
- Closely monitor your crop during this critical stage (${stage}).
- Use our Crop Disease Scanner to snap any suspicious leaf spotting.
- Favorable weather window over the next 48 hours allows scheduled weeding and foliar nutrition.`;
      }
    }

    return {
      id: 'msg_' + Date.now(),
      sender: 'ai',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      confidence,
      riskLevel,
      expertReferralRequired,
      kvkContact: {
        name: 'Dr. Sunita Deshmukh (Senior Agronomist)',
        phone: '+91 94231 87654',
        district: district
      },
      contextSnapshot: context,
      isDemo: true
    };
  }
}
