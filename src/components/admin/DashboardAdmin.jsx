import React, { useState } from 'react';
import {
  Users,
  Search,
  Settings,
  TrendingUp,
  BarChart3,
  FileText,
  Lock,
  Unlock,
  Trash2,
  Eye,
  X,
  ChevronDown,
  Calendar,
  DollarSign,
  Activity,
  BookOpen,
  Filter
} from 'lucide-react';

export const DashboardAdmin = () => {
  const [timeFilter, setTimeFilter] = useState('day');
  const dashboardStats = {
    totalUsers: 12543,
    todayOrders: 1847,
    monthlyOrders: 45230,
    yearlyOrders: 892456
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.todayOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.monthlyOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Yearly Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.yearlyOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Filter for Orders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Orders Analysis</h3>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Daily</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
}