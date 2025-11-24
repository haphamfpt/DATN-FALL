import mongoose from 'mongoose';

const colorSchema = mongoose.Schema({
  attribute_color_code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  attribute_color_name: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
  collection: 'attribute_color'
});

const Color = mongoose.model('Color', colorSchema);
export default Color;