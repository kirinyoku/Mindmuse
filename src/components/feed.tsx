'use client';

import Card from './card';
import { FC, useState, useEffect, ChangeEvent } from 'react';

// ------------PostList------------

interface PostListProps {
  data: Post[];
  handleClick: () => void;
}

const PostList: FC<PostListProps> = ({ data, handleClick }) => {
  return (
    <div className="mt-8 prompt_layout">
      {data.map((post) => (
        <Card key={post._id} post={post} />
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

  const [posts, setPosts] = useState<Post[]>([]);

  const filterPosts = (searchText: string) => {
    const regExp = new RegExp(searchText, 'i');
    return posts.filter(
      (post) =>
        regExp.test(post?.author?.username as string) ||
        regExp.test(post.prompt) ||
        regExp.test(post.tags),
    );
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(event.target.value);
        setSearchedResult(searchResult);
      }, 500),
    );
  };

  const handleTagSearch = (tag: string) => {
    setSearchText(tag);
    const searchResult = filterPosts(tag);
    setSearchedResult(searchResult);
  };

  const fetchPosts = async () => {
    const response = await fetch('/api/post');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
          <PostList data={searchedResult} handleClick={() => {}} />
        ) : (
          <p className="font-satoshi font-bold text-2xl text-slate-800 mt-4 capitalize">
            Prompt font found
          </p>
        )
      ) : (
        <PostList data={posts} handleClick={() => {}} />
      )}
    </section>
  );
};
export default Feed;
