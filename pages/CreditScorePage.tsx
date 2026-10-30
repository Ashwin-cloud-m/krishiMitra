import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import type {
  CreditApplicant,
  AlternativeDataSources,
  CreditScoreResult,
  ScoreBreakdown,
  CreditProduct,
  ScoreHistoryEntry,
} from '../types/creditScore';
import { calculateCreditScore } from '../services/creditScoringEngine';
import {
  DEMO_APPLICANTS,
  DEMO_DATA_SOURCES,
  DEMO_SCORE_HISTORY,
  CREDIT_PRODUCTS,
} from '../data/creditScoreData';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Helper: animated counter hook
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function useAnimatedNumber(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);
  return value;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Helper: color utilities
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function getScoreColor(score: number) {
  if (score >= 701) return { ring: '#22c55e', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Excellent', emoji: '🌟' };
  if (score >= 601) return { ring: '#84cc16', bg: 'bg-lime-50', text: 'text-lime-700', label: 'Good', emoji: '✅' };
  if (score >= 501) return { ring: '#eab308', bg: 'bg-amber-50', text: 'text-amber-700', label: 'Fair', emoji: '⚠️' };
  if (score >= 401) return { ring: '#f97316', bg: 'bg-orange-50', text: 'text-orange-700', label: 'Poor', emoji: '🔶' };
  return { ring: '#ef4444', bg: 'bg-red-50', text: 'text-red-700', label: 'Very Poor', emoji: '🔴' };
}

function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    'Mobile Money & Transactions': '📱',
    'Utility Payment History': '💡',
    'Agricultural Profile': '🌾',
    'Social Capital & Trust': '🤝',
    'Rental Payment History': '🏠',
    'Digital Footprint': '🌐',
  };
  return icons[category] || '📊';
}

function getRiskBadge(risk: string) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    very_low: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Very Low Risk' },
    low: { bg: 'bg-lime-100', text: 'text-lime-800', label: 'Low Risk' },
    moderate: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Moderate Risk' },
    high: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'High Risk' },
    very_high: { bg: 'bg-red-100', text: 'text-red-800', label: 'Very High Risk' },
  };
  return map[risk] || map.moderate;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Circular Gauge Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CircularScoreGauge: React.FC<{ score: number; maxScore?: number; size?: number }> = ({
  score,
  maxScore = 900,
  size = 220,
}) => {
  const animatedScore = useAnimatedNumber(score);
  const colors = getScoreColor(score);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = (score - 300) / (maxScore - 300); // 300 is min
  const strokeDashoffset = circumference - normalizedScore * circumference * 0.75; // 270° arc
  const center = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-[135deg]">
        {/* Background arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round"
        />
        {/* Score arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={colors.ring}
          strokeWidth="12"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-stone-800">{animatedScore}</span>
        <span className={`text-sm font-bold ${colors.text}`}>{colors.label}</span>
        <span className="text-[10px] text-stone-400 mt-0.5">out of {maxScore}</span>
      </div>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Score Breakdown Bar
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ScoreBreakdownBar: React.FC<{ item: ScoreBreakdown; index: number }> = ({ item, index }) => {
  const pct = (item.score / item.maxScore) * 100;
  const icon = getCategoryIcon(item.category);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-semibold text-sm text-stone-800">{item.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-stone-500">Weight: {(item.weight * 100).toFixed(0)}%</span>
          <span className="font-bold text-stone-800">{item.score.toFixed(0)}/{item.maxScore}</span>
          <span className="text-stone-400 text-xs">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: pct >= 70 ? '#22c55e' : pct >= 50 ? '#eab308' : pct >= 30 ? '#f97316' : '#ef4444',
            animationDelay: `${index * 150}ms`,
          }}
        />
      </div>

      {/* Factor details (expanded) */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-stone-100">
          <p className="text-xs font-semibold text-stone-500 mb-2">Contributing Factors:</p>
          <div className="flex flex-wrap gap-1.5">
            {item.factors.map((factor, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200"
              >
                <span>✓</span> {factor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Score History Mini Chart
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ScoreHistoryChart: React.FC<{ history: ScoreHistoryEntry[] }> = ({ history }) => {
  if (!history || history.length === 0) return null;

  const maxScore = Math.max(...history.map((h) => h.score));
  const minScore = Math.min(...history.map((h) => h.score));
  const range = maxScore - minScore || 1;
  const chartWidth = 100;
  const chartHeight = 60;

  const points = history.map((h, i) => {
    const x = (i / (history.length - 1)) * chartWidth;
    const y = chartHeight - ((h.score - minScore) / range) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4">
      <h4 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
        📈 Score History (12 Months)
      </h4>
      <div className="relative">
        <svg viewBox={`-5 -5 ${chartWidth + 10} ${chartHeight + 20}`} className="w-full h-32">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line
              key={pct}
              x1={0}
              y1={chartHeight * (1 - pct)}
              x2={chartWidth}
              y2={chartHeight * (1 - pct)}
              stroke="#f5f5f4"
              strokeWidth="0.5"
            />
          ))}
          {/* Area fill */}
          <polygon points={areaPoints} fill="url(#scoreGradient)" opacity="0.3" />
          {/* Line */}
          <polyline points={points} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Dots */}
          {history.map((h, i) => {
            const x = (i / (history.length - 1)) * chartWidth;
            const y = chartHeight - ((h.score - minScore) / range) * chartHeight;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="2.5" fill="#22c55e" stroke="white" strokeWidth="1" />
                {(i === 0 || i === history.length - 1) && (
                  <text x={x} y={y - 6} textAnchor="middle" fontSize="6" fill="#44403c" fontWeight="bold">
                    {h.score}
                  </text>
                )}
              </g>
            );
          })}
          {/* Month labels */}
          {history.filter((_, i) => i % 3 === 0 || i === history.length - 1).map((h, idx, arr) => {
            const originalIndex = history.indexOf(h);
            const x = (originalIndex / (history.length - 1)) * chartWidth;
            return (
              <text key={idx} x={x} y={chartHeight + 12} textAnchor="middle" fontSize="5" fill="#a8a29e">
                {h.date.split('-').slice(1).join('/')}
              </text>
            );
          })}
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-xs text-stone-500">
        <span>
          First: <strong className="text-stone-700">{history[0]?.score}</strong>
        </span>
        <span>
          Change:{' '}
          <strong className={history[history.length - 1]?.score > history[0]?.score ? 'text-emerald-600' : 'text-red-600'}>
            {history[history.length - 1]?.score > history[0]?.score ? '+' : ''}
            {(history[history.length - 1]?.score || 0) - (history[0]?.score || 0)}
          </strong>
        </span>
        <span>
          Latest: <strong className="text-stone-700">{history[history.length - 1]?.score}</strong>
        </span>
      </div>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Credit Product Card
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CreditProductCard: React.FC<{ product: CreditProduct; eligible: boolean }> = ({ product, eligible }) => {
  const typeIcons: Record<string, string> = {
    micro_loan: '💰',
    crop_loan: '🌾',
    equipment_loan: '🚜',
    kcc: '💳',
    shg_loan: '👥',
    gold_loan: '🥇',
    enterprise_loan: '🏭',
    working_capital: '💼',
  };

  return (
    <div
      className={`rounded-xl border-2 p-4 transition-all ${
        eligible
          ? 'border-emerald-300 bg-emerald-50/50 hover:shadow-lg hover:border-emerald-400'
          : 'border-stone-200 bg-stone-50 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeIcons[product.type] || '💰'}</span>
          <div>
            <h5 className="font-bold text-sm text-stone-800">{product.name}</h5>
            <p className="text-xs text-stone-500">{product.provider}</p>
          </div>
        </div>
        {eligible ? (
          <span className="text-xs bg-emerald-200 text-emerald-900 font-bold px-2.5 py-1 rounded-full">✓ Eligible</span>
        ) : (
          <span className="text-xs bg-stone-200 text-stone-600 font-bold px-2.5 py-1 rounded-full">🔒 Locked</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
        <div className="bg-white rounded-lg px-3 py-2 border border-stone-100">
          <span className="text-stone-400 block">Max Amount</span>
          <span className="font-bold text-stone-800">₹{(product.maxAmount / 1000).toFixed(0)}K</span>
        </div>
        <div className="bg-white rounded-lg px-3 py-2 border border-stone-100">
          <span className="text-stone-400 block">Interest</span>
          <span className="font-bold text-stone-800">{product.interestRateRange}</span>
        </div>
        <div className="bg-white rounded-lg px-3 py-2 border border-stone-100">
          <span className="text-stone-400 block">Tenure</span>
          <span className="font-bold text-stone-800">{product.tenureMonths} months</span>
        </div>
        <div className="bg-white rounded-lg px-3 py-2 border border-stone-100">
          <span className="text-stone-400 block">Min Score</span>
          <span className="font-bold text-stone-800">{product.minScoreRequired}</span>
        </div>
      </div>

      {product.features && product.features.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {product.features.slice(0, 3).map((f, i) => (
            <span key={i} className="text-[10px] bg-white border border-stone-200 text-stone-600 px-2 py-0.5 rounded-full">
              {f}
            </span>
          ))}
        </div>
      )}

      {eligible && (
        <button className="w-full mt-3 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white text-xs font-bold py-2.5 rounded-lg hover:from-[#2d6a4f] hover:to-[#40916c] transition-all transform active:scale-[0.98]">
          Apply Now →
        </button>
      )}
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Data Completeness Radar
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DataCompletenessRadar: React.FC<{ breakdown: ScoreBreakdown[] }> = ({ breakdown }) => {
  const categories = breakdown.map((b) => ({
    label: b.category.split(' ')[0], // short label
    value: (b.score / b.maxScore) * 100,
  }));

  const n = categories.length;
  const cx = 80;
  const cy = 80;
  const maxR = 60;

  const angleStep = (2 * Math.PI) / n;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const polygonPoints = categories.map((c, i) => {
    const p = getPoint(i, c.value);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4">
      <h4 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
        🎯 Data Completeness Radar
      </h4>
      <svg viewBox="0 0 160 160" className="w-full max-w-[280px] mx-auto">
        {/* Grid circles */}
        {[25, 50, 75, 100].map((pct) => (
          <circle key={pct} cx={cx} cy={cy} r={(pct / 100) * maxR} fill="none" stroke="#e7e5e4" strokeWidth="0.5" />
        ))}
        {/* Axes */}
        {categories.map((c, i) => {
          const p = getPoint(i, 100);
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#d6d3d1" strokeWidth="0.5" />
              <text
                x={getPoint(i, 120).x}
                y={getPoint(i, 120).y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="6"
                fill="#78716c"
                fontWeight="600"
              >
                {c.label}
              </text>
            </g>
          );
        })}
        {/* Data polygon */}
        <polygon points={polygonPoints} fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1.5" />
        {/* Data points */}
        {categories.map((c, i) => {
          const p = getPoint(i, c.value);
          return <circle key={i} cx={p.x} cy={p.y} r="3" fill="#22c55e" stroke="white" strokeWidth="1" />;
        })}
      </svg>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Alternative Data Input Form
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DataInputSection: React.FC<{
  dataSources: AlternativeDataSources;
  onUpdate: (ds: AlternativeDataSources) => void;
}> = ({ dataSources, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('mobile');

  const tabs = [
    { id: 'mobile', label: 'Mobile Money', icon: '📱' },
    { id: 'utility', label: 'Utility Bills', icon: '💡' },
    { id: 'agriculture', label: 'Agriculture', icon: '🌾' },
    { id: 'social', label: 'Social Capital', icon: '🤝' },
    { id: 'rental', label: 'Rental', icon: '🏠' },
    { id: 'digital', label: 'Digital', icon: '🌐' },
  ];

  const inputClass =
    'w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-stone-800';

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-stone-200 bg-stone-50 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5">
        {activeTab === 'mobile' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Monthly Transactions</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.mobileMoney.transactionCount}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    mobileMoney: { ...dataSources.mobileMoney, transactionCount: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Avg Monthly Volume (₹)</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.mobileMoney.avgMonthlyVolume}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    mobileMoney: { ...dataSources.mobileMoney, avgMonthlyVolume: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Bill Payment Consistency (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-emerald-600"
                value={dataSources.mobileMoney.billPaymentConsistency}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    mobileMoney: { ...dataSources.mobileMoney, billPaymentConsistency: Number(e.target.value) },
                  })
                }
              />
              <div className="text-xs text-stone-500 text-right">{dataSources.mobileMoney.billPaymentConsistency}%</div>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Account Age (Days)</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.mobileMoney.accountAgeDays}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    mobileMoney: { ...dataSources.mobileMoney, accountAgeDays: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">P2P Transfer Frequency</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.mobileMoney.p2pTransferFrequency}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    mobileMoney: { ...dataSources.mobileMoney, p2pTransferFrequency: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Recharge Frequency</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.mobileMoney.rechargeFrequency}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    mobileMoney: { ...dataSources.mobileMoney, rechargeFrequency: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>
        )}

        {activeTab === 'agriculture' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Land Ownership</label>
              <select
                className={inputClass}
                value={dataSources.agriculture.landOwnership}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    agriculture: { ...dataSources.agriculture, landOwnership: e.target.value as any },
                  })
                }
              >
                <option value="owned">Owned</option>
                <option value="leased">Leased</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Land Size (Acres)</label>
              <input
                type="number"
                step="0.5"
                className={inputClass}
                value={dataSources.agriculture.landSizeAcres}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    agriculture: { ...dataSources.agriculture, landSizeAcres: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Farming Experience (Years)</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.agriculture.farmingExperienceYears}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    agriculture: { ...dataSources.agriculture, farmingExperienceYears: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Crop Diversity (Types)</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.agriculture.cropDiversity}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    agriculture: { ...dataSources.agriculture, cropDiversity: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-4 h-4"
                  checked={dataSources.agriculture.organicCertified}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      agriculture: { ...dataSources.agriculture, organicCertified: e.target.checked },
                    })
                  }
                />
                <span className="text-xs font-semibold text-stone-600">Organic Certified</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-4 h-4"
                  checked={dataSources.agriculture.usesDrip}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      agriculture: { ...dataSources.agriculture, usesDrip: e.target.checked },
                    })
                  }
                />
                <span className="text-xs font-semibold text-stone-600">Uses Drip/Sprinkler</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-4 h-4"
                  checked={dataSources.agriculture.cropInsuranceHistory}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      agriculture: { ...dataSources.agriculture, cropInsuranceHistory: e.target.checked },
                    })
                  }
                />
                <span className="text-xs font-semibold text-stone-600">Crop Insurance</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-4 h-4"
                  checked={dataSources.socialCapital.selfHelpGroupMember}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      socialCapital: { ...dataSources.socialCapital, selfHelpGroupMember: e.target.checked },
                    })
                  }
                />
                <span className="text-xs font-semibold text-stone-600">SHG Member</span>
              </label>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Group Savings (Months)</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.socialCapital.groupSavingsMonths}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    socialCapital: { ...dataSources.socialCapital, groupSavingsMonths: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Community Trust Score</label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-emerald-600"
                value={dataSources.socialCapital.communityTrustScore}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    socialCapital: { ...dataSources.socialCapital, communityTrustScore: Number(e.target.value) },
                  })
                }
              />
              <div className="text-xs text-stone-500 text-right">{dataSources.socialCapital.communityTrustScore}/100</div>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Referral Count</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.socialCapital.referralCount}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    socialCapital: { ...dataSources.socialCapital, referralCount: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-4 h-4"
                  checked={dataSources.socialCapital.cooperativeMembership}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      socialCapital: { ...dataSources.socialCapital, cooperativeMembership: e.target.checked },
                    })
                  }
                />
                <span className="text-xs font-semibold text-stone-600">Cooperative Member</span>
              </label>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Business Relationships</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.socialCapital.localBusinessRelationships}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    socialCapital: { ...dataSources.socialCapital, localBusinessRelationships: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>
        )}

        {activeTab === 'utility' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1 block">Avg Days Late</label>
                <input
                  type="number"
                  className={inputClass}
                  value={dataSources.utilityPayments.daysLateAvg}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      utilityPayments: { ...dataSources.utilityPayments, daysLateAvg: Number(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
            <div className="text-xs text-stone-500">
              <span className="font-semibold">Electricity:</span> {dataSources.utilityPayments.electricityPaymentHistory.length} months of history |{' '}
              <span className="font-semibold">Water:</span> {dataSources.utilityPayments.waterBillHistory.length} months
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="text-stone-500 border-b border-stone-200">
                    <th className="text-left py-2 px-2">Month</th>
                    <th className="text-left py-2 px-2">Electricity (₹)</th>
                    <th className="text-center py-2 px-2">On Time</th>
                    <th className="text-left py-2 px-2">Water (₹)</th>
                    <th className="text-center py-2 px-2">On Time</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSources.utilityPayments.electricityPaymentHistory.slice(0, 6).map((ep, idx) => {
                    const wp = dataSources.utilityPayments.waterBillHistory[idx];
                    return (
                      <tr key={idx} className="border-b border-stone-50">
                        <td className="py-1.5 px-2 text-stone-700">{ep.month}</td>
                        <td className="py-1.5 px-2 text-stone-700">₹{ep.amountPaid}</td>
                        <td className="py-1.5 px-2 text-center">{ep.onTime ? '✅' : '❌'}</td>
                        <td className="py-1.5 px-2 text-stone-700">{wp ? `₹${wp.amountPaid}` : '-'}</td>
                        <td className="py-1.5 px-2 text-center">{wp?.onTime ? '✅' : wp ? '❌' : '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'rental' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Monthly Rent (₹)</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.rental.monthlyRent}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    rental: { ...dataSources.rental, monthlyRent: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-4 h-4"
                  checked={dataSources.rental.landlordVerified}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      rental: { ...dataSources.rental, landlordVerified: e.target.checked },
                    })
                  }
                />
                <span className="text-xs font-semibold text-stone-600">Landlord Verified</span>
              </label>
            </div>
            <div className="col-span-full">
              <p className="text-xs text-stone-500">
                Payment History: {dataSources.rental.paymentHistory.filter((p) => p.onTime).length}/
                {dataSources.rental.paymentHistory.length} on-time payments
              </p>
            </div>
          </div>
        )}

        {activeTab === 'digital' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-4 h-4"
                  checked={dataSources.digitalFootprint.smartphoneOwnership}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      digitalFootprint: { ...dataSources.digitalFootprint, smartphoneOwnership: e.target.checked },
                    })
                  }
                />
                <span className="text-xs font-semibold text-stone-600">Smartphone Owner</span>
              </label>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Internet Usage (Months)</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.digitalFootprint.internetUsageMonths}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    digitalFootprint: { ...dataSources.digitalFootprint, internetUsageMonths: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">App Usage Score (0-100)</label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-emerald-600"
                value={dataSources.digitalFootprint.appUsageScore}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    digitalFootprint: { ...dataSources.digitalFootprint, appUsageScore: Number(e.target.value) },
                  })
                }
              />
              <div className="text-xs text-stone-500 text-right">{dataSources.digitalFootprint.appUsageScore}/100</div>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">E-commerce Transactions</label>
              <input
                type="number"
                className={inputClass}
                value={dataSources.digitalFootprint.ecommerceTransactions}
                onChange={(e) =>
                  onUpdate({
                    ...dataSources,
                    digitalFootprint: { ...dataSources.digitalFootprint, ecommerceTransactions: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-4 h-4"
                  checked={dataSources.digitalFootprint.socialMediaPresence}
                  onChange={(e) =>
                    onUpdate({
                      ...dataSources,
                      digitalFootprint: { ...dataSources.digitalFootprint, socialMediaPresence: e.target.checked },
                    })
                  }
                />
                <span className="text-xs font-semibold text-stone-600">Social Media Presence</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN PAGE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const CreditScorePage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  // State
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>(DEMO_APPLICANTS[0]?.id || '');
  const [dataSources, setDataSources] = useState<AlternativeDataSources>(
    DEMO_DATA_SOURCES[DEMO_APPLICANTS[0]?.id] || ({} as AlternativeDataSources)
  );
  const [scoreResult, setScoreResult] = useState<CreditScoreResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'data' | 'products' | 'methodology'>('overview');
  const [showExplainer, setShowExplainer] = useState(false);

  // Selected applicant
  const selectedApplicant = useMemo(
    () => DEMO_APPLICANTS.find((a) => a.id === selectedApplicantId) || DEMO_APPLICANTS[0],
    [selectedApplicantId]
  );

  // Score history
  const scoreHistory = useMemo(() => DEMO_SCORE_HISTORY[selectedApplicantId] || [], [selectedApplicantId]);

  // Calculate score
  const handleCalculateScore = () => {
    setIsCalculating(true);
    // Simulate API call delay for realism
    setTimeout(() => {
      const result = calculateCreditScore(selectedApplicant, dataSources);
      setScoreResult(result);
      setIsCalculating(false);
    }, 1500);
  };

  // Handle applicant change
  const handleApplicantChange = (id: string) => {
    setSelectedApplicantId(id);
    setDataSources(DEMO_DATA_SOURCES[id] || ({} as AlternativeDataSources));
    setScoreResult(null);
  };

  // Auto-calculate on first load
  useEffect(() => {
    if (selectedApplicant && dataSources) {
      handleCalculateScore();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#40916c] text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">💳</div>
          <div className="absolute top-20 right-20 text-6xl">📊</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">🌾</div>
          <div className="absolute bottom-5 right-10 text-5xl">🏦</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full">
                  🏦 Alternative Credit Model
                </span>
                <span className="bg-amber-400/30 text-amber-100 text-xs font-bold px-3 py-1 rounded-full">
                  DEMO ENGINE
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Credit Score for the <span className="text-[#95d5b2]">Unbanked</span>
              </h1>
              <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
                No CIBIL history? No bank statements? No problem. Our AI-powered alternative credit scoring model uses
                mobile money patterns, utility bills, farming data, social capital, and digital footprint to build a fair,
                transparent credit score for rural India's unbanked farmers.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['📱 Mobile Money', '💡 Utility Bills', '🌾 Farm Data', '🤝 Social Capital', '🌐 Digital'].map((tag) => (
                  <span key={tag} className="bg-white/10 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-row lg:flex-col gap-3">
              {[
                { value: '6', label: 'Data Sources', icon: '📊' },
                { value: '300-900', label: 'Score Range', icon: '📈' },
                { value: '45+', label: 'Variables', icon: '🧮' },
                { value: '85%', label: 'Accuracy', icon: '🎯' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 text-center min-w-[100px]"
                >
                  <span className="text-lg">{stat.icon}</span>
                  <p className="font-black text-lg text-white">{stat.value}</p>
                  <p className="text-[10px] text-emerald-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Applicant Selector & View Tabs ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Applicant Pills */}
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 block">
                Select Farmer Profile (Demo)
              </label>
              <div className="flex flex-wrap gap-2">
                {DEMO_APPLICANTS.map((applicant) => (
                  <button
                    key={applicant.id}
                    onClick={() => handleApplicantChange(applicant.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedApplicantId === applicant.id
                        ? 'bg-[#1b4332] text-white shadow-lg scale-105'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <span>{applicant.gender === 'female' ? '👩‍🌾' : '👨‍🌾'}</span>
                    <span>{applicant.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculateScore}
              disabled={isCalculating}
              className="flex items-center gap-2 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#40916c] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <span>🧮</span>
                  <span>Calculate Score</span>
                </>
              )}
            </button>
          </div>

          {/* View Tabs */}
          <div className="flex gap-1 mt-5 border-b border-stone-200 overflow-x-auto scrollbar-none">
            {[
              { id: 'overview' as const, label: 'Score Overview', icon: '📊' },
              { id: 'data' as const, label: 'Alternative Data', icon: '📝' },
              { id: 'products' as const, label: 'Credit Products', icon: '💳' },
              { id: 'methodology' as const, label: 'Methodology', icon: '🔬' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeView === tab.id
                    ? 'border-[#2d6a4f] text-[#1b4332]'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ══════════════════════════════════════════
            TAB: Score Overview
           ══════════════════════════════════════════ */}
        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* Loading State */}
            {isCalculating && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
                <p className="text-stone-600 font-semibold">Analyzing alternative data sources...</p>
                <p className="text-stone-400 text-sm mt-1">Crunching 45+ variables across 6 data categories</p>
              </div>
            )}

            {/* Score Results */}
            {scoreResult && !isCalculating && (
              <>
                {/* Applicant Info Bar */}
                <div className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                      {selectedApplicant.gender === 'female' ? '👩‍🌾' : '👨‍🌾'}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-800">{selectedApplicant.name}</h3>
                      <p className="text-xs text-stone-500">
                        {selectedApplicant.village}, {selectedApplicant.district}, {selectedApplicant.state} | Aadhaar: ****{selectedApplicant.aadhaarLastFour}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskBadge(scoreResult.riskCategory).bg} ${getRiskBadge(scoreResult.riskCategory).text}`}>
                      {getRiskBadge(scoreResult.riskCategory).label}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      Confidence: {scoreResult.confidence}%
                    </span>
                  </div>
                </div>

                {/* Score Gauge + Radar + History */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Gauge */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col items-center justify-center">
                    <h3 className="text-sm font-bold text-stone-800 mb-4 flex items-center gap-2">
                      🏆 Alternative Credit Score
                    </h3>
                    <CircularScoreGauge score={scoreResult.overallScore} />
                    <div className="mt-4 w-full">
                      <div className="flex justify-between text-[10px] text-stone-400 px-4">
                        <span>300</span>
                        <span>500</span>
                        <span>700</span>
                        <span>900</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden mt-1">
                        <div className="flex-1 bg-red-400" />
                        <div className="flex-1 bg-orange-400" />
                        <div className="flex-1 bg-amber-400" />
                        <div className="flex-1 bg-lime-400" />
                        <div className="flex-1 bg-emerald-400" />
                      </div>
                      <div className="flex justify-between text-[9px] text-stone-400 px-1 mt-0.5">
                        <span>V.Poor</span>
                        <span>Poor</span>
                        <span>Fair</span>
                        <span>Good</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>

                  {/* Radar */}
                  <DataCompletenessRadar breakdown={scoreResult.breakdown} />

                  {/* History */}
                  <ScoreHistoryChart history={scoreHistory} />
                </div>

                {/* Score Breakdown */}
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                    📋 Score Breakdown by Category
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scoreResult.breakdown.map((item, idx) => (
                      <ScoreBreakdownBar key={idx} item={item} index={idx} />
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
                  <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                    💡 AI Recommendations to Improve Your Score
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scoreResult.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-amber-100"
                      >
                        <span className="text-amber-500 font-bold mt-0.5">{idx + 1}.</span>
                        <p className="text-sm text-stone-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eligible Products Preview */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                      💳 You Qualify For
                    </h3>
                    <button
                      onClick={() => setActiveView('products')}
                      className="text-sm text-emerald-700 font-semibold hover:underline"
                    >
                      View All Products →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scoreResult.eligibleProducts.slice(0, 3).map((product) => (
                      <CreditProductCard key={product.id} product={product} eligible={true} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB: Alternative Data Input
           ══════════════════════════════════════════ */}
        {activeView === 'data' && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <h4 className="font-bold text-blue-900 text-sm">How Alternative Data Works</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Traditional credit bureaus require bank accounts and formal loans. Our model uses data you already
                  generate — mobile recharges, electricity bills, farming patterns, community relationships, and
                  digital activity — to build a comprehensive credit profile without any bank history.
                </p>
              </div>
            </div>

            <DataInputSection dataSources={dataSources} onUpdate={setDataSources} />

            <div className="flex justify-center">
              <button
                onClick={() => {
                  handleCalculateScore();
                  setActiveView('overview');
                }}
                className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#40916c] text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                🧮 Recalculate Score with Updated Data →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB: Credit Products
           ══════════════════════════════════════════ */}
        {activeView === 'products' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
              <span className="text-2xl">🏦</span>
              <div>
                <h4 className="font-bold text-emerald-900 text-sm">Available Credit Products</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Based on your alternative credit score of{' '}
                  <strong>{scoreResult?.overallScore || '---'}</strong>, here are the financial products
                  available to you. Products marked "Eligible" can be applied for immediately through partner
                  institutions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CREDIT_PRODUCTS.map((product) => {
                const isEligible = scoreResult
                  ? scoreResult.overallScore >= product.minScoreRequired
                  : false;
                return (
                  <CreditProductCard key={product.id} product={product} eligible={isEligible} />
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB: Methodology
           ══════════════════════════════════════════ */}
        {activeView === 'methodology' && (
          <div className="space-y-8">
            {/* Why Alternative Scoring? */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
              <h3 className="text-xl font-black text-stone-800 mb-4 flex items-center gap-2">
                🔬 Methodology: Alternative Credit Scoring Model
              </h3>
              <div className="prose prose-sm max-w-none text-stone-600">
                <p className="text-base leading-relaxed">
                  India has over <strong>190 million unbanked adults</strong> and approximately{' '}
                  <strong>350 million underbanked</strong> individuals who lack formal credit histories with traditional
                  credit bureaus (CIBIL, Equifax, Experian). Our Alternative Credit Scoring Model bridges this gap by
                  analyzing non-traditional data sources that these individuals already generate through daily life.
                </p>
              </div>
            </div>

            {/* Scoring Categories Deep Dive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: '📱',
                  title: 'Mobile Money & Transaction Data',
                  weight: '20%',
                  color: 'bg-blue-50 border-blue-200',
                  desc: 'Analyzes UPI, mobile wallet, and recharge patterns. Consistent digital transactions signal financial discipline. Metrics: transaction frequency, volume consistency, bill payment regularity, account age, P2P transfer patterns.',
                  variables: ['Transaction Count', 'Monthly Volume', 'Bill Consistency', 'Account Age', 'P2P Frequency', 'Recharge Pattern'],
                },
                {
                  icon: '💡',
                  title: 'Utility Payment History',
                  weight: '18%',
                  color: 'bg-amber-50 border-amber-200',
                  desc: 'Electricity and water bill payment patterns are strong proxies for creditworthiness. On-time utility payments across 12+ months demonstrate reliable cash flow management.',
                  variables: ['On-Time %', 'Payment Consistency', 'Days Late Avg', 'History Length', 'Multi-Utility Coverage'],
                },
                {
                  icon: '🌾',
                  title: 'Agricultural Profile',
                  weight: '25%',
                  color: 'bg-emerald-50 border-emerald-200',
                  desc: 'The highest-weighted category for rural borrowers. Evaluates farming assets, experience, crop diversity (risk mitigation), yield performance, and investment in modern techniques like drip irrigation.',
                  variables: ['Land Ownership', 'Farm Experience', 'Crop Diversity', 'Yield Performance', 'Equipment Assets', 'Insurance History', 'Irrigation Investment'],
                },
                {
                  icon: '🤝',
                  title: 'Social Capital & Trust Network',
                  weight: '15%',
                  color: 'bg-purple-50 border-purple-200',
                  desc: 'Self-Help Group (SHG) membership, cooperative participation, community endorsements, and peer referrals form a trust-based assessment layer unique to underbanked communities.',
                  variables: ['SHG Membership', 'Savings Duration', 'Community Trust', 'Cooperative Status', 'Referrals', 'Business Links'],
                },
                {
                  icon: '🏠',
                  title: 'Rental Payment History',
                  weight: '12%',
                  color: 'bg-orange-50 border-orange-200',
                  desc: 'For tenants, consistent rent payments demonstrate financial commitment. Landlord verification adds credibility. Particularly valuable when utility data is limited.',
                  variables: ['On-Time %', 'Landlord Verified', 'Payment Consistency', 'Rent-to-Income Ratio'],
                },
                {
                  icon: '🌐',
                  title: 'Digital Footprint',
                  weight: '10%',
                  color: 'bg-cyan-50 border-cyan-200',
                  desc: 'Basic digital literacy indicators including smartphone ownership, internet usage duration, app engagement, and e-commerce activity. Lower weight due to digital divide considerations.',
                  variables: ['Smartphone', 'Internet Duration', 'App Engagement', 'E-Commerce', 'Social Presence'],
                },
              ].map((cat) => (
                <div key={cat.title} className={`rounded-2xl border-2 p-5 ${cat.color}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-stone-800 flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span> {cat.title}
                    </h4>
                    <span className="bg-white text-stone-700 text-xs font-bold px-2.5 py-1 rounded-full border border-stone-200">
                      Weight: {cat.weight}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600 mb-3">{cat.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.variables.map((v) => (
                      <span key={v} className="text-[10px] bg-white/80 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Algorithm Steps */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                ⚙️ Scoring Algorithm Pipeline
              </h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Data Collection & Verification', desc: 'Gather alternative data from mobile operators, utility providers, land records, SHG registers, and digital platforms with user consent.', icon: '📥' },
                  { step: 2, title: 'Feature Engineering', desc: 'Extract 45+ behavioral features: payment consistency ratios, transaction velocity, asset indices, social graph density, and digital engagement scores.', icon: '🔧' },
                  { step: 3, title: 'Category Score Computation', desc: 'Each of 6 categories generates a normalized 0-100 score using domain-specific algorithms with carefully tuned thresholds.', icon: '🧮' },
                  { step: 4, title: 'Weighted Aggregation', desc: 'Category scores are combined using configurable weights (Agriculture: 25%, Mobile: 20%, Utility: 18%, Social: 15%, Rental: 12%, Digital: 10%).', icon: '⚖️' },
                  { step: 5, title: 'Scale Mapping (300-900)', desc: 'Raw composite score (0-100) is mapped to a 300-900 CIBIL-compatible scale using linear interpolation for interoperability with existing systems.', icon: '📐' },
                  { step: 6, title: 'Confidence & Risk Assessment', desc: 'Data completeness across sources determines confidence level. Risk category assigned: Very Low, Low, Moderate, High, Very High.', icon: '🎯' },
                  { step: 7, title: 'Product Matching & Recommendations', desc: 'Score matched against financial product eligibility criteria. Personalized improvement recommendations generated.', icon: '💳' },
                ].map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg font-bold text-emerald-800">
                      {step.step}
                    </div>
                    <div className="flex-1 pb-4 border-b border-stone-100 last:border-0">
                      <h5 className="font-bold text-sm text-stone-800 flex items-center gap-2">
                        <span>{step.icon}</span> {step.title}
                      </h5>
                      <p className="text-sm text-stone-500 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fairness & Transparency */}
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                🛡️ Fairness, Bias Mitigation & Transparency
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'No Gender Bias', desc: 'Gender is not used as a scoring variable. SHG participation is weighted equally regardless of gender.', icon: '⚖️' },
                  { title: 'Caste/Religion Neutral', desc: 'Zero socio-religious variables in the model. Scoring based purely on financial behavior and assets.', icon: '🚫' },
                  { title: 'Digital Divide Aware', desc: 'Digital footprint carries the lowest weight (10%) to avoid penalizing those without smartphones or internet.', icon: '📱' },
                  { title: 'Explainable AI', desc: 'Every score includes a complete breakdown with contributing factors. No black-box decisions.', icon: '🔍' },
                  { title: 'Data Minimization', desc: 'Only essential data points collected with explicit user consent. Compliant with data protection principles.', icon: '🔒' },
                  { title: 'Seasonal Adjustment', desc: 'Agricultural income volatility is accounted for — seasonal dips in cash flow don\'t disproportionately penalize.', icon: '📅' },
                ].map((item) => (
                  <div key={item.title} className="bg-white/70 rounded-xl p-4 border border-violet-100">
                    <h5 className="font-bold text-sm text-stone-800 flex items-center gap-2">
                      <span>{item.icon}</span> {item.title}
                    </h5>
                    <p className="text-xs text-stone-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                📊 Potential Impact (Projected)
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: '190M+', label: 'Unbanked Adults in India', color: 'text-red-600' },
                  { value: '350M+', label: 'Underbanked Population', color: 'text-orange-600' },
                  { value: '73%', label: 'Farmers Without Credit Score', color: 'text-amber-600' },
                  { value: '₹12T', label: 'Untapped Credit Market', color: 'text-emerald-600' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-stone-50 border border-stone-100">
                    <p className={`text-2xl sm:text-3xl font-black ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-stone-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Demo Disclaimer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-center">
          <p className="text-xs text-amber-700">
            <strong>⚠️ Demo Model Disclaimer:</strong> This is a demonstration credit scoring engine using synthetic
            data. It is designed for educational and prototyping purposes. Real-world deployment would require
            regulatory compliance (RBI guidelines), data partnership agreements with telcos/utilities, and rigorous
            statistical validation. Not intended for actual lending decisions.
          </p>
        </div>
      </div>
    </div>
  );
};
