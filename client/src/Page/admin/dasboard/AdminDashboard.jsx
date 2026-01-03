import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { format } from "date-fns";
import {
    GraphUp,
    Cart3,
    People,
    Box,
    CurrencyDollar,
    Tag
} from "react-bootstrap-icons";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await api.get("/admin/stats");
            setStats(res.data);
        } catch (err) {
            toast.error("Không thể tải thống kê!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const formatCurrency = (value) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <>
            <Toaster position="top-center" />
            <div className="container py-4">
                <h3 className="mb-4 fw-bold">Thống kê tổng quan</h3>

                {/* Overview Cards */}
                <div className="row g-4 mb-5">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center">
                                <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                                    <CurrencyDollar size={30} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-muted small mb-1">Tổng doanh thu</p>
                                    <h4 className="fw-bold mb-0">{formatCurrency(stats.overview.totalRevenue)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center">
                                <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                                    <GraphUp size={30} className="text-success" />
                                </div>
                                <div>
                                    <p className="text-muted small mb-1">Doanh thu hôm nay</p>
                                    <h4 className="fw-bold mb-0">{formatCurrency(stats.overview.revenueToday)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center">
                                <div className="bg-info bg-opacity-10 p-3 rounded me-3">
                                    <Cart3 size={30} className="text-info" />
                                </div>
                                <div>
                                    <p className="text-muted small mb-1">Đơn đã giao</p>
                                    <h4 className="fw-bold mb-0">{stats.overview.deliveredOrders}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center">
                                <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                                    <People size={30} className="text-warning" />
                                </div>
                                <div>
                                    <p className="text-muted small mb-1">Người dùng mới (tháng)</p>
                                    <h4 className="fw-bold mb-0">{stats.overview.newUsersThisMonth}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts & Tables */}
                <div className="row g-4">
                    {/* Doanh thu theo tháng */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white">
                                <h5 className="mb-0 fw-bold">Doanh thu theo tháng năm {new Date().getFullYear()}</h5>
                            </div>
                            <div className="card-body">
                                <canvas id="revenueChart" height="100"></canvas>
                            </div>
                        </div>
                    </div>

                    {/* Top sản phẩm */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white">
                                <h5 className="mb-0 fw-bold">Sản phẩm bán chạy</h5>
                            </div>
                            <div className="card-body p-0">
                                <div className="list-group list-group-flush">
                                    {stats.topProducts.length === 0 ? (
                                        <div className="p-3 text-center text-muted">Chưa có dữ liệu</div>
                                    ) : (
                                        stats.topProducts.map((p, i) => (
                                            <div key={i} className="list-group-item d-flex align-items-center py-3">
                                                <span className="fw-bold text-muted me-3">#{i + 1}</span>
                                                <img
                                                    src={p.image || "https://via.placeholder.com/50"}
                                                    alt={p.name}
                                                    width={50}
                                                    height={50}
                                                    className="rounded me-3"
                                                    style={{ objectFit: "cover" }}
                                                />
                                                <div className="flex-grow-1">
                                                    <div className="fw-semibold small">{p.name}</div>
                                                    <small className="text-muted">{p.totalSold} đã bán • {formatCurrency(p.revenue)}</small>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Danh mục & Voucher */}
                <div className="row g-4 mt-3">
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white">
                                <h5 className="mb-0 fw-bold">Danh mục bán tốt</h5>
                            </div>
                            <div className="card-body">
                                {stats.topCategories.map((cat, i) => (
                                    <div key={cat._id} className="d-flex justify-content-between mb-2">
                                        <span>{i + 1}. {cat.categoryName}</span>
                                        <strong>{formatCurrency(cat.revenue)}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white">
                                <h5 className="mb-0 fw-bold">Voucher được dùng nhiều</h5>
                            </div>
                            <div className="card-body">
                                {stats.topVouchers.length === 0 ? (
                                    <p className="text-muted">Chưa có voucher nào được sử dụng</p>
                                ) : (
                                    stats.topVouchers.map((v) => (
                                        <div key={v._id} className="d-flex justify-content-between mb-2">
                                            <span className="fw-semibold">{v._id}</span>
                                            <span>{v.timesUsed} lần • Giảm {formatCurrency(v.totalDiscount)}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script>
                {stats && `
          const ctx = document.getElementById('revenueChart').getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Th1','Th2','Th3','Th4','Th5','Th6','Th7','Th8','Th9','Th10','Th11','Th12'],
              datasets: [{
                label: 'Doanh thu (VND)',
                data: ${JSON.stringify(stats.monthlyRevenue)},
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, ticks: { callback: value => '₫' + new Intl.NumberFormat('vi-VN').format(value) } }
              }
            }
          });
        `}
            </script>
        </>
    );
};

export default AdminDashboard;