'use client';

import { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@/components/form';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: '',
    tags: '',
    author: {
      email: '',
      username: '',
      image: '',
    },
  });

  const createPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const reponse = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
          // @ts-expect-error
          author: session?.user?.id,
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
    <Form
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};
export default Page;
