import Post from '@/models/post';
import { db } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

interface RouteProps {
  params: {
    id: string;
  };
}

export async function GET(requset: NextRequest, { params }: RouteProps) {
  try {
    await db();
    const posts = await Post.find({ author: params.id }).populate('author');
    return NextResponse.json(posts);
  } catch {
    return NextResponse.error();
  }
}
