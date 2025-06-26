import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Eye, Download } from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

const AnalyticsChart: React.FC = () => {
  const metrics: MetricCard[] = [
    {
      title: 'Monthly Revenue',
      value: '$8,245',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'New Members',
      value: '342',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Page Views',
      value: '12.4K',
      change: '-2.1%',
      trend: 'down',
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      title: 'Downloads',
      value: '1,234',
      change: '+23.5%',
      trend: 'up',
      icon: Download,
      color: 'text-orange-600'
    }
  ];

  const chartData = [
    { month: 'Jan', revenue: 4200, members: 120 },
    { month: 'Feb', revenue: 5100, members: 150 },
    { month: 'Mar', revenue: 4800, members: 180 },
    { month: 'Apr', revenue: 6200, members: 220 },
    { month: 'May', revenue: 7100, members: 280 },
    { month: 'Jun', revenue: 8245, members: 342 }
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Analytics Overview
        </h2>
        <p className="text-gray-600 mt-1">Track your performance and growth</p>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                  <Badge 
                    variant={metric.trend === 'up' ? 'default' : 'destructive'}
                    className={`gap-1 ${
                      metric.trend === 'up' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                        : 'bg-red-100 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <TrendIcon className="h-3 w-3" />
                    {metric.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Revenue Chart */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {chartData.map((data, index) => {
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-gray-600">
                    ${(data.revenue / 1000).toFixed(1)}k
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all duration-500 hover:from-purple-700 hover:to-blue-600 cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${data.month}: $${data.revenue}`}
                  />
                  <div className="text-sm font-medium text-gray-700">
                    {data.month}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Member Growth Chart */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Member Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-end justify-between gap-2 px-4">
            {chartData.map((data, index) => {
              const maxMembers = Math.max(...chartData.map(d => d.members));
              const height = (data.members / maxMembers) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-gray-600">{data.members}</div>
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t transition-all duration-500 hover:from-green-600 hover:to-emerald-500 cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${data.month}: ${data.members} members`}
                  />
                  <div className="text-xs text-gray-600">{data.month}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsChart;