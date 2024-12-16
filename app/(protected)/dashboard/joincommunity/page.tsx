"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Users, 
  PlusCircle, 
  Globe, 
  BookOpen, 
  Lightbulb, 
  Shield, 
  Filter 
} from "lucide-react";

// Community Interface
interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  tags: string[];
  coverImage?: string;
  avatarUrl?: string;
}

// Mock Communities Data
const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    description: 'Connecting tech enthusiasts and professionals worldwide',
    memberCount: 1245,
    category: 'Technology',
    tags: ['Coding', 'Innovation', 'Startups'],
    coverImage: '/community-covers/tech.jpg',
    avatarUrl: '/community-avatars/tech.png'
  },
  {
    id: '2',
    name: 'Green Future Collective',
    description: 'Building sustainable solutions for our planet',
    memberCount: 890,
    category: 'Environment',
    tags: ['Sustainability', 'Climate', 'Conservation'],
    coverImage: '/community-covers/green.jpg',
    avatarUrl: '/community-avatars/green.png'
  },
  {
    id: '3',
    name: 'Writers Guild',
    description: 'A sanctuary for storytellers and wordsmiths',
    memberCount: 567,
    category: 'Arts & Literature',
    tags: ['Writing', 'Creativity', 'Storytelling'],
    coverImage: '/community-covers/writing.jpg',
    avatarUrl: '/community-avatars/writers.png'
  },
  {
    id: '4',
    name: 'Global Entrepreneurs Network',
    description: 'Empowering business minds across continents',
    memberCount: 1500,
    category: 'Business',
    tags: ['Entrepreneurship', 'Networking', 'Startups'],
    coverImage: '/community-covers/entrepreneurs.jpg',
    avatarUrl: '/community-avatars/entrepreneurs.png'
  }
];

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Technology': <Lightbulb className="h-5 w-5" />,
  'Environment': <Globe className="h-5 w-5" />,
  'Arts & Literature': <BookOpen className="h-5 w-5" />,
  'Business': <Shield className="h-5 w-5" />
};

const ExploreCommunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCommunities = mockCommunities.filter(community => 
    (searchTerm === '' || 
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === null || community.category === selectedCategory)
  );

  const categories = Array.from(new Set(mockCommunities.map(c => c.category)));

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-3">
            <Users className="h-6 w-6" />
            <span>Explore Communities</span>
          </CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search communities..." 
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger 
              value="all" 
              onClick={() => setSelectedCategory(null)}
            >
              All Communities
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category.toLowerCase().replace(' ', '-')}
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-2"
              >
                {categoryIcons[category]}
                <span>{category}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredCommunities.map(community => (
              <div 
                key={community.id} 
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div 
                  className="h-24 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${community.coverImage})` }}
                >
                  <div className="absolute inset-0 bg-black/30" />
                  <Avatar className="absolute bottom-2 left-4 border-4 border-white">
                    <AvatarImage src={community.avatarUrl} alt={community.name} />
                    <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="p-4 pt-12">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{community.name}</h3>
                      <p className="text-sm text-muted-foreground">{community.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{community.memberCount} Members</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      {community.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary-start via-primary-mid to-primary-end hover:opacity-50 transition-opacity"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Join Community
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
        
        {filteredCommunities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No communities found matching your search
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExploreCommunities;