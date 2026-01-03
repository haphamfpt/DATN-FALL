import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { EyeFill, ShieldFill, PersonFill } from "react-bootstrap-icons";
import { format } from "date-fns";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUserId = localStorage.getItem("userId") || null;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      toast.error("Không thể tải danh sách người dùng!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openDetailModal = async (userId) => {
    try {
      const res = await api.get(`/admin/users/${userId}`);
      setSelectedUser(res.data);
      setShowDetailModal(true);
    } catch (err) {
      toast.error("Không thể tải thông tin chi tiết!");
    }
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => user._id !== currentUserId);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0 fw-bold">Quản lý người dùng</h3>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                {users.length === 1 && users[0]._id === currentUserId
                  ? "Chỉ có tài khoản của bạn"
                  : "Chưa có người dùng nào"}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th>Avatar</th>
                      <th>Họ tên</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Ngày tạo</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td className="ps-4 fw-bold">{index + 1}</td>
                        <td>
                          <img
                            src={user.avatar || "https://via.placeholder.com/40"}
                            alt="avatar"
                            className="rounded-circle"
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
                            onError={(e) => (e.target.src = "https://via.placeholder.com/40")}
                          />
                        </td>
                        <td className="fw-bold">{user.name || "(Chưa đặt tên)"}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                            {user.role === "admin" ? (
                              <>
                                <ShieldFill className="me-1" size={12} />
                                Admin
                              </>
                            ) : (
                              <>
                                <PersonFill className="me-1" size={12} />
                                User
                              </>
                            )}
                          </span>
                        </td>
                        <td className="small">
                          {format(new Date(user.createdAt), "dd/MM/yyyy HH:mm")}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => openDetailModal(user._id)}
                          >
                            <EyeFill size={14} />
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

      {showDetailModal && selectedUser && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && closeDetailModal()}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Chi tiết người dùng</h5>
                <button className="btn-close" onClick={closeDetailModal}></button>
              </div>

              <div className="modal-body text-center py-4">
                <img
                  src={selectedUser.avatar || "https://via.placeholder.com/100"}
                  alt="avatar"
                  className="rounded-circle mb-3"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
                />
                <h5 className="fw-bold">{selectedUser.name || "(Chưa đặt tên)"}</h5>
                <p className="text-muted">{selectedUser.email}</p>

                <div className="mt-4 text-start">
                  <div className="row g-3">
                    <div className="col-12">
                      <strong>Email:</strong> {selectedUser.email}
                    </div>
                    <div className="col-12">
                      <strong>Họ tên:</strong> {selectedUser.name || <em>Chưa cập nhật</em>}
                    </div>
                    <div className="col-12">
                      <strong>Vai trò:</strong>
                      <span className={`badge ms-2 ${selectedUser.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                        {selectedUser.role === "admin" ? "Admin" : "User"}
                      </span>
                    </div>
                    <div className="col-12">
                      <strong>Ngày tạo tài khoản:</strong>
                      <br />
                      {format(new Date(selectedUser.createdAt), "dd/MM/yyyy HH:mm:ss")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={closeDetailModal}>
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

export default UserManagement;