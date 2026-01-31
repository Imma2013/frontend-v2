import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, Mail } from 'lucide-react';

interface Props {
  onNavigate: (view: 'about' | 'terms' | 'grading' | 'shipping' | 'privacy' | 'contact') => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-cryzo-dark text-gray-400 py-16 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 pr-8">
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-4">CRYZO</h2>
            <p className="text-sm mb-8 leading-relaxed text-gray-400 max-w-sm">
              {t('footer.tagline')}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <img src="https://flagcdn.com/w40/hk.png" alt="Hong Kong" className="h-6 w-auto rounded shadow-sm hover:-translate-y-1 transition-transform" title="Hong Kong" />
              <img src="https://flagcdn.com/w40/jp.png" alt="Japan" className="h-6 w-auto rounded shadow-sm hover:-translate-y-1 transition-transform" title="Japan" />
              <img src="https://flagcdn.com/w40/au.png" alt="Australia" className="h-6 w-auto rounded shadow-sm hover:-translate-y-1 transition-transform" title="Australia" />
              <img src="https://flagcdn.com/w40/eu.png" alt="Europe" className="h-6 w-auto rounded shadow-sm hover:-translate-y-1 transition-transform" title="Europe" />
              <img src="https://flagcdn.com/w40/ca.png" alt="Canada" className="h-6 w-auto rounded shadow-sm hover:-translate-y-1 transition-transform" title="Canada" />
              <img src="https://flagcdn.com/w40/us.png" alt="USA" className="h-6 w-auto rounded shadow-sm hover:-translate-y-1 transition-transform" title="USA" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">{t('footer.quick_links')}</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">{t('footer.about')}</button></li>
              <li><button onClick={() => onNavigate('grading')} className="hover:text-white transition-colors text-left">{t('footer.grading')}</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors text-left">{t('footer.terms')}</button></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">{t('footer.support')}</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('shipping')} className="hover:text-white transition-colors text-left">{t('footer.shipping')}</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors text-left">{t('footer.returns')}</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors text-left">{t('footer.privacy')}</button></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1 md:col-span-3">
             <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">{t('footer.connect')}</h4>
             <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <a href="mailto:sales@cryzo.co.in" className="text-white hover:text-blue-400 font-medium transition-colors">sales@cryzo.co.in</a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <a href="https://wa.me/19404009316" className="text-white hover:text-green-400 font-medium transition-colors flex items-center">
                  +1 940-400-9316
                </a>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold transition-colors text-center text-sm"
                >
                  {t('footer.contact_us')}
                </button>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 CRYZO LLC. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <button onClick={() => onNavigate('privacy')} className="hover:text-gray-300 transition-colors">{t('footer.privacy')}</button>
             <button onClick={() => onNavigate('privacy')} className="hover:text-gray-300 transition-colors">Cookie Policy</button>
             <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
