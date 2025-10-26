import axiosClient from "./axiosClient";

export const getCategories = () => axiosClient.get("/categories");
export const getProducts = () => axiosClient.get("/products");
export const getProductById = (id: number) =>
  axiosClient.get(`/products/${id}`);
