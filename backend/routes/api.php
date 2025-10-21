<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AttributeColorController;
use App\Http\Controllers\Api\AttributeSizeController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\VariantController;
use App\Http\Controllers\Api\UserController;

Route::prefix('v1')->group(function () {
    // Quản lý danh mục
    Route::apiResource('categories', CategoryController::class);

    // Quản lý màu sắc sản phẩm
    Route::apiResource('attribute-colors', AttributeColorController::class);

    // Quản lý kích thước sản phẩm
    Route::apiResource('attribute-sizes', AttributeSizeController::class);

    // Quản lý sản phẩm
    Route::apiResource('products', ProductController::class);

    // Quản lý biến thể sản phẩm
    Route::apiResource('variants', VariantController::class);

    // Users
    Route::apiResource('users', UserController::class);
});
