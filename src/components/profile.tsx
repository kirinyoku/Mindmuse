import { FC } from 'react';
import Card from './card';

interface ProfileProps {
  name: string;
  desc: string;
  posts: Post[] | undefined;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => Promise<void>;
}

const Profile: FC<ProfileProps> = ({ name, desc, posts, handleDelete, handleEdit }) => {
  return (
    <section className="w-full">
      <h2 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h2>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {posts &&
          posts.map((post) => (
            <Card
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
      </div>
    </section>
  );
};
export default Profile;
