// FILE: components/ProfileDashboard.tsx
import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag } from 'lucide-react';
import { DashboardStats } from './DashboardStats';
import { OrdersTable } from './OrdersTable';
import type { Product } from '../types';

interface Props { 
  onNavigateHome: () => void;
  onUpdateGlobalInventory: (products: Product[]) => void;
}

export const ProfileDashboard: React.FC<Props> = ({ onNavigateHome, onUpdateGlobalInventory }) => {
  const [tab, setTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-50">
       <aside className="w-64 bg-white border-r p-4 hidden md:block">
          <h2 className="font-bold text-xl mb-6 px-4">CRYZO Dealer</h2>
          <nav className="space-y-1">
             <button onClick={() => setTab('dashboard')} className={`w-full text-left px-4 py-2 rounded flex items-center ${tab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
                <LayoutDashboard className="mr-2 w-4 h-4"/> Dashboard
             </button>
             <button onClick={() => setTab('orders')} className={`w-full text-left px-4 py-2 rounded flex items-center ${tab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
                <ShoppingBag className="mr-2 w-4 h-4"/> Orders
             </button>
             <button onClick={onNavigateHome} className="w-full text-left px-4 py-2 text-red-600 mt-4 font-bold">Back to Shop</button>
          </nav>
       </aside>
       <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold capitalize mb-6">{tab}</h1>
          
          {tab === 'dashboard' && (
            <>
              <DashboardStats />
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="text-gray-500">Welcome back, Orion Electronics Ltd. You have 12 active orders.</div>
              </div>
            </>
          )}
          
          
          {tab === 'orders' && (
            <OrdersTable />
          )}
       </main>
    </div>
  );
}
