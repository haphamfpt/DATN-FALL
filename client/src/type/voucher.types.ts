export interface Voucher {
  _id: string;
  voucher_code: string;
  voucher_value: number;
  voucher_type: "fixed" | "percent";
  max_price?: number;
  rank_price: number;
  start_datetime: string;
  end_datetime: string;
  quantity: number;
  used_quantity: number;
  for_user_ids?: string[];
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}