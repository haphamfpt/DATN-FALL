import React, { useState, useEffect } from "react";
import { MapPin, Phone, User, Home, FileText } from "lucide-react";

export default function DeliveryInfoForm({ formData, onChange }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=2")
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((err) => console.error("Error loading provinces:", err));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find(
        (p) => p.code === parseInt(selectedProvince)
      );
      if (province && province.districts) {
        setDistricts(province.districts);
        setWards([]);
        setSelectedDistrict("");
      }
    } else {
      setDistricts([]);
      setWards([]);
      setSelectedDistrict("");
    }
  }, [selectedProvince, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => {
          setWards(data.wards || []);
        })
        .catch((err) => console.error("Error loading wards:", err));
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    onChange({ target: { name: "provinceCode", value: e.target.value } });
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    onChange({ target: { name: "districtCode", value: e.target.value } });
  };

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
              value={formData.fullName || ""}
              onChange={onChange}
              required
            />
            <label htmlFor="fullName">
              <User size={18} className="me-2" />
              Họ và tên
            </label>
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
              value={formData.phone || ""}
              onChange={onChange}
              required
            />
            <label htmlFor="phone">
              <Phone size={18} className="me-2" />
              Số điện thoại
            </label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-floating">
            <select
              className="form-select"
              id="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              required
            >
              <option value="">Chọn tỉnh/thành</option>
              {provinces.map((prov) => (
                <option key={prov.code} value={prov.code}>
                  {prov.name}
                </option>
              ))}
            </select>
            <label htmlFor="province">Tỉnh/Thành phố</label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-floating">
            <select
              className="form-select"
              id="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
              required
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((dist) => (
                <option key={dist.code} value={dist.code}>
                  {dist.name}
                </option>
              ))}
            </select>
            <label htmlFor="district">Quận/Huyện</label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-floating">
            <select
              className="form-select"
              id="ward"
              disabled={!selectedDistrict}
              required
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
            <label htmlFor="ward">Phường/Xã</label>
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
              value={formData.address || ""}
              onChange={onChange}
              required
            />
            <label htmlFor="address">
              <Home size={18} className="me-2" />
              Địa chỉ chi tiết
            </label>
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
              value={formData.note || ""}
              onChange={onChange}
            />
            <label htmlFor="note">
              <FileText size={18} className="me-2" />
              Ghi chú (không bắt buộc)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
