import Link from 'next/link';
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from 'react';

interface FormProps {
  type: string;
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

const Form: FC<FormProps> = ({ type, post, setPost, submitting, handleSubmit }) => {
  const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const words = value.split(' ');

    const taggedWords = words.map((word) => {
      if (!word.match(/^#/)) {
        return `#${word}`;
      }
      return word;
    });

    const updatedValue = taggedWords.join(' ');

    setPost({ ...post, tags: updatedValue });
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="capitalize head_text text-left">
        <span className="blue_gradient">{type} post</span>
      </h1>
      <p className="desc text-left max-w-md capitalize">
        {type} and share amazing prompts with the world, and let your imagination run wild with any
        AI-powered platfrom.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-slate-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-slate-700">Tags</span>
          <input
            value={post.tags}
            onChange={handleTagsChange}
            placeholder="#tags"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-slate-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-md text-slate-100 capitalize">
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Form;
