<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ProductController extends Controller
{
    /**
     * 📦 Lấy danh sách sản phẩm (lọc theo danh mục hoặc khoảng giá).
     * GET /api/v1/products?category_id=2&min_price=500000&max_price=2000000
     */
    public function index(Request $request)
    {
        try {
            $query = Product::select(
                'product_id',
                'category_id',
                'product_name',
                'product_image_url',
                'description',
                'price'
            );

            // ✅ Lọc theo danh mục
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // ✅ Lọc theo khoảng giá
            if ($request->has('min_price') && $request->has('max_price')) {
                $query->whereBetween('price', [$request->min_price, $request->max_price]);
            } elseif ($request->has('min_price')) {
                $query->where('price', '>=', $request->min_price);
            } elseif ($request->has('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            $products = $query->get();

            return response()->json([
                'status' => 'success',
                'total' => $products->count(),
                'data' => $products,
            ], SymfonyResponse::HTTP_OK);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể tải danh sách sản phẩm.',
                'error' => $th->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 🆕 Tạo mới sản phẩm.
     * POST /api/v1/products
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
            ]);

            $product = Product::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Sản phẩm đã được tạo thành công.',
                'data' => $product,
            ], SymfonyResponse::HTTP_CREATED);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $e->errors(),
            ], SymfonyResponse::HTTP_UNPROCESSABLE_ENTITY);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi tạo sản phẩm.',
                'error' => $th->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 🔍 Lấy chi tiết sản phẩm theo ID.
     * GET /api/v1/products/{id}
     */
    public function show($id)
    {
        try {
            $product = Product::with('category')->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $product,
            ], SymfonyResponse::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy sản phẩm có ID = ' . $id,
            ], SymfonyResponse::HTTP_NOT_FOUND);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi tải chi tiết sản phẩm.',
                'error' => $th->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * ✏️ Cập nhật thông tin sản phẩm.
     * PUT /api/v1/products/{id}
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
            ]);

            $product = Product::findOrFail($id);
            $product->update($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Sản phẩm đã được cập nhật thành công.',
                'data' => $product,
            ], SymfonyResponse::HTTP_OK);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $e->errors(),
            ], SymfonyResponse::HTTP_UNPROCESSABLE_ENTITY);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy sản phẩm để cập nhật.',
            ], SymfonyResponse::HTTP_NOT_FOUND);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
                'error' => $th->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 🗑️ Xóa sản phẩm theo ID.
     * DELETE /api/v1/products/{id}
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Sản phẩm đã được xóa thành công.',
            ], SymfonyResponse::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy sản phẩm để xóa.',
            ], SymfonyResponse::HTTP_NOT_FOUND);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi xóa sản phẩm.',
                'error' => $th->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
