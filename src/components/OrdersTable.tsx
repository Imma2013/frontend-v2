// FILE: components/OrdersTable.tsx
import React, { useState } from 'react';
import { Download, Search, ChevronDown, ChevronUp, Package, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  items: string;
  quantity: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  destination: string;
}

const mockOrders: Order[] = [
  { id: '#2931', date: 'Jan 19, 2026', items: 'iPhone 14 Pro Max (x15)', quantity: 15, total: 14250, status: 'Processing', destination: 'Dubai, UAE' },
  { id: '#2932', date: 'Jan 18, 2026', items: 'iPhone 14 Pro Max (x15)', quantity: 15, total: 14250, status: 'Shipped', destination: 'Dubai, UAE' },
  { id: '#2933', date: 'Jan 17, 2026', items: 'iPhone 14 Pro Max (x15)', quantity: 15, total: 14250, status: 'Delivered', destination: 'Dubai, UAE' },
  { id: '#2934', date: 'Jan 16, 2026', items: 'iPhone 14 Pro Max (x15)', quantity: 15, total: 14250, status: 'Delivered', destination: 'Dubai, UAE' },
  { id: '#2935', date: 'Jan 15, 2026', items: 'iPhone 14 Pro Max (x15)', quantity: 15, total: 14250, status: 'Delivered', destination: 'Dubai, UAE' },
];

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const styles = {
    Processing: 'bg-blue-100 text-blue-700 border-blue-200',
    Shipped: 'bg-purple-100 text-purple-700 border-purple-200',
    Delivered: 'bg-green-100 text-green-700 border-green-200',
    Cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  const icons = {
    Processing: <Clock className="w-3 h-3" />,
    Shipped: <Package className="w-3 h-3" />,
    Delivered: <CheckCircle className="w-3 h-3" />,
    Cancelled: <XCircle className="w-3 h-3" />,
  };

  return (
    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
      {icons[status]}
      <span>{status}</span>
    </span>
  );
};

export const OrdersTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredOrders = mockOrders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const exportToCSV = () => {
    const headers = ['Order ID', 'Date', 'Items', 'Quantity', 'Total', 'Status', 'Destination'];
    const rows = sortedOrders.map(order => [
      order.id,
      order.date,
      order.items,
      order.quantity,
      order.total,
      order.status,
      order.destination
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Export Button */}
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('id')}
                    className="flex items-center space-x-1 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                  >
                    <span>Order ID</span>
                    {sortField === 'id' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-1 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                  >
                    <span>Date</span>
                    {sortField === 'date' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('total')}
                    className="flex items-center space-x-1 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                  >
                    <span>Total</span>
                    {sortField === 'total' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Destination</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-blue-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{order.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{order.items}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">${order.total.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{order.destination}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No orders found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Showing {sortedOrders.length} of {mockOrders.length} orders</span>
        <span>Total Value: ${sortedOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OrdersTable;
