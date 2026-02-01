import React from 'react';
import { ShoppingCart, LayoutDashboard, Box, LogOut, Heart, User, Clock, Globe, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigateHome: () => void;
  onUpdateGlobalInventory: () => void;
}

export const ProfileDashboard: React.FC<Props> = ({ onNavigateHome }) => {
  const stats = [
    { label: 'Total Spent', value: '$71,250', icon: <ShoppingCart className="w-5 h-5 text-blue-500" /> },
    { label: 'Active Orders', value: '2', icon: <Clock className="w-5 h-5 text-indigo-500" /> },
    { label: 'Trust Score', value: '98/100', icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
    { label: 'Hub Connection', value: 'USA-EAST', icon: <Globe className="w-5 h-5 text-amber-500" /> },
  ];

  const recentOrders = [
    { id: '#2931', date: 'Jan 19, 2026', items: 'iPhone 14 Pro Max (x15)', total: '$14,250', status: 'Processing', dest: 'Dubai, UAE' },
    { id: '#2932', date: 'Jan 18, 2026', items: 'iPhone 14 Pro Max (x15)', total: '$14,250', status: 'Shipped', dest: 'Dubai, UAE' },
    { id: '#2933', date: 'Jan 17, 2026', items: 'iPhone 14 Pro Max (x15)', total: '$14,250', status: 'Delivered', dest: 'Dubai, UAE' },
    { id: '#2934', date: 'Jan 16, 2026', items: 'iPhone 14 Pro Max (x15)', total: '$14,250', status: 'Delivered', dest: 'Dubai, UAE' },
    { id: '#2935', date: 'Jan 15, 2026', items: 'iPhone 14 Pro Max (x15)', total: '$14,250', status: 'Delivered', dest: 'Dubai, UAE' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-6">
        <div className="flex items-center space-x-2 mb-10">
            <Box className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-black tracking-tighter">CRYZO Dealer</span>
        </div>

        <nav className="flex-1 space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold transition-all">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-all">
                <ShoppingCart className="w-5 h-5" />
                <span>Orders</span>
            </button>
        </nav>

        <button onClick={onNavigateHome} className="mt-auto flex items-center space-x-2 text-red-600 font-bold p-4 hover:bg-red-50 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span>Back to Shop</span>
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">
        <div className="mb-10 flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Dealer Dashboard</h1>
                <p className="text-gray-500">Welcome back, Orion Electronics Ltd.</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">Orion</p>
                    <p className="text-xs text-gray-400">Premium Partner</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black border border-white/10 shadow-lg">
                    OE
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                        {s.icon}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                        <p className="text-xl font-black text-gray-900">{s.value}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-black text-gray-900">Recent Wholesale Orders</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Inventory Items</th>
                            <th className="px-6 py-4">Total Value</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Destination</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {recentOrders.map((o) => (
                            <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-blue-600">{o.id}</td>
                                <td className="px-6 py-4 text-gray-500">{o.date}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{o.items}</td>
                                <td className="px-6 py-4 font-black text-gray-900">{o.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                        o.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                                        o.status === 'Shipped' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                        'bg-blue-50 text-blue-600 border-blue-100'
                                    }`}>
                                        {o.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{o.dest}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
