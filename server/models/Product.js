import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  brand: { type: String, trim: true },
  description: { type: String, required: true },
  short_description: { type: String },
  
  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    is_main: { type: Boolean, default: false }
  }],

  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  total_sold: { type: Number, default: 0 },

  is_active: { type: Boolean, default: true },
  is_featured: { type: Boolean, default: false },
  tags: [String],

  has_variants: { type: Boolean, default: false },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    let slug = this.name
      .toLowerCase()
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    this.slug = slug;
  }
  next();
});

productSchema.virtual('variants', {
  ref: 'Variant',
  localField: '_id',
  foreignField: 'product',
});

const Product = mongoose.model('Product', productSchema);
export default Product;