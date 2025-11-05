import axiosClient from "./axiosClient";

import type { Category } from "../type/category";

export const getCategories = async (): Promise<{ status: string; total: number; data: Category[] }> => {
  const res = await axiosClient.get("/categories");
  return res.data;
};

export const getCategoryById = async (id: number): Promise<{ status: string; data: Category }> => {
  const res = await axiosClient.get(`/categories/${id}`);
  return res.data;
};

export const createCategory = (formData: FormData) =>
  axiosClient.post("/categories", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const updateCategory = (id: number, formData: FormData) =>
  axiosClient.post(`/categories/${id}?_method=PUT`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteCategory = async (id: number): Promise<{ status: string; message: string }> => {
  const res = await axiosClient.delete(`/categories/${id}`);
  return res.data;
};
