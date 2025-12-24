import { NextResponse } from 'next/server';

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  thumbnail_url?: string;
}

interface InstagramResponse {
  data: InstagramPost[];
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
  };
}

// Cache for Instagram posts (refresh every 30 minutes)
let cachedPosts: InstagramPost[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function GET() {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedPosts && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({ 
        success: true, 
        data: cachedPosts,
        cached: true 
      });
    }

    // Get Instagram credentials from environment variables
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      console.warn('Instagram credentials not configured. Using fallback.');
      return NextResponse.json({ 
        success: true, 
        data: [],
        message: 'Instagram not configured. Please set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in your environment variables.'
      });
    }

    // Fetch posts from Instagram Graph API
    // Using Graph API v18+ endpoint
    const fields = 'id,media_type,media_url,permalink,caption,timestamp,thumbnail_url';
    const limit = 12; // Number of posts to fetch
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

    const response = await fetch(url, {
      next: { revalidate: 1800 } // Revalidate every 30 minutes
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Instagram API error:', errorData);
      
      // Return cached data if available, even if expired
      if (cachedPosts) {
        return NextResponse.json({ 
          success: true, 
          data: cachedPosts,
          cached: true,
          warning: 'Using cached data due to API error'
        });
      }

      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch Instagram posts',
          details: errorData
        },
        { status: response.status }
      );
    }

    const data: InstagramResponse = await response.json();
    
    // Transform and cache the posts
    const posts = data.data.map((post) => ({
      id: post.id,
      media_type: post.media_type,
      media_url: post.media_url,
      permalink: post.permalink,
      caption: post.caption || '',
      timestamp: post.timestamp,
      thumbnail_url: post.thumbnail_url || post.media_url,
    }));

    // Update cache
    cachedPosts = posts;
    cacheTimestamp = now;

    return NextResponse.json({ 
      success: true, 
      data: posts,
      cached: false
    });

  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    
    // Return cached data if available
    if (cachedPosts) {
      return NextResponse.json({ 
        success: true, 
        data: cachedPosts,
        cached: true,
        warning: 'Using cached data due to error'
      });
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

