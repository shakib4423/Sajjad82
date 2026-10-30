export type GameCategory =
  | '1v1 Clash'
  | 'Parkour / Only Up'
  | 'Zombie Survival'
  | 'Hide & Seek'
  | 'Unlimited Gloo'
  | 'Sniper Arena'
  | 'Custom Minigame';

export type ServerRegion = 'BD' | 'IND' | 'ID' | 'PK' | 'BR' | 'EU' | 'GLOBAL' | 'OTHER';

export interface ServerCode {
  id: string;
  serverName: string;
  serverCode: ServerRegion;
  flag: string;
  code: string;
  notes?: string;
}

export interface MapComment {
  id: string;
  author: string;
  avatarSeed: string;
  rating: number;
  text: string;
  createdAt: string;
  server?: string;
}

export interface CraftlandMap {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: GameCategory;
  imageUrl: string;
  creator: string;
  createdAt: string;
  likes: number;
  views: number;
  copies: number;
  featured?: boolean;
  maxPlayers: string;
  recommendedWeapon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  tags: string[];
  serverCodes: ServerCode[];
  features: string[];
  rules?: string[];
  comments?: MapComment[];
}

export type SortFilter = 'Latest' | 'Most Liked' | 'Oldest';
