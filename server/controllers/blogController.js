import asyncHandler from "express-async-handler";
import Blog from "../models/Blog.js";

export const getBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = { isPublished: true };

  const total = await Blog.countDocuments(query);
  const blogs = await Blog.find(query)
    .select(
      "title content views isPublished slug excerpt coverImage readTime createdAt tags author"
    )
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    blogs,
    pagination: {
      current: page,
      pages: Math.ceil(total / limit),
      total,
    },
  });
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });

  if (!blog) {
    res.status(404);
    throw new Error("Bài viết không tồn tại hoặc đã bị gỡ");
  }

  res.json(blog);
});

export const increaseViewCount = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true }
  );

  if (!blog) {
    res.status(404);
    throw new Error("Bài viết không tồn tại");
  }

  res.json({ views: blog.views });
});

export const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    excerpt,
    content,
    coverImage,
    author,
    readTime,
    tags,
    isPublished,
    slug,
  } = req.body;

  if (!title || !excerpt || !content || !coverImage) {
    res.status(400);
    throw new Error(
      "Vui lòng điền đầy đủ tiêu đề, tóm tắt, nội dung và ảnh bìa"
    );
  }

  if (slug) {
    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
      res.status(400);
      throw new Error("Slug đã tồn tại, vui lòng chọn tên khác");
    }
  }

  const blog = await Blog.create({
    title,
    slug,
    excerpt,
    content,
    coverImage,
    author: author || "AVELINE Team",
    readTime: readTime || 5,
    tags: tags || [],
    isPublished: isPublished ?? true,
  });

  res.status(201).json(blog);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Bài viết không tồn tại");
  }

  if (req.body.slug && req.body.slug !== blog.slug) {
    const slugExists = await Blog.findOne({ slug: req.body.slug });
    if (slugExists) {
      res.status(400);
      throw new Error("Slug đã được sử dụng");
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(updatedBlog);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Bài viết không tồn tại");
  }

  await blog.deleteOne();
  res.json({ message: "Đã xóa bài viết thành công" });
});
