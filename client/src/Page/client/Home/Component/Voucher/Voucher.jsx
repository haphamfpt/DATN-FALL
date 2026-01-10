import React, { useEffect, useState } from "react";
import { Tag, Copy, Percent, DollarSign } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

const VoucherHome = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await fetch("/api/vouchers");
        const data = await res.json();

        const now = new Date();

        const availableVouchers = (data.data || data || [])
          .filter((v) => {
            const start = new Date(v.start_datetime);
            const end = new Date(v.end_datetime);
            return (
              v.is_active &&
              start <= now &&
              end >= now &&
              v.used_quantity < v.quantity
            );
          })
          .slice(0, 3); 

        setVouchers(availableVouchers);
      } catch (error) {
        console.error("Lỗi tải voucher:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Đã sao chép mã: ${code}`);
  };

  if (vouchers.length === 0) return null;

  return (
    <>
      <Toaster position="top-center" />

      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-danger d-flex align-items-center gap-2">
            <Tag /> Mã giảm giá nổi bật
          </h3>

          <Link to="/vouchers" className="text-decoration-none text-danger">
            Xem tất cả →
          </Link>
        </div>

        <div className="row g-4">
          {vouchers.map((voucher) => (
            <div key={voucher._id} className="col-md-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "14px",
                  border: "2px dashed #dc3545",
                }}
              >
                <div className="card-body text-center">
                  <h5 className="fw-bold text-danger mb-2">
                    {voucher.voucher_code}
                  </h5>

                  {voucher.voucher_type === "fixed" ? (
                    <p className="fw-bold text-success mb-2">
                      <DollarSign size={16} /> Giảm {formatPrice(voucher.voucher_value)}
                    </p>
                  ) : (
                    <p className="fw-bold text-success mb-2">
                      <Percent size={16} /> Giảm {voucher.voucher_value}%
                    </p>
                  )}

                  <button
                    className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 mx-auto"
                    onClick={() => handleCopy(voucher.voucher_code)}
                  >
                    <Copy size={16} />
                    Sao chép mã
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default VoucherHome;
