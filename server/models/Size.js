import mongoose from 'mongoose';

const sizeSchema = mongoose.Schema({
  attribute_size_name: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
  collection: 'attribute_size'
});

const Size = mongoose.model('Size', sizeSchema);
export default Size;