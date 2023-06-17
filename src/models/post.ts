import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  prompt: {
    type: String,
    require: [true, 'Prompt is required.'],
  },
  tags: {
    type: String,
    require: [true, 'Tags is required.'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Post = models.Post || model('Post', PostSchema);

export default Post;
