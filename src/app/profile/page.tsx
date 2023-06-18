'use client';

import Profile from '@/components/profile';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FC, useState, useEffect } from 'react';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();

  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[] | undefined>();

  const handleEdit = (post: Post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id}`, {
          method: 'DELETE',
        });
        const filtredPost = posts?.filter((p) => p._id !== post._id);
        setPosts(filtredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${(session?.user as User)?.id}/posts`);
      const data: Post[] = await response.json();

      setPosts(data);
    };

    if ((session?.user as User)?.id) fetchPosts();
  }, [(session?.user as User)?.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default Page;
