import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Users, Calendar, Clock, Bell } from 'lucide-react';

interface LiveStream {
  id: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: string;
  viewers: number;
  status: 'live' | 'scheduled' | 'ended';
  thumbnail: string;
  membershipRequired: boolean;
}

const LiveStreamCard: React.FC = () => {
  const streams: LiveStream[] = [
    {
      id: '1',
      title: 'Building Your First SaaS Application',
      description: 'Join me as we build a complete SaaS app from scratch using React and Node.js',
      scheduledAt: '2024-01-15T19:00:00Z',
      duration: '2 hours',
      viewers: 234,
      status: 'live',
      thumbnail: '/placeholder.svg',
      membershipRequired: false
    },
    {
      id: '2',
      title: 'Advanced React Patterns Workshop',
      description: 'Deep dive into advanced React patterns and best practices',
      scheduledAt: '2024-01-18T18:00:00Z',
      duration: '1.5 hours',
      viewers: 0,
      status: 'scheduled',
      thumbnail: '/placeholder.svg',
      membershipRequired: true
    }
  ];

  const getStatusBadge = (status: LiveStream['status']) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">📅 Scheduled</Badge>;
      case 'ended':
        return <Badge variant="outline">✅ Ended</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
          Live Streams
        </h2>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Set Reminder
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {streams.map((stream) => (
          <Card key={stream.id} className="group overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="relative">
              <img 
                src={stream.thumbnail} 
                alt={stream.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                {getStatusBadge(stream.status)}
              </div>
              {stream.membershipRequired && (
                <Badge className="absolute top-3 right-3 bg-purple-500 text-white">
                  Members Only
                </Badge>
              )}
              {stream.status === 'live' && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-red-500 fill-current" />
                  </div>
                </div>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {stream.title}
              </CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">
                {stream.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(stream.scheduledAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{stream.duration}</span>
                  </div>
                </div>
                {stream.status === 'live' && (
                  <div className="flex items-center gap-1 text-red-500">
                    <Users className="h-4 w-4" />
                    <span>{stream.viewers} watching</span>
                  </div>
                )}
              </div>
              
              <Button 
                className={`w-full gap-2 ${
                  stream.status === 'live' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                {stream.status === 'live' ? (
                  <>
                    <Play className="h-4 w-4" />
                    Join Live Stream
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4" />
                    Set Reminder
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveStreamCard;