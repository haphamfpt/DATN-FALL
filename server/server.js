import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import voucherRoutes from "./routes/voucherRoutes.js";
import bannerRoutes from "./routes/banner.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import auth from "./routes/auth.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import UserAdminRoutes from "./routes/UserAdminRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsBase = path.join(__dirname, "uploads");
const productUploadDir = path.join(uploadsBase, "products");
const bannerUploadDir = path.join(uploadsBase, "banners");   
const blogUploadDir = path.join(uploadsBase, "blogs");    

[uploadsBase, productUploadDir, bannerUploadDir, blogUploadDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use(cors());                    
app.use(express.json());          
app.use(express.urlencoded({ extended: true })); 

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", auth);
app.use("/api/admin",UserAdminRoutes)
app.use("/api/admin/orders", adminOrderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

