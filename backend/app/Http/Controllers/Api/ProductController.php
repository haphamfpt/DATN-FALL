<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ProductController extends Controller
{
    /**
     * Lấy danh sách sản phẩm (có thể lọc theo danh mục và giá).
     * GET /api/v1/products?category_id=2&max_price=1000000
     */
    public function index(Request $request)
    {
        try {
            $query = Product::with('category');

            // ✅ Lọc theo danh mục
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // ✅ Lọc theo giá
            if ($request->has('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            $products = $query->get();

            return response()->json([
                'status' => 'success',
                'data' => $products,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy danh sách sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Tạo sản phẩm mới.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'category_id' => 'required|exists:categories,category_id',
                'product_name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'product_image_url' => 'nullable|string|max:255',
                'product_image2_url' => 'nullable|string|max:255',
                'product_image3_url' => 'nullable|string|max:255',
            ]);

            $product = Product::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Sản phẩm đã được tạo thành công.',
                'data' => $product,
            ], SymfonyResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi tạo sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Lấy chi tiết sản phẩm.
     */
    public function show($id)
    {
        try {
            $product = Product::with('category')->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $product,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_NOT_FOUND);
        }
    }

    /**
     * Cập nhật sản phẩm.
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'category_id' => 'required|exists:categories,category_id',
                'product_name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'product_image_url' => 'nullable|string|max:255',
                'product_image2_url' => 'nullable|string|max:255',
                'product_image3_url' => 'nullable|string|max:255',
            ]);

            $product = Product::findOrFail($id);
            $product->update($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Sản phẩm đã được cập nhật.',
                'data' => $product,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Xóa sản phẩm.
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Sản phẩm đã được xóa.',
            ], SymfonyResponse::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xóa sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
