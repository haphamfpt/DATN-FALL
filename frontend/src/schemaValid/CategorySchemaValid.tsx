import { z } from "zod";
const CategorySchemaValid = z.object({
  name: z.string().min(3, "Tên danh mục tối thiểu 6 kí tự"),
  slug: z.string().optional(),
  status: z.boolean().optional(),
});

export default CategorySchemaValid;
