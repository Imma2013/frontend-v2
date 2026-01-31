// FILE: components/DashboardStats.tsx
import React, { useEffect, useState } from 'react';
import { ShoppingBag, DollarSign, Package, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: number;
  icon: React.ReactNode;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, prefix = '', suffix = '', change, icon, gradient }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const isPositive = change >= 0;

  // Animated counter effect
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500; // 1.5 seconds
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group ${gradient}`}>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      {/* Animated gradient orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
            {icon}
          </div>
          
          {/* Change indicator */}
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${
            isPositive ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white/80 text-sm font-medium mb-2">{title}</h3>

        {/* Value */}
        <div className="flex items-baseline space-x-1">
          <span className="text-4xl font-black text-white tracking-tight">
            {prefix}{displayValue.toLocaleString()}{suffix}
          </span>
        </div>

        {/* Hover effect line */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/40 rounded-full w-0 group-hover:w-full transition-all duration-700"></div>
        </div>
      </div>
    </div>
  );
};

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Active Orders"
        value={12}
        change={12}
        icon={<ShoppingBag className="w-6 h-6 text-white" />}
        gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
      />
      
      <StatCard
        title="Total Spend (Jan)"
        value={24500}
        prefix="$"
        change={8}
        icon={<DollarSign className="w-6 h-6 text-white" />}
        gradient="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700"
      />
      
      <StatCard
        title="Shipments Pending Customs"
        value={2}
        change={-15}
        icon={<Package className="w-6 h-6 text-white" />}
        gradient="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700"
      />
    </div>
  );
};

export default DashboardStats;
