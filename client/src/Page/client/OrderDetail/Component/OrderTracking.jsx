const OrderTracking = ({ status }) => {
  const steps = [
    { key: "pending", label: "Chờ xác nhận", icon: "📦" },
    { key: "confirmed", label: "Đã xác nhận", icon: "✓" },
    { key: "shipped", label: "Đang giao", icon: "🚚" },
    { key: "delivered", label: "Đã giao", icon: "🏠" },
  ];

  if (status === "cancelled") {
    return (
      <div className="text-center py-4">
        <span className="fs-1">❌</span>
        <h5 className="mt-3 text-danger fw-bold">Đơn hàng đã bị hủy</h5>
      </div>
    );
  }

  if (status === "refund_pending" || status === "refunded") {
    return (
      <div className="text-center py-4">
        <span className="fs-1">💸</span>
        <h5 className="mt-3 text-warning fw-bold">
          {status === "refund_pending" ? "Đang xử lý hoàn tiền" : "Đã hoàn tiền"}
        </h5>
      </div>
    );
  }

  const currentIndex = steps.findIndex((step) => step.key === status);
  const completedIndex = currentIndex >= 0 ? currentIndex : -1;

  return (
    <div className="order-tracking py-4">
      <div className="d-flex justify-content-between align-items-center position-relative">
        {steps.map((step, index) => (
          <div
            key={step.key}
            className="text-center flex-fill position-relative"
            style={{ zIndex: 2 }}
          >
            <div
              className={`rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold fs-4
                ${index <= completedIndex ? "bg-danger text-white" : "bg-light text-muted border"}
              `}
              style={{
                width: "60px",
                height: "60px",
                border: index <= completedIndex ? "none" : "3px solid #dee2e6",
              }}
            >
              {step.icon}
            </div>
            <p
              className={`mt-3 mb-0 fw-medium ${
                index <= completedIndex ? "text-danger" : "text-muted"
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}

        <div
          className="position-absolute top-50 start-0 end-0 translate-middle-y"
          style={{
            height: "4px",
            background: "#dee2e6",
            zIndex: 1,
            left: "15%",
            right: "15%",
          }}
        >
          <div
            className="h-100 bg-danger"
            style={{
              width: `${completedIndex >= 0 ? (completedIndex / (steps.length - 1)) * 100 : 0}%`,
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>

      {completedIndex >= 0 && (
        <div className="text-center mt-4">
          <p className="text-muted mb-1">Trạng thái hiện tại</p>
          <h5 className="text-danger fw-bold">{steps[completedIndex].label}</h5>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;