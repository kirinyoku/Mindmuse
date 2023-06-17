'use client';

import Profile from '@/components/profile';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FC, useState, useEffect } from 'react';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();

  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[] | null>(null);

  const handleEdit = () => {};

  const handleDelete = async () => {};

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
