import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { MANDI_PRICES, MARKETPLACE_SERVICES } from '../data/demoData';
import { MarketplaceService } from '../types';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

export const MarketplacePage: React.FC = () => {
  const { t, language } = useLanguage();

  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('all');
  const [mandiSearch, setMandiSearch] = useState('');

  const filteredMandi = MANDI_PRICES.filter((m) => {
    const q = mandiSearch.toLowerCase();
    return (
      m.commodity.toLowerCase().includes(q) ||
      m.market.toLowerCase().includes(q) ||
      m.district.toLowerCase().includes(q)
    );
  });

  const filteredServices = MARKETPLACE_SERVICES.filter((s) => {
    if (selectedServiceCategory === 'all') return true;
    return s.category === selectedServiceCategory;
  });

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏪</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {t.navMarketplace}
              </h1>
              <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                APMC & Local Services
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
              Daily wholesale agricultural market rates and verified local machinery, soil testing, and drone service providers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#2d6a4f] text-emerald-200 border border-emerald-500/50 text-xs px-3 py-1.5 rounded-2xl font-semibold">
              Live Mandi Bulletins
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Notice */}
        <DisclaimerBanner type="demo" customText="APMC Market Data & Service Listings: Rates are representative daily mandi auction averages (Agmarknet bulletin format). Contact local APMC market yards for immediate morning lot bidding." />

        {/* Section 1: APMC Mandi Daily Prices */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 my-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-4">
            <div>
              <h3 className="font-extrabold text-[#1b4332] text-lg flex items-center gap-2">
                <span>📈</span> {t.mandiPricesTitle}
              </h3>
              <p className="text-xs text-stone-500">
                Official APMC daily modal prices across key agricultural trade hubs
              </p>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={mandiSearch}
                onChange={(e) => setMandiSearch(e.target.value)}
                placeholder="Search commodity or market..."
                className="w-full text-xs p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
                  <th className="p-3">Commodity</th>
                  <th className="p-3">APMC Market Yard</th>
                  <th className="p-3">Min Rate</th>
                  <th className="p-3">Max Rate</th>
                  <th className="p-3">Modal (Avg) Price</th>
                  <th className="p-3">Trend</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredMandi.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="p-3 font-bold text-stone-900">
                      {language === 'mr' ? item.commodityMr : language === 'hi' ? item.commodityHi : item.commodity}
                    </td>
                    <td className="p-3 font-medium text-stone-600">
                      {item.market} ({item.district})
                    </td>
                    <td className="p-3 text-stone-600">₹{item.minPrice}</td>
                    <td className="p-3 text-stone-600">₹{item.maxPrice}</td>
                    <td className="p-3 font-black text-emerald-900 text-sm">
                      ₹{item.modalPrice} <span className="text-[10px] font-normal text-stone-500">{item.unit}</span>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.trend === 'up'
                          ? 'bg-emerald-100 text-emerald-900'
                          : item.trend === 'down'
                          ? 'bg-red-100 text-red-900'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {item.trend === 'up' ? '▲ Up' : item.trend === 'down' ? '▼ Down' : '● Stable'}
                      </span>
                    </td>
                    <td className="p-3 text-[10px] text-stone-500">
                      {item.priceDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Nearby Agricultural Services (Machinery, Drone, Soil Lab, Storage) */}
        <div className="my-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-extrabold text-[#1b4332] text-xl">
                {t.localServicesTitle}
              </h3>
              <p className="text-xs text-stone-500">
                Verified tractor rentals, drone sprayers, and certified soil testing labs
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'drone', label: '🚁 Drone Spray' },
                { id: 'equipment', label: '🚜 Tractors & Seeders' },
                { id: 'soil_testing', label: '🧪 Soil Labs' },
                { id: 'storage', label: '❄️ Cold Storage' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedServiceCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    selectedServiceCategory === cat.id
                      ? 'bg-[#2d6a4f] text-white shadow'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 hover:border-[#52b788] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {service.category === 'drone' ? 'Agri Drone' : service.category === 'equipment' ? 'Machinery Rental' : service.category === 'soil_testing' ? 'NABL Soil Lab' : 'Storage'}
                      </span>
                      <h4 className="text-base font-bold text-stone-900 mt-2">
                        {service.title}
                      </h4>
                    </div>
                    <span className="text-sm font-bold bg-amber-50 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-200">
                      ★ {service.rating}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-stone-600 mb-2">
                    Provider: {service.providerName}
                  </p>

                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs mb-3 space-y-1">
                    <p className="text-stone-700">
                      <strong>Pricing:</strong> {service.pricing}
                    </p>
                    <p className="text-stone-500 text-[11px]">
                      📍 {service.address}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-bold">
                    ✓ Verified Service
                  </span>
                  <a
                    href={`tel:${service.contactPhone}`}
                    className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold rounded-xl flex items-center gap-1.5 shadow transition-colors"
                  >
                    <span>📞</span>
                    <span>Call Provider</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Farmer Producer Organizations (FPOs) Directory */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 my-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🤝</span>
            <h3 className="font-extrabold text-[#1b4332] text-lg">
              {t.fpoDirectory}
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-6">
            Join nearby FPOs to access bulk seed discounts, shared cold chain logistics, and direct export procurement:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="font-bold text-stone-900 text-sm block">Sahyadri Farmers Producer Co. Ltd</span>
              <p className="text-stone-600 text-[11px] mt-1">Grapes, Tomato, Pomegranate Export Hub</p>
              <p className="text-stone-500 text-[10px] mt-2">📍 Mohadi, Dindori, Nashik • 18,000+ Member Farmers</p>
              <div className="mt-3 text-[#2d6a4f] font-bold">Call: +91 2557 241000</div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="font-bold text-stone-900 text-sm block">Vinchur Onion & Oilseeds FPO</span>
              <p className="text-stone-600 text-[11px] mt-1">Soybean Seed Production & Onion Warehouses</p>
              <p className="text-stone-500 text-[10px] mt-2">📍 Niphad Taluka, Nashik • 1,200 Farmers</p>
              <div className="mt-3 text-[#2d6a4f] font-bold">Call: +91 94220 18450</div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="font-bold text-stone-900 text-sm block">Malwa Agri-Producer Company</span>
              <p className="text-stone-600 text-[11px] mt-1">Certified Lokwan Wheat & Organic Soybean</p>
              <p className="text-stone-500 text-[10px] mt-2">📍 Sanwer, Indore, MP • 2,400 Farmers</p>
              <div className="mt-3 text-[#2d6a4f] font-bold">Call: +91 98260 77123</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
