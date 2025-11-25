import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../../../utils/axiosInstance"; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Vui lòng điền đầy đủ Họ tên, Email và Tin nhắn");
      return;
    }

    setLoading(true);
    try {
      await api.post("/contacts", formData);
      toast.success("Gửi tin nhắn thành công!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Gửi thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <section className="contact-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-card">
                <h2 className="text-center mb-4">Liên hệ với chúng tôi</h2>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên *"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại (không bắt buộc)"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        name="message"
                        rows="6"
                        placeholder="Nội dung tin nhắn *"
                        className="form-control"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-dark btn-lg px-5"
                        disabled={loading}
                      >
                        {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;