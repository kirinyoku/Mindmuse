'use client';

import { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMutationNewPost } from '@/lib/queries';

import Form from '@/components/form';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: newPost, isLoading } = useMutationNewPost();

  const [post, setPost] = useState<Post>({ prompt: '', tags: '' });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const createPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    newPost(
      {
        prompt: post?.prompt,
        tags: post?.tags,
        author: (session?.user as User).id as string,
      },
      {
        onSuccess: () => router.push('/'),
        onError: (error) => console.log(error),
        onSettled: () => setSubmitting(false),
      },
    );
  };

  return (
    <>
      <Form
        type="create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      />
    </>
  );
};
export default Page;
