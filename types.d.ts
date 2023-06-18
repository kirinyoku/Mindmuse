interface Post {
  _id?: string;
  prompt: string;
  tags: string;
  author?: User;
}

interface User {
  id?: string;
  email: string;
  username: string;
  image: string;
}
