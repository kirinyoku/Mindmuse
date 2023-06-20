'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQueryUsersPostsById } from '@/lib/queries';
import Profile from '@/components/profile';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: posts, isLoading, refetch } = useQueryUsersPostsById((session?.user as User)?.id);

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
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {!isLoading && (
        <Profile
          name="My"
          desc="Welcome to your personalized profile page"
          posts={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};
export default Page;
