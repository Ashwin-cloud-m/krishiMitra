import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

interface DisclaimerBannerProps {
  type?: 'demo' | 'advisory' | 'warning';
  customText?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ type = 'demo', customText }) => {
  const { t } = useLanguage();

  if (type === 'demo') {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg shadow-sm flex items-start gap-2.5 my-3 text-xs md:text-sm text-amber-900">
        <span className="text-base select-none">🧪</span>
        <div>
          <span className="font-semibold uppercase tracking-wider text-[11px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded mr-2">
            Demo Sandbox
          </span>
          {customText || t.demoDataWarning}
        </div>
      </div>
    );
  }

  if (type === 'advisory') {
    return (
      <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-lg shadow-sm flex items-start gap-2.5 my-3 text-xs md:text-sm text-emerald-950">
        <span className="text-base select-none">🌿</span>
        <div>
          <span className="font-semibold uppercase tracking-wider text-[11px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded mr-2">
            Advisory Notice
          </span>
          {customText || t.disclaimerMedical}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg shadow-sm flex items-start gap-2.5 my-3 text-xs md:text-sm text-red-900">
      <span className="text-base select-none">⚠️</span>
      <div>
        <span className="font-semibold uppercase tracking-wider text-[11px] bg-red-200 text-red-900 px-1.5 py-0.5 rounded mr-2">
          Caution
        </span>
        {customText || 'High-risk intervention detected. Verify exact dilution with local extension agronomists.'}
      </div>
    </div>
  );
};
