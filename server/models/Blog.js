import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      default: function () {
        return this.title
          ? this.title
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "d")
              .replace(/[^a-z0-9\s-]/g, "")
              .trim()
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
          : `untitled-${Date.now()}`;
      },
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "AVELINE Team",
      trim: true,
    },
    readTime: {
      type: Number,
      default: 5,
      min: 1,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
