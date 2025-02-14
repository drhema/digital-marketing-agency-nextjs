export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/content/blog';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const locale = searchParams.get('locale') || 'en';

  const posts = await getBlogPosts(locale as 'en' | 'ar', page);
  
  return NextResponse.json(posts);
}