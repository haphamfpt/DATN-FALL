import { z } from "zod";

const VoucherSchemaValid = z.object({
  code: z
    .string({
      required_error: "Không được để trống !",
    })
    .min(3, "Tối thiểu 3 kí tự !"),
  discount: z.number({
    required_error: "Bắt buộc !",
    invalid_type_error: "Phải là số !",
  }),
  status: z.boolean().optional(),
});

export default VoucherSchemaValid;
