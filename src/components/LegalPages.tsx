import React from 'react';
import { ShieldCheck, Truck, Users, ArrowLeft, Building2, CheckCircle, XCircle, Globe, Package, FileText, Lock } from 'lucide-react';

interface Props {
  view: 'about' | 'terms' | 'grading' | 'shipping' | 'privacy';
  onBack: () => void;
}

export const LegalPages: React.FC<Props> = ({ view, onBack }) => {
  
  const renderPrivacy = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 animate-fade-in">
       <div className="flex items-center mb-6">
         <Lock className="w-8 h-8 text-blue-600 mr-4" />
         <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
       </div>
       <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">Last updated: January 2026</p>

       <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h3 className="font-bold text-gray-900 text-lg mb-3">Data Protection & Technology</h3>
            <p className="mb-4">At Cryzo, we utilize enterprise-grade infrastructure to secure your wholesale data.</p>
            <ul className="grid md:grid-cols-2 gap-4 text-sm">
               <li className="flex items-center p-3 bg-gray-50 rounded-lg"><CheckCircle className="w-4 h-4 text-green-500 mr-2"/> MongoDB Atlas for encrypted data storage</li>
               <li className="flex items-center p-3 bg-gray-50 rounded-lg"><CheckCircle className="w-4 h-4 text-green-500 mr-2"/> Resend API for secure transactional emails</li>
               <li className="flex items-center p-3 bg-gray-50 rounded-lg"><CheckCircle className="w-4 h-4 text-green-500 mr-2"/> Stripe for PCI-compliant payments</li>
               <li className="flex items-center p-3 bg-gray-50 rounded-lg"><CheckCircle className="w-4 h-4 text-green-500 mr-2"/> Cloudflare for DDoS protection</li>
            </ul>
          </section>

          <section>
             <h3 className="font-bold text-gray-900 text-lg mb-3">Information Collection</h3>
             <p className="mb-2">We collect only B2B-relevant data:</p>
             <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Business Entity Information (LLC/Corp details)</li>
                <li>Shipping & Logistics preferences (Freight forwarder details)</li>
                <li>Transaction history for accounting</li>
             </ul>
          </section>

          <section>
             <h3 className="font-bold text-gray-900 text-lg mb-3">How We Share Information</h3>
             <p className="mb-2">We do not sell data. We share only with necessary logistic partners:</p>
             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm">
                <p><strong>Logistics Partners:</strong> FedEx, DHL, and specialized freight forwarders for customs clearance in UAE/Africa.</p>
                <p className="mt-2"><strong>Compliance:</strong> We may disclose information to customs authorities as required by international export laws.</p>
             </div>
          </section>
       </div>
    </div>
  );

  const renderShipping = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 animate-fade-in">
       <div className="flex items-center mb-6">
         <Truck className="w-8 h-8 text-blue-600 mr-4" />
         <h1 className="text-3xl font-bold text-gray-900">Shipping & Logistics</h1>
       </div>
       <p className="text-gray-600 mb-8">Fast, secure international shipping from our USA and Hong Kong distribution hubs.</p>

       <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
             <Globe className="w-8 h-8 text-blue-500 mb-3" />
             <h3 className="font-bold text-gray-900 mb-2">Global Transit</h3>
             <p className="text-sm text-gray-500">Secure shipping from North America (USA/Canada) and Hong Kong directly to your freight forwarder or doorstep.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
             <FileText className="w-8 h-8 text-purple-500 mb-3" />
             <h3 className="font-bold text-gray-900 mb-2">Customs Handling</h3>
             <p className="text-sm text-gray-500">Professional commercial invoices provided. We assist with clearing customs in difficult regions.</p>
          </div>
       </div>

       <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Zones & Timelines</h2>
       <div className="space-y-4 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
             <div>
               <h4 className="font-bold text-gray-900">Middle East (UAE, KSA, Qatar)</h4>
               <p className="text-xs text-gray-500">Express Shipping</p>
             </div>
             <div className="mt-2 md:mt-0 font-mono text-blue-600 font-bold">5-7 Business Days</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
             <div>
               <h4 className="font-bold text-gray-900">Africa (Nigeria, Kenya, Ghana)</h4>
               <p className="text-xs text-gray-500">Standard International</p>
             </div>
             <div className="mt-2 md:mt-0 font-mono text-blue-600 font-bold">7-10 Business Days</div>
          </div>
          <div className="flex flex-col md:flex-row md:items_center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
             <div>
               <h4 className="font-bold text-gray-900">Europe (UK, DE, FR, IT)</h4>
               <p className="text-xs text-gray-500">Express Air</p>
             </div>
             <div className="mt-2 md:mt-0 font-mono text-blue-600 font-bold">7-10 Business Days</div>
          </div>
       </div>

       <div className="bg-gray-900 text-white p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-2 flex items-center"><Package className="w-5 h-5 mr-2"/> White Label Services</h3>
          <p className="text-sm text-gray-300 mb-4">
             We offer white labeling services where no stickers, branding, or invoices from Cryzo are included in the box. Your customer receives the package as if it came from you.
          </p>
          <span className="inline-block bg-blue-600 text-xs font-bold px-3 py-1 rounded">Available upon request</span>
       </div>
    </div>
  );

  const renderGrading = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 animate-fade-in">
      <div className="flex items-center mb-4">
        <ShieldCheck className="w-8 h-8 text-green-600 mr-4" />
        <h1 className="text-3xl font-bold text-gray-900">Quality & Grading</h1>
      </div>
      <p className="text-sm text-gray-500 mb-8">
         We guarantee authenticity and transparency. Every device sourced from verified North American and Hong Kong suppliers.
      </p>

      {/* Quality Promise Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
         <div className="p-4 bg-blue-50 rounded-lg text-center">
            <h4 className="font-bold text-blue-900 text-sm mb-1">Authentic</h4>
            <p className="text-xs text-blue-700">100% Verified Sources</p>
         </div>
         <div className="p-4 bg-purple-50 rounded-lg text-center">
            <h4 className="font-bold text-purple-900 text-sm mb-1">Transparent</h4>
            <p className="text-xs text-purple-700">Detailed Reports</p>
         </div>
         <div className="p-4 bg-green-50 rounded-lg text-center">
            <h4 className="font-bold text-green-900 text-sm mb-1">Tested</h4>
            <p className="text-xs text-green-700">Functionality Check</p>
         </div>
         <div className="p-4 bg-orange-50 rounded-lg text-center">
            <h4 className="font-bold text-orange-900 text-sm mb-1">Secure</h4>
            <p className="text-xs text-orange-700">Insured Shipping</p>
         </div>
      </div>

      <div className="space-y-8">
        {/* Brand New */}
        <div className="border border-green-200 rounded-xl overflow-hidden">
          <div className="bg-green-50 p-4 border-b border-green-100 flex justify-between items-center">
            <h3 className="font-bold text-green-800 text-lg">Brand New / Sealed</h3>
            <span className="bg-white text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">Grade A+</span>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4 text-sm">Devices are unopened in original manufacturer packaging. 100% cosmetic perfection.</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5"/> Original Box</div>
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5"/> 0 Charge Cycles</div>
              <div className="flex items-start text-orange-600"><CheckCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5"/> Warranty Varies*</div>
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">*Note: HK sourced devices may be active or inactive regarding Apple warranty. US sourced usually have 1 year.</p>
          </div>
        </div>

        {/* Refurb A */}
        <div className="border border-blue-200 rounded-xl overflow-hidden">
          <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
            <h3 className="font-bold text-blue-800 text-lg">Grade A (Like New)</h3>
            <span className="bg-white text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">Best Seller</span>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4 text-sm">Near perfect condition. Minimal to no signs of wear visible from arm's length.</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5"/> Screen: Flawless</div>
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5"/> Housing: Micro-scratches</div>
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5"/> Battery: 85%+ Health</div>
            </div>
          </div>
        </div>

        {/* Refurb B */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-lg">Grade B (Minor Wear)</h3>
            <span className="bg-white text-gray-600 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">Value Choice</span>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4 text-sm">Used condition with visible signs of normal wear. Great for lower-cost markets.</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-gray-400 mr-2 mt-0.5"/> Screen: Light scratches</div>
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-gray-400 mr-2 mt-0.5"/> Housing: Visible dings</div>
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-gray-400 mr-2 mt-0.5"/> Battery: 80%+ Health</div>
            </div>
          </div>
        </div>

         {/* Refurb C/D */}
         <div className="border border-orange-200 rounded-xl overflow-hidden opacity-90">
          <div className="bg-orange-50 p-4 border-b border-orange-100 flex justify-between items-center">
            <h3 className="font-bold text-orange-800 text-lg">Grade C / D (Heavy Wear)</h3>
            <span className="bg-white text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">High Margin</span>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4 text-sm">Heavy signs of use. May contain deep scratches, dents, or minor cracks (Grade D only).</p>
             <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5"/> Fully Functional</div>
              <div className="flex items-start"><XCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5"/> Deep scratches visible</div>
              <div className="flex items-start"><XCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5"/> Housing dents likely</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Connecting Global Markets to North American Tech</h1>
      
      <div className="prose prose-blue max-w-none">
        <p className="text-xl text-gray-500 leading-relaxed mb-10">
          At Cryzo LLC, we bridge the gap between verified global wholesale buyers and Tier 1 North American supply chains. We believe in transparency, speed, and uncompromising quality.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <ShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2 text-gray-900">Verified Sourcing</h3>
            <p className="text-sm text-gray-600">Inventory sourced directly from authorized US carriers and verified GSM Exchange partners.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
            <Truck className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2 text-gray-900">Global Logistics</h3>
            <p className="text-sm text-gray-600">Specialized air freight consolidation to UAE, Hong Kong, and African markets.</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
            <Users className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-lg mb-2 text-gray-900">Partner Focused</h3>
            <p className="text-sm text-gray-600">Building long-term supply relationships with wholesalers and retailers worldwide.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-8">
          We serve buyers worldwide by aggregating fragmented inventory from auction houses and major distributors into a single, cohesive marketplace. Whether you are a retailer in Dubai or a wholesaler in Lagos, Cryzo provides access to stock that was previously out of reach.
        </p>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-gray-400" /> Important Notice
          </h2>
          <p className="text-sm leading-relaxed">
            By using Cryzo LLC services, you agree to these terms. As a B2B wholesale platform, we operate under strict commercial guidelines. Please read carefully.
          </p>
        </section>
        
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <h3 className="font-bold text-red-700 mb-2 flex items-center">
            ⚠️ CRITICAL: NO WARRANTIES PROVIDED
          </h3>
          <p className="text-sm text-red-800 mb-4">
            All devices are sold <strong>AS-IS</strong> with NO consumer warranties. Cryzo LLC does not provide manufacturer warranties. All inventory is professionally graded by our upstream partners.
          </p>
          <p className="text-xs text-red-700">
            While we strive for accuracy, there is an inherent ~3-5% fallout rate from auction inventory that is industry standard.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Inventory
      </button>

      {view === 'grading' ? renderGrading() 
       : view === 'about' ? renderAbout() 
       : view === 'shipping' ? renderShipping()
       : view === 'privacy' ? renderPrivacy()
       : renderTerms()}
    </div>
  );
};

export default LegalPages;
