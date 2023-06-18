import Post from '@/models/post';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface RouteProps {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  try {
    await db();
    const posts = await Post.findById(params.id).populate('author');
    if (!posts) {
      return NextResponse.error();
    } else {
      return NextResponse.json(posts);
    }
  } catch {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest, { params }: RouteProps) {
  const { prompt, tags } = await req.json();

  try {
    await db();
    const post = await Post.findById(params.id);
    if (!post) {
      return NextResponse.error();
    } else {
      post.prompt = prompt;
      post.tags = tags;

      await post.save();
      return NextResponse.json(post);
    }
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest, { params }: RouteProps) {
  try {
    await db();
    await Post.findByIdAndRemove(params.id);
    return NextResponse.json('Post deleted successfully.');
  } catch (error) {
    return NextResponse.error();
  }
}
