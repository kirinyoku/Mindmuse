'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryUsersPostsById } from '@/lib/queries';

import Profile from '@/components/profile';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');

  const { data: posts, isLoading } = useQueryUsersPostsById(params.id);

  return (
    <>
      {!isLoading && (
        <Profile
          name={userName as string}
          desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
          posts={posts}
        />
      )}
    </>
  );
};

export default Page;
