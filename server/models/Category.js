import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  product_category_name: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
  collection: 'product_category' 
});

const Category = mongoose.model('Category', categorySchema);

export default Category;