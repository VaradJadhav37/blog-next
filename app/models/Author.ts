import mongoose, { Schema, models } from "mongoose";

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
  },
  bio: { type: String, default: "" },
});

const Author = models.Author || mongoose.model("Author", AuthorSchema);
export default Author;
