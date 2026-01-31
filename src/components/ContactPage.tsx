import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onBack: () => void;
}

export const ContactPage: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to Resend/SendGrid via Backend
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Contact Info */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{t('contact.title')}</h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            {t('contact.desc')}
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start">
               <div className="bg-blue-100 p-3 rounded-lg mr-4">
                 <Mail className="w-6 h-6 text-blue-600" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Email</h3>
                 <p className="text-gray-600">sales@cryzo.co.in</p>
                 <p className="text-sm text-gray-500 mt-1">Wholesale Inquiries only</p>
               </div>
            </div>

            <div className="flex items-start">
               <div className="bg-green-100 p-3 rounded-lg mr-4">
                 <Phone className="w-6 h-6 text-green-600" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Phone & WhatsApp</h3>
                 <p className="text-gray-600">+1 940-400-9316</p>
                 <p className="text-sm text-gray-500 mt-1">Available Mon-Fri, 9am - 6pm EST</p>
               </div>
            </div>

            <div className="flex items-start">
               <div className="bg-purple-100 p-3 rounded-lg mr-4">
                 <MapPin className="w-6 h-6 text-purple-600" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Headquarters</h3>
                 <p className="text-gray-600">Cryzo LLC</p>
                 <p className="text-sm text-gray-500">Delaware, USA</p>
               </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-fade-in delay-100">
           {submitted ? (
             <div className="text-center py-12">
               <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.success')}</h3>
               <p className="text-gray-500 mb-6">We will get back to you shortly.</p>
               <button 
                 onClick={onBack}
                 className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-2 rounded-lg font-bold transition-colors"
               >
                 Back to Inventory
               </button>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.name')}</label>
                   <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.email')}</label>
                   <input type="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.subject')}</label>
                   <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none">
                      <option>General Inquiry</option>
                      <option>Bulk Order (Over 100 units)</option>
                      <option>Logistics / Shipping</option>
                      <option>Payment Issue</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.message')}</label>
                   <textarea required rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all">
                   <Send className="w-5 h-5 mr-2" />
                   {t('contact.send')}
                </button>
             </form>
           )}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
