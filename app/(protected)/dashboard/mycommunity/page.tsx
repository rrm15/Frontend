import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Star } from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  avatarUrl: string;
  isAdmin: boolean;
  activityLevel: 'High' | 'Medium' | 'Low';
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    description: 'A community for technology enthusiasts and professionals',
    memberCount: 1245,
    avatarUrl: '/community-avatars/tech-innovators.png',
    isAdmin: false,
    activityLevel: 'High'
  }
];

const MyCommunities: React.FC = () => {
  const getActivityBadgeVariant = (level: Community['activityLevel']) => {
    switch(level) {
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
    }
  };

  return (
    <Card className="min-w-0 flex-1">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <CardTitle>My Communities</CardTitle>
          <Button variant="ghost" size="sm">
            <Star className="mr-2 h-4 w-4" /> Manage
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {mockCommunities.map((community) => (
          <div 
            key={community.id} 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b py-4 last:border-b-0 hover:bg-muted/50 transition-colors space-y-4 sm:space-y-0"
          >
            <div className="flex items-start space-x-4 flex-grow">
              <Avatar>
                <AvatarImage 
                  src={community.avatarUrl} 
                  alt={`${community.name} avatar`} 
                />
                <AvatarFallback>
                  {community.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <h3 className="font-semibold">{community.name}</h3>
                  {community.isAdmin && (
                    <Badge variant="outline" className="text-xs">Admin</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {community.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{community.memberCount}</span>
              </div>
              <Badge variant={getActivityBadgeVariant(community.activityLevel)}>
                {community.activityLevel} Activity
              </Badge>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" /> View
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MyCommunities;
