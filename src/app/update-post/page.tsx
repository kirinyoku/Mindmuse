'use client';

import { useState } from 'react';
import { FC, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/form';
import { useMutationUpdatePost, useQueryPostById } from '@/lib/queries';

interface PageProps {}

const Page: FC<PageProps> = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: '', tags: '' });

  const { mutate: updatePost } = useMutationUpdatePost(postId as string);
  const { data, isSuccess, isLoading } = useQueryPostById(postId as string);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setPost({
        prompt: data.prompt,
        tags: data.tags,
      });
    }
  }, [postId]);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    if (!postId) {
      return alert('Post ID not found.');
    }

    updatePost(
      {
        prompt: post?.prompt,
        tags: post?.tags,
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
      {post && (
        <Form
          type="edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={handleUpdate}
        />
      )}
    </>
  );
};
export default Page;
