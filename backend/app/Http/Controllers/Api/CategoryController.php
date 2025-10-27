<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class CategoryController extends Controller
{
    /**
     * 📂 Lấy danh sách tất cả danh mục.
     * GET /api/v1/categories
     */
    public function index()
    {
        try {
            $categories = Category::select('category_id', 'category_name', 'image_url')->get();

            return response()->json([
                'status' => 'success',
                'total' => $categories->count(),
                'data' => $categories,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy danh sách danh mục.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 🆕 Tạo mới một danh mục.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'category_name' => 'required|string|max:255',
                'image_url' => 'nullable|string|max:255',
            ]);

            $category = Category::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh mục đã được tạo thành công.',
                'data' => $category,
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
                'message' => 'Đã xảy ra lỗi khi tạo danh mục.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 🔍 Lấy chi tiết danh mục theo ID.
     */
    public function show($id)
    {
        try {
            $category = Category::with('products')->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $category,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy danh mục có ID = ' . $id,
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi tải chi tiết danh mục.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * ✏️ Cập nhật danh mục theo ID.
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'category_name' => 'required|string|max:255',
                'image_url' => 'nullable|string|max:255',
            ]);

            $category = Category::findOrFail($id);
            $category->update($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh mục đã được cập nhật thành công.',
                'data' => $category,
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
                'message' => 'Không tìm thấy danh mục để cập nhật.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật danh mục.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 🗑️ Xóa danh mục theo ID.
     */
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Danh mục đã được xóa thành công.',
            ], SymfonyResponse::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy danh mục để xóa.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi xóa danh mục.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
