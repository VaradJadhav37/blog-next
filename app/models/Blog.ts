import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 },
  category: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
