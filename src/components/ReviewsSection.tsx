import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
  verified: boolean;
  helpful: number;
}

const ReviewsSection: React.FC = () => {
  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      customerAvatar: '/placeholder.svg',
      rating: 5,
      comment: 'Absolutely amazing course! The content is well-structured and easy to follow. I learned so much and was able to build my first app within a week.',
      productName: 'Complete React Mastery Course',
      date: '2024-01-10',
      verified: true,
      helpful: 12
    },
    {
      id: '2',
      customerName: 'Mike Chen',
      customerAvatar: '/placeholder.svg',
      rating: 4,
      comment: 'Great templates pack! Saved me hours of design work. The quality is top-notch and the variety is impressive.',
      productName: 'UI/UX Design Templates Pack',
      date: '2024-01-08',
      verified: true,
      helpful: 8
    },
    {
      id: '3',
      customerName: 'Emily Rodriguez',
      customerAvatar: '/placeholder.svg',
      rating: 5,
      comment: 'This ebook is a game-changer! Clear explanations, practical examples, and excellent code samples. Highly recommended for beginners.',
      productName: 'JavaScript Fundamentals Ebook',
      date: '2024-01-05',
      verified: true,
      helpful: 15
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Customer Reviews
          </h2>
          <p className="text-gray-600 mt-1">What our customers are saying</p>
        </div>
        <Button variant="outline" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Write Review
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.customerAvatar} alt={review.customerName} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    {review.customerName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm truncate">{review.customerName}</h4>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                  </div>
                  <p className="text-xs text-purple-600 font-medium truncate">
                    {review.productName}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700 mb-4 line-clamp-4">
                {review.comment}
              </p>
              
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-purple-600">
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.helpful})
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline" className="gap-2">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;