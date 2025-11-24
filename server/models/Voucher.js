import mongoose from 'mongoose';

const voucherSchema = mongoose.Schema({
  voucher_code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  voucher_value: {
    type: Number,
    required: true,
    min: 0,
  },
  voucher_type: {
    type: String,
    enum: ['fixed', 'percent'],
    required: true,
  },
  max_price: {
    type: Number,
    default: 0, 
  },
  rank_price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  start_datetime: {
    type: Date,
    required: true,
  },
  end_datetime: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  used_quantity: {
    type: Number,
    default: 0,
  },
  for_user_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
}, { 
  timestamps: true,
  collection: 'vouchers'
});

const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;