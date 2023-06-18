'use client';

import { FC, FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/form';

interface PageProps {}

const Page: FC<PageProps> = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    const getPostById = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const post: Post = await response.json();
      setPost({
        prompt: post.prompt,
        tags: post.tags,
      });
    };

    if (postId) {
      getPostById();
    }
  }, [postId]);

  const updatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    if (!postId) {
      return alert('Post ID not found.');
    }

    try {
      const reponse = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post?.prompt,
          tags: post?.tags,
        }),
      });

      if (reponse.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {post && (
        <Form
          type="edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePost}
        />
      )}
    </>
  );
};
export default Page;
