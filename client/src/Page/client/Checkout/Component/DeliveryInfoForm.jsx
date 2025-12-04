import React from "react";
import { MapPin, Phone, User, Home, FileText } from "lucide-react";

export default function DeliveryInfoForm({ formData, onChange }) {
  return (
    <div className="bg-white rounded-3 shadow-sm p-4 p-md-5">
      <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <MapPin size={22} className="text-danger" />
        Thông tin nhận hàng
      </h4>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={onChange}
              required
            />
            <label htmlFor="fullName"><User size={18} className="me-2" />Họ và tên</label>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="0901234567"
              value={formData.phone}
              onChange={onChange}
              required
            />
            <label htmlFor="phone"><Phone size={18} className="me-2" />Số điện thoại</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Số 123, Đường ABC"
              value={formData.address}
              onChange={onChange}
              required
            />
            <label htmlFor="address"><Home size={18} className="me-2" />Địa chỉ chi tiết</label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-floating">
            <select className="form-select" required>
              <option value="">Chọn tỉnh/thành</option>
              <option>Hồ Chí Minh</option>
              <option>Hà Nội</option>
            </select>
            <label>Tỉnh/Thành phố</label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-floating">
            <select className="form-select" required>
              <option value="">Chọn quận/huyện</option>
            </select>
            <label>Quận/Huyện</label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-floating">
            <select className="form-select" required>
              <option value="">Chọn phường/xã</option>
            </select>
            <label>Phường/Xã</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-floating">
            <textarea
              className="form-control"
              id="note"
              name="note"
              placeholder="Ghi chú cho shipper..."
              style={{ height: "100px" }}
              value={formData.note}
              onChange={onChange}
            />
            <label htmlFor="note"><FileText size={18} className="me-2" />Ghi chú (không bắt buộc)</label>
          </div>
        </div>
      </div>
    </div>
  );
}