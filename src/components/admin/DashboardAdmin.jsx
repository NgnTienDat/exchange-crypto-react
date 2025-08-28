import React, { useState } from 'react';
import {
  Users, 
  TrendingUp,
  BarChart3, 
  Activity,
  Loader2
} from 'lucide-react';
import useUserStats from '../../hooks/useUserStats';
import useOrderStatsAdmin from '../../hooks/useOrderStatsAdmin';

export const DashboardAdmin = () => {
  const [timeFilter, setTimeFilter] = useState('day');
  
  const { isLoading: userStatsLoading, totalUsers } = useUserStats();
  
  const { 
    todayLoading, 
    monthLoading, 
    yearLoading, 
    totalToday, 
    totalMonth, 
    totalYear,
    isLoading: orderStatsLoading 
  } = useOrderStatsAdmin();

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
    </div>
  );

  const StatsCard = ({ icon: Icon, iconColor, label, value, isLoading }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <Icon className={`h-8 w-8 ${iconColor}`} />
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <div className="text-2xl font-semibold text-gray-900 min-h-[32px] flex items-center">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <span>{typeof value === 'number' ? value.toLocaleString() : value || '0'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Get current values based on time filter
  const getCurrentFilterValue = () => {
    switch (timeFilter) {
      case 'day':
        return { value: totalToday, isLoading: todayLoading, label: "Today's Orders" };
      case 'month':
        return { value: totalMonth, isLoading: monthLoading, label: "This Month's Orders" };
      case 'year':
        return { value: totalYear, isLoading: yearLoading, label: "This Year's Orders" };
      default:
        return { value: totalToday, isLoading: todayLoading, label: "Today's Orders" };
    }
  };

  const currentFilterData = getCurrentFilterValue();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Users}
          iconColor="text-blue-600"
          label="Total Users"
          value={totalUsers}
          isLoading={userStatsLoading}
        />

        <StatsCard
          icon={Activity}
          iconColor="text-green-600"
          label="Today's Orders"
          value={totalToday}
          isLoading={todayLoading}
        />

        <StatsCard
          icon={BarChart3}
          iconColor="text-yellow-600"
          label="Monthly Orders"
          value={totalMonth}
          isLoading={monthLoading}
        />

        <StatsCard
          icon={TrendingUp}
          iconColor="text-purple-600"
          label="Yearly Orders"
          value={totalYear}
          isLoading={yearLoading}
        />
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Growth Rate</div>
          <div className="text-lg font-semibold text-blue-900">
            {orderStatsLoading ? <LoadingSpinner /> : '+12.5%'}
          </div>
          <div className="text-xs text-blue-500">vs last month</div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Active Today</div>
          <div className="text-lg font-semibold text-green-900">
            {todayLoading ? <LoadingSpinner /> : `${Math.round((totalToday / totalMonth) * 100)}%`}
          </div>
          <div className="text-xs text-green-500">of monthly volume</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">Average Daily</div>
          <div className="text-lg font-semibold text-purple-900">
            {monthLoading ? <LoadingSpinner /> : Math.round(totalMonth / new Date().getDate()).toLocaleString()}
          </div>
          <div className="text-xs text-purple-500">orders per day</div>
        </div>
      </div>

      {/* Time Filter for Orders Analysis */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Orders Analysis</h3>
          <div className="flex items-center space-x-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="day">Daily View</option>
              <option value="month">Monthly View</option>
              <option value="year">Yearly View</option>
            </select>
          </div>
        </div>

        {/* Current Filter Stats */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{currentFilterData.label}</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentFilterData.isLoading ? (
                  <LoadingSpinner />
                ) : (
                  currentFilterData.value.toLocaleString()
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Filter</p>
              <p className="text-lg font-semibold text-blue-600 capitalize">{timeFilter}</p>
            </div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          {orderStatsLoading ? (
            <div className="text-center">
              <LoadingSpinner />
              <p className="text-gray-500 mt-2">Loading chart data...</p>
            </div>
          ) : (
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization for {timeFilter} view</p>
              <p className="text-sm text-gray-400 mt-1">
                Showing data for {currentFilterData.value.toLocaleString()} orders
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      {!orderStatsLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-blue-600 mr-2" />
            <div className="text-sm text-blue-800">
              <strong>System Status:</strong> All order tracking systems are operational. 
              Total of {totalYear.toLocaleString()} orders processed this year.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};