import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true },     // link ảnh
  link: { type: String, default: '/' },        // click vào banner đi đâu
  active: { type: Boolean, default: true }    // bật/tắt
});

export default mongoose.model('Banner', bannerSchema);