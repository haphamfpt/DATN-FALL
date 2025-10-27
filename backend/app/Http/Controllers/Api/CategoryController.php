<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse; // Import đúng lớp Response

class CategoryController extends Controller
{
    /**
     * Lấy danh sách tất cả các danh mục.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $categories = Category::all();
            return response()->json([
                'status' => 'success',
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
     * Tạo mới một danh mục.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'product_category_name' => 'required|string|max:255',
            ]);

            $category = Category::create($validatedData);

            return response()->json([
                'status' => 'success',
                'data' => $category,
                'message' => 'Danh mục đã được tạo thành công.',
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
     * Lấy chi tiết một danh mục.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $category = Category::findOrFail($id);
            return response()->json([
                'status' => 'success',
                'data' => $category,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Danh mục không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy chi tiết danh mục.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Cập nhật một danh mục.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'product_category_name' => 'required|string|max:255',
            ]);

            $category = Category::findOrFail($id);
            $category->update($validatedData);

            return response()->json([
                'status' => 'success',
                'data' => $category,
                'message' => 'Danh mục đã được cập nhật thành công.',
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
                'message' => 'Danh mục không tồn tại.',
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
     * Xóa một danh mục.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Danh mục đã được xóa thành công.',
            ], SymfonyResponse::HTTP_NO_CONTENT);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Danh mục không tồn tại.',
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