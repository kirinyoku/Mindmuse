import Post from '@/models/post';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await db();
    const posts = await Post.find({}).populate('author');
    return NextResponse.json(posts);
  } catch {
    return NextResponse.error();
  }
}
