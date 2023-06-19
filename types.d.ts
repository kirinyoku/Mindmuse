interface Post {
  _id?: string;
  prompt: string;
  tags: string;
  author?: {
    _id?: string;
    email: string;
    username: string;
    image: string;
  };
}

interface User {
  id?: string;
  email: string;
  username: string;
  image: string;
}
