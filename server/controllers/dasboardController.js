import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

export const getAdminStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisYearStart = new Date(today.getFullYear(), 0, 1);

    const completedStatuses = ["complete"]; 

    const totalRevenueAgg = await Order.aggregate([
      { $match: { orderStatus: { $in: completedStatuses }, paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const revenueTodayAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: { $in: completedStatuses },
          paymentStatus: "paid",
          createdAt: { $gte: today },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const revenueThisMonthAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: { $in: completedStatuses },
          paymentStatus: "paid",
          createdAt: { $gte: thisMonthStart },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const orderStatusStats = await Order.aggregate([
      { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
    ]);

    const statusMap = {
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      complete: 0,          
      cancelled: 0,
      refund_pending: 0,
      refunded: 0,
    };
    orderStatusStats.forEach((s) => {
      statusMap[s._id] = s.count || 0;
    });

    const totalUsers = await User.countDocuments();
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: thisMonthStart },
    });

    const topProducts = await Order.aggregate([
      { $match: { orderStatus: { $in: completedStatuses } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          name: { $first: "$items.name" },
          image: { $first: "$items.image" },
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
    ]);

    const topCategories = await Order.aggregate([
      { $match: { orderStatus: { $in: completedStatuses } } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "product_category",
          localField: "product.category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$category._id",
          categoryName: {
            $first: "$category.product_category_name" || "Không có danh mục",
          },
          revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 8 },
    ]);

    const topVouchers = await Order.aggregate([
      { $match: { "voucher.code": { $ne: null } } },
      {
        $group: {
          _id: "$voucher.code",
          timesUsed: { $sum: 1 },
          totalDiscount: { $sum: "$discountAmount" },
        },
      },
      { $sort: { timesUsed: -1 } },
      { $limit: 5 },
    ]);

    const monthlyRevenueAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: { $in: completedStatuses },
          paymentStatus: "paid",
          createdAt: { $gte: thisYearStart },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthlyRevenue = Array(12).fill(0);
    monthlyRevenueAgg.forEach((m) => {
      monthlyRevenue[m._id - 1] = m.revenue || 0;
    });

    res.status(200).json({
      overview: {
        totalRevenue: totalRevenueAgg[0]?.total || 0,
        revenueToday: revenueTodayAgg[0]?.total || 0,
        revenueThisMonth: revenueThisMonthAgg[0]?.total || 0,
        totalOrders: await Order.countDocuments(),
        deliveredOrders: statusMap.complete || 0,  
        totalUsers,
        newUsersThisMonth,
      },
      orderStatus: statusMap,
      topProducts,
      topCategories,
      topVouchers,
      monthlyRevenue,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy thống kê", error: error.message });
  }
};