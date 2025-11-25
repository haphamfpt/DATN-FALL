import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { Trash, Envelope, EnvelopeOpen } from "react-bootstrap-icons";
import { format } from "date-fns";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contacts");
      setContacts(res.data || []);
    } catch {
      toast.error("Không thể tải tin nhắn liên hệ!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/contacts/${id}/read`);
      setContacts(contacts.map(c => c._id === id ? { ...c, isRead: true } : c));
    } catch {
      toast.error("Lỗi khi đánh dấu đã đọc");
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Xóa tin nhắn này vĩnh viễn?")) return;
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
      toast.success("Đã xóa tin nhắn");
    } catch {
      toast.error("Không thể xóa!");
    }
  };

  const openDetail = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    if (!contact.isRead) {
      markAsRead(contact._id);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-secondary small">
            Tổng: <strong>{contacts.length}</strong> tin nhắn
            {" • "}
            Chưa đọc: <strong>{contacts.filter(c => !c.isRead).length}</strong>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có tin nhắn nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th>Khách hàng</th>
                      <th>Email / SĐT</th>
                      <th>Nội dung</th>
                      <th>Ngày gửi</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr
                        key={contact._id}
                        className={!contact.isRead ? "fw-bold" : ""}
                        style={{ cursor: "pointer" }}
                        onClick={() => openDetail(contact)}
                      >
                        <td className="ps-4">{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>
                          <div>{contact.email}</div>
                          {contact.phone && (
                            <small className="text-muted">{contact.phone}</small>
                          )}
                        </td>
                        <td style={{ maxWidth: "300px" }}>
                          <div className="text-truncate">
                            {contact.message}
                          </div>
                        </td>
                        <td className="text-muted small">
                          {format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm")}
                        </td>
                        <td className="text-center">
                          {contact.isRead ? (
                            <span className="text-success">
                              <EnvelopeOpen size={18} />
                            </span>
                          ) : (
                            <span className="text-danger">
                              <Envelope size={18} />
                            </span>
                          )}
                        </td>
                        <td className="text-center" onClick={e => e.stopPropagation()}>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteContact(contact._id)}
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && selectedContact && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold">
                  Tin nhắn từ: {selectedContact.name}
                </h5>
                <button
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <strong>Email:</strong> {selectedContact.email}
                  </div>
                  <div className="col-md-6">
                    <strong>SĐT:</strong> {selectedContact.phone || "Không có"}
                  </div>
                  <div className="col-12">
                    <strong>Thời gian:</strong>{" "}
                    {format(new Date(selectedContact.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  </div>
                  <div className="col-12">
                    <strong>Nội dung tin nhắn:</strong>
                    <div className="border rounded p-3 mt-2 bg-light">
                      {selectedContact.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactManagement;