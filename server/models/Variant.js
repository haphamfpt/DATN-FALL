import mongoose from "mongoose";

const variantSchema = mongoose.Schema(
  {
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

    listed_price: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    import_price: { type: Number, required: true },

    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true },

    is_show: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

variantSchema.pre("save", async function (next) {
  if (!this.sku) {
    const Product = mongoose.model("Product");
    const Color = mongoose.model("Color");
    const Size = mongoose.model("Size");

    const product = await Product.findById(this.product);
    const color = await Color.findById(this.color);
    const size = await Size.findById(this.size);

    if (product && color && size) {
      const shortName = product.name
        .split(" ")
        .slice(0, 2)
        .join("-")
        .toUpperCase();
      this.sku = `${shortName}-${color.attribute_color_code.replace(
        "#",
        ""
      )}-${size.attribute_size_name.replace("Size ", "")}`;
    } else {
      throw new Error("Dữ liệu không đủ để tạo SKU");
    }
  }
  next();
});

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
