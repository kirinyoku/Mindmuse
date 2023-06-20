import ky from 'ky';
import fetcher from '@/helpers/fetcher';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useQueryPostById = (postId: string) => {
  return useQuery<Post>({
    queryKey: ['post'],
    queryFn: () => fetcher(`/post/${postId}`),
  });
};

export const useQueryPosts = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetcher(`/post`),
  });
};

export const useQueryUsersPostsById = (userId: string | undefined) => {
  return useQuery<Post[]>({
    queryKey: ['users', userId, 'posts'],
    queryFn: () => fetcher(`/users/${userId}/posts`),
  });
};

interface NewPost {
  prompt: string;
  tags: string;
  author?: string;
}

export const useMutationNewPost = () => {
  return useMutation({
    mutationKey: ['post', 'new'],
    mutationFn: (post: NewPost) =>
      ky
        .post(`/api/post/new`, {
          json: {
            prompt: post.prompt,
            tags: post.tags,
            author: post.author,
          },
        })
        .json(),
  });
};

export const useMutationUpdatePost = (postId: string) => {
  return useMutation({
    mutationKey: ['post', postId, 'update'],
    mutationFn: (post: NewPost) =>
      ky
        .patch(`/api/post/${postId}`, {
          json: {
            prompt: post.prompt,
            tags: post.tags,
          },
        })
        .json(),
  });
};
