import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Copy, Tag, Calendar, Users, Percent, DollarSign } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/vouchers", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Không thể tải danh sách mã giảm giá");
        }

        const data = await res.json();
        const allVouchers = data.data || data || [];

        const now = new Date();
        const availableVouchers = allVouchers.filter((voucher) => {
          const start = new Date(voucher.start_datetime);
          const end = new Date(voucher.end_datetime);

          return (
            voucher.is_active &&
            start <= now &&
            end >= now &&
            voucher.used_quantity < voucher.quantity
          );
        });

        setVouchers(availableVouchers);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Đã sao chép mã: ${code}`);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 fw-bold">Đang tải mã giảm giá...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger fw-bold">Lỗi tải dữ liệu</h3>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  if (vouchers.length === 0) {
    return (
      <div className="container py-5 text-center">
        <Tag size={80} className="text-muted mb-4" />
        <h3 className="fw-bold text-muted">Hiện tại chưa có mã giảm giá nào khả dụng</h3>
        <p className="text-muted">
          Hãy quay lại sau hoặc theo dõi fanpage để nhận mã mới nhé!
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-5" style={{ maxWidth: "1200px" }}>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-danger mb-3">
            <Tag className="me-3" size={48} />
            Mã Giảm Giá Đang Áp Dụng
          </h1>
          <p className="lead text-muted">
            Sao chép mã và sử dụng ngay khi thanh toán để nhận ưu đãi!
          </p>
        </div>

        <div className="row g-4">
          {vouchers.map((voucher) => (
            <div key={voucher._id} className="col-md-6 col-lg-4">
              <div
                className="card h-100 shadow-sm border-0 position-relative overflow-hidden"
                style={{
                  borderRadius: "16px",
                  border: "2px dashed #dc3545",
                }}
              >
                <div
                  className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 small fw-bold"
                  style={{
                    borderBottomLeftRadius: "8px",
                  }}
                >
                  ĐANG HOẠT ĐỘNG
                </div>

                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h3 className="fw-bold text-danger display-6">
                      {voucher.voucher_code}
                    </h3>
                    <button
                      onClick={() => handleCopyCode(voucher.voucher_code)}
                      className="btn btn-outline-danger btn-sm mt-2 d-flex align-items-center gap-2 mx-auto"
                    >
                      <Copy size={18} />
                      Sao chép mã
                    </button>
                  </div>

                  <div className="text-center mb-4">
                    {voucher.voucher_type === "fixed" ? (
                      <>
                        <DollarSign size={32} className="text-success" />
                        <h4 className="fw-bold text-success">
                          Giảm {formatPrice(voucher.voucher_value)}
                        </h4>
                      </>
                    ) : (
                      <>
                        <Percent size={32} className="text-success" />
                        <h4 className="fw-bold text-success">
                          Giảm {voucher.voucher_value}%
                          {voucher.max_price > 0 && (
                            <small className="d-block text-muted">
                              Tối đa {formatPrice(voucher.max_price)}
                            </small>
                          )}
                        </h4>
                      </>
                    )}
                  </div>

                  <hr />

                  <div className="small text-muted">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Calendar size={16} />
                      <span>
                        Áp dụng đến: <strong>{formatDate(voucher.end_datetime)}</strong>
                      </span>
                    </div>

                    {voucher.rank_price > 0 && (
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <DollarSign size={16} />
                        <span>
                          Đơn tối thiểu: <strong>{formatPrice(voucher.rank_price)}</strong>
                        </span>
                      </div>
                    )}

                    <div className="d-flex align-items-center gap-2">
                      <Users size={16} />
                      <span>
                        Còn lại: <strong>{voucher.quantity - voucher.used_quantity} lượt</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <p className="text-muted small">
            <em>Lưu ý: Một số mã chỉ áp dụng cho tài khoản cụ thể hoặc sản phẩm nhất định.</em>
          </p>
        </div>
      </div>
    </>
  );
};

export default Voucher;