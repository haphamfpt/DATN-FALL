import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  increaseViewCount,
} from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getBlogs);                   
router.get('/:slug', getBlogBySlug);         
router.put('/:slug/view', increaseViewCount); 

router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;