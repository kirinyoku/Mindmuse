'use client';

import { useQueryPosts } from '@/lib/queries';
import Card from './card';
import { FC, useState, ChangeEvent } from 'react';

// ------------PostList------------

interface PostListProps {
  data: Post[];
  handleTagSearch: (tga: string) => void;
}

const PostList: FC<PostListProps> = ({ data, handleTagSearch }) => {
  return (
    <div className="mt-8 prompt_layout">
      {data.map((post) => (
        <Card key={post._id} post={post} handleTagSearch={handleTagSearch} />
      ))}
    </div>
  );
};

// ------------Feed------------

interface FeedProps {}

const Feed: FC<FeedProps> = ({}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchedResult, setSearchedResult] = useState<Post[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  const { data: posts, isSuccess, isLoading } = useQueryPosts();

  const filterPosts = (searchText: string) => {
    const regExp = new RegExp(searchText, 'i');
    if (!isLoading && isSuccess) {
      return posts.filter(
        (post) =>
          regExp.test(post?.author?.username as string) ||
          regExp.test(post.prompt) ||
          regExp.test(post.tags),
      );
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(event.target.value);
        if (searchResult) {
          setSearchedResult(searchResult);
        }
      }, 500),
    );
  };

  const handleTagSearch = (tag: string) => {
    setSearchText(tag);
    const searchResult = filterPosts(tag);
    if (searchResult) {
      setSearchedResult(searchResult);
    }
  };

  return (
    <section className="feed">
      <div className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </div>
      {searchText ? (
        searchedResult.length > 0 ? (
          <PostList data={searchedResult} handleTagSearch={handleTagSearch} />
        ) : (
          <p className="font-satoshi font-bold text-2xl text-slate-800 mt-4 capitalize">
            Prompt font found
          </p>
        )
      ) : (
        <>
          {!isLoading && isSuccess && <PostList data={posts} handleTagSearch={handleTagSearch} />}
        </>
      )}
    </section>
  );
};
export default Feed;
