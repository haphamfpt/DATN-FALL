<?php

use Illuminate\Support\Facades\Route;

// ✅ Import tất cả controller
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AttributeColorController;
use App\Http\Controllers\Api\AttributeSizeController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\VariantController;
use App\Http\Controllers\Api\UserController;

Route::prefix('v1')->group(function () {

    /**
     * 📦 Danh mục sản phẩm
     * GET /api/v1/categories
     * POST /api/v1/categories
     * PUT /api/v1/categories/{id}
     * DELETE /api/v1/categories/{id}
     */
    Route::apiResource('categories', CategoryController::class);

    /**
     * 🎨 Thuộc tính màu sản phẩm
     */
    Route::apiResource('attribute-colors', AttributeColorController::class);

    /**
     * 📏 Thuộc tính kích thước sản phẩm
     */
    Route::apiResource('attribute-sizes', AttributeSizeController::class);

    /**
     * 🛍️ Sản phẩm
     * GET /api/v1/products
     * GET /api/v1/products/{id}
     */
    Route::apiResource('products', ProductController::class);

    /**
     * 🔁 Biến thể sản phẩm
     */
    Route::apiResource('variants', VariantController::class);

    /**
     * 👤 Người dùng
     */
    Route::apiResource('users', UserController::class);
});
