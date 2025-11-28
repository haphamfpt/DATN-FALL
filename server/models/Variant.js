import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    required: true,
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
    required: true,
  },

  sale_price:   { type: Number, required: true, min: 0 },
  import_price: { type: Number, default: 0 },
  stock:        { type: Number, required: true, min: 0, default: 0 },

  sku:          { type: String, unique: true, sparse: true }, 
  is_show:      { type: Boolean, default: true },
},
{
  timestamps: true,
});

variantSchema.index({ product: 1, color: 1, size: 1 }, { unique: true });

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;