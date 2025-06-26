import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

const MembershipTiers: React.FC = () => {
  const tiers: MembershipTier[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: ['Access to free content', 'Community access', 'Basic support'],
      popular: false,
      icon: Star,
      color: 'text-gray-600',
      gradient: 'from-gray-100 to-gray-200'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      description: 'For serious learners',
      features: ['All free features', 'Premium content', 'Live sessions', 'Priority support', 'Downloadable resources'],
      popular: true,
      icon: Zap,
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-blue-600'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 99,
      period: 'month',
      description: 'Ultimate creator experience',
      features: ['All Pro features', '1-on-1 mentoring', 'Exclusive workshops', 'Early access', 'Custom projects'],
      popular: false,
      icon: Crown,
      color: 'text-yellow-600',
      gradient: 'from-yellow-400 to-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Membership
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of creators and unlock exclusive content, resources, and community access.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <Card 
              key={tier.id} 
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                tier.popular 
                  ? 'border-purple-500 shadow-lg scale-105 bg-white' 
                  : 'border-gray-200 bg-white/90 backdrop-blur-sm hover:border-purple-300'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className={`bg-gradient-to-r ${tier.gradient} text-white text-center py-2 text-sm font-semibold`}>
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className={`text-center ${tier.popular ? 'pt-12' : 'pt-6'}`}>
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${tier.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    {tier.price > 0 && <span className="text-gray-500">/{tier.period}</span>}
                  </div>
                  <p className="text-gray-600">{tier.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${tier.popular 
                    ? `bg-gradient-to-r ${tier.gradient} hover:shadow-lg` 
                    : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  {tier.price === 0 ? 'Get Started' : 'Subscribe Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>All plans include 30-day money-back guarantee</p>
        <p>Cancel anytime • No hidden fees • Secure payment</p>
      </div>
    </div>
  );
};

export default MembershipTiers;