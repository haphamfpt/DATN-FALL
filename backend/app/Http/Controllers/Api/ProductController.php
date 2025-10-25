<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse; 

class ProductController extends Controller
{
    /**
     * Lấy danh sách tất cả sản phẩm.
     */
    public function index()
    {
        try {
            $products = Product::with(['category', 'variants.color', 'variants.size'])->get();

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
     * Tạo mới một sản phẩm.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'category_id' => 'required|exists:product_category,product_category_id',
                'product_name' => 'required|string|max:255',
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $e->errors(),
            ], SymfonyResponse::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi tạo sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Lấy chi tiết một sản phẩm.
     */
    public function show($id)
    {
        try {
            $product = Product::with(['category', 'variants.color', 'variants.size'])->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $product,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Sản phẩm không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy chi tiết sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Cập nhật thông tin một sản phẩm.
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'category_id' => 'required|exists:product_category,product_category_id',
                'product_name' => 'required|string|max:255',
                'product_image_url' => 'nullable|string|max:255',
                'product_image2_url' => 'nullable|string|max:255',
                'product_image3_url' => 'nullable|string|max:255',
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
                'message' => 'Sản phẩm không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Xóa một sản phẩm.
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
                'message' => 'Sản phẩm không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi xóa sản phẩm.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
