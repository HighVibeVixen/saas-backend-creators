import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Navigation from './Navigation';
import CreatorDashboard from './CreatorDashboard';
import ProductGrid from './ProductGrid';
import MembershipTiers from './MembershipTiers';
import LiveStreamCard from './LiveStreamCard';
import ReviewsSection from './ReviewsSection';
import AnalyticsChart from './AnalyticsChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AppLayout: React.FC = () => {
  const { sidebarOpen } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isMobile ? 'pt-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="streams">Streams</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <CreatorDashboard />
            </TabsContent>
            
            <TabsContent value="products" className="space-y-6">
              <ProductGrid />
            </TabsContent>
            
            <TabsContent value="membership" className="space-y-6">
              <MembershipTiers />
            </TabsContent>
            
            <TabsContent value="streams" className="space-y-6">
              <LiveStreamCard />
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <ReviewsSection />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsChart />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;