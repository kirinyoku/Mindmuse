import { db } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import Post from '@/models/post';

export async function POST(request: NextRequest) {
  const { prompt, tags, author } = await request.json();
  try {
    await db();
    const newPost = new Post({ prompt, tags, author });
    await newPost.save();

    return NextResponse.json(newPost);
  } catch {
    return NextResponse.error();
  }
}
