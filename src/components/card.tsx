'use client';

import Image from 'next/image';
import { FC, MouseEventHandler, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

interface CardProps {
  post: Post;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => Promise<void>;
  handleTagSearch: (tga: string) => void;
}

const Card: FC<CardProps> = ({ post, handleEdit, handleDelete, handleTagSearch }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();

  const [copiedPrompt, setCopiedPrompt] = useState('');

  const handleCopy = () => {
    setCopiedPrompt(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopiedPrompt('');
    }, 3000);
  };

  return (
    <div className="post_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.author?.image as string}
            alt="user profile picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h2 className="font-satoshi font-semibold text-slate-700">{post?.author?.username}</h2>
            <p className="font-inter text-sm text-slate-500">{post?.author?.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copiedPrompt === post.prompt ? '/tick.svg' : '/copy.svg'}
            alt="copy"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-slate-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagSearch && handleTagSearch(post.tags)}>
        {post.tags}
      </p>
      {/* @ts-expect-error*/}
      {(session?.user as User)?.id === post?.author?._id && pathName === '/profile' && (
        <div className="mt-5 flex-end gap-4 border-t border-slate-100">
          <button
            className="font-inter text-base green_gradient cursor_pointer"
            onClick={handleEdit as MouseEventHandler<HTMLButtonElement> | undefined}>
            Edit
          </button>
          <button
            className="font-inter text-base orange_gradient cursor_pointer"
            onClick={handleDelete as MouseEventHandler<HTMLButtonElement> | undefined}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default Card;
