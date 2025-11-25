import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

bannerSchema.index({ active: 1 });

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
