// TribeNexus Community & Social Hub Types

export interface CommunitySpace {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  badgeCount: number;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt: string;
  likesCount: number;
}

export interface CommunityPost {
  id: string;
  spaceSlug: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  title: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  tags: string[];
  likesCount: number;
  commentsCount: number;
  comments: CommunityComment[];
  createdAt: string;
  isPinned?: boolean;
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  level: number;
  badge: string;
  points: number;
  bio: string;
}
