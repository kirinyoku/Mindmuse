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
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <Card key={post._id} post={post} />
      ))}
    </div>
  );
};

// ------------Feed------------

interface FeedProps {}

const Feed: FC<FeedProps> = ({}) => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/post');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={search}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>
      <PostList data={posts} handleClick={() => {}} />
    </section>
  );
};
export default Feed;
