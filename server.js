// KrishiMitra AI - Decentralized Node HTTP API & Static Web Server
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// In-memory data store for community posts and alerts
let communityPosts = [
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
        content: 'Check the leaf undersides for whitefly nymphs. If whiteflies are absent and veins remain green, this is temporary nitrogen leaching due to water-logging in black soil. Spray 19:19:19 soluble fertilizer @ 5g/liter water + micro-nutrients.',
        timestamp: '1 hour ago',
        upvotes: 21,
        isVerifiedExpertResponse: true
      }
    ],
    nodeId: 'node_kvk_nashik_01',
    blockHash: '0x8f2d1e99a4c8034567b120ef9a34bc9876543210fedcba987654321012345678',
    signature: 'sig_ed25519_4b1a89f9node_kvk'
  }
];

let cropAlerts = [
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
    description: 'Pheromone trap catches exceeded ETL threshold (>8 moths/night) across 4 neighboring villages.',
    lat: 20.1983,
    lng: 73.8447,
    isDemo: true
  }
];

// Helper to parse JSON body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', err => reject(err));
  });
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // API ROUTING
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Health
    if (pathname === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'ok',
        app: 'KrishiMitra AI',
        version: '1.0.0',
        nodeId: 'node_kvk_nashik_01',
        blockHeight: 14820,
        timestamp: new Date().toISOString()
      }));
      return;
    }

    // Advisory AI Endpoint
    if (pathname === '/api/advisory' && req.method === 'POST') {
      const data = await parseJsonBody(req);
      const query = data.query || '';
      const context = data.context || {};
      const language = data.language || 'hi';

      const crop = context.cropName || 'crop';
      const district = context.district || 'Nashik';

      let reply = '';
      if (language === 'mr') {
        reply = `तुमच्या ${district} भागातील ${crop} पिकासाठी अचूक सल्ला:\n१. सध्याच्या वाढीच्या अवस्थेत ओलावा तपासूनच सिंचन करा.\n२. प्राथमिक कीड नियंत्रणासाठी कडुनिंब तेल (1500 PPM) ५ मिली/लिटर फवारा.\n३. अधिक तीव्र प्रादुर्भाव असल्यास जवळच्या कृषी विज्ञान केंद्राशी संपर्क साधा.`;
      } else if (language === 'hi') {
        reply = `आपके ${district} क्षेत्र में ${crop} के लिए कृषि सलाह:\n1. वर्तमान अवस्था में संतुलित नमी बनाए रखें और ड्रिप से सिंचाई करें।\n2. कीट नियंत्रण हेतु प्रारंभिक अवस्था में नीम तेल (1500 PPM) 5 मिली/लीटर का छिड़काव करें।\n3. गंभीर समस्या पर निकटतम कृषि विज्ञान केंद्र के विशेषज्ञ से सलाह लें।`;
      } else {
        reply = `Agricultural Advisory for ${crop} in ${district}:\n1. Irrigate based on root-zone soil moisture to prevent waterlogging.\n2. Apply Neem oil (1500 ppm) @ 5ml/L water for prophylactic pest defense.\n3. In case of severe infestation, consult your local KVK agronomist.`;
      }

      res.writeHead(200);
      res.end(JSON.stringify({
        id: 'msg_' + Date.now(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        confidence: 0.93,
        riskLevel: 'low',
        expertReferralRequired: false,
        kvkContact: {
          name: 'Dr. Sunita Deshmukh (Senior Agronomist)',
          phone: '+91 94231 87654',
          district: district
        },
        isDemo: true
      }));
      return;
    }

    // Community Posts
    if (pathname === '/api/community') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(communityPosts));
        return;
      }
      if (req.method === 'POST') {
        const newPost = await parseJsonBody(req);
        // Calculate SHA-256 hash
        const raw = `${newPost.authorId}:${newPost.timestamp}:${newPost.crop}:${newPost.title}:${newPost.content}`;
        const hash = '0x' + crypto.createHash('sha256').update(raw).digest('hex');
        const signedPost = {
          ...newPost,
          id: 'post_' + Date.now(),
          blockHash: hash,
          signature: 'sig_ed25519_' + crypto.randomBytes(8).toString('hex'),
          nodeId: 'node_kvk_nashik_01',
          upvotes: 1,
          helpfulCount: 0,
          answers: []
        };
        communityPosts.unshift(signedPost);
        res.writeHead(201);
        res.end(JSON.stringify(signedPost));
        return;
      }
    }

    // Alerts
    if (pathname === '/api/alerts') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(cropAlerts));
        return;
      }
      if (req.method === 'POST') {
        const newAlert = await parseJsonBody(req);
        const savedAlert = {
          ...newAlert,
          id: 'alert_' + Date.now(),
          reportedAt: 'Just now',
          verifiedFarmersCount: 1,
          isDemo: true
        };
        cropAlerts.unshift(savedAlert);
        res.writeHead(201);
        res.end(JSON.stringify(savedAlert));
        return;
      }
    }

    // 404 for unknown API
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
    return;
  }

  // STATIC FILE SERVING
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  // If root requested, serve index.html
  if (pathname === '/' || pathname === '') {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  // Check if file exists in public/
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // Fallback: HTML5 PushState routing -> serve index.html
      const fallbackPath = path.join(PUBLIC_DIR, 'index.html');
      fs.stat(fallbackPath, (fbErr, fbStats) => {
        if (!fbErr && fbStats.isFile()) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(fallbackPath).pipe(res);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` 🌱 KrishiMitra AI – Smart Farming, Shared Knowledge`);
  console.log(` 🚀 Server listening on http://localhost:${PORT}`);
  console.log(` 🔒 Node ID: node_kvk_nashik_01 (KVK AgroNode Online)`);
  console.log(` 📲 PWA Service Worker: /sw.js`);
  console.log(`=======================================================`);
});
