<?php

namespace App\Http\Controllers\Api;

use App\Models\AttributeSize;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AttributeSizeController extends Controller
{
    /**
     * Lấy danh sách tất cả các kích thước.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $sizes = AttributeSize::all();
            return response()->json([
                'status' => 'success',
                'data' => $sizes,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy danh sách kích thước.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Tạo mới một kích thước.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'attribute_size_name' => 'required|string|max:255',
            ]);

            $size = AttributeSize::create($validatedData);

            return response()->json([
                'status' => 'success',
                'data' => $size,
                'message' => 'Kích thước đã được tạo thành công.',
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
                'message' => 'Đã xảy ra lỗi khi tạo kích thước.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Lấy chi tiết một kích thước.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $size = AttributeSize::findOrFail($id);
            return response()->json([
                'status' => 'success',
                'data' => $size,
            ], SymfonyResponse::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kích thước không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy chi tiết kích thước.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Cập nhật một kích thước.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'attribute_size_name' => 'required|string|max:255',
            ]);

            $size = AttributeSize::findOrFail($id);
            $size->update($validatedData);

            return response()->json([
                'status' => 'success',
                'data' => $size,
                'message' => 'Kích thước đã được cập nhật thành công.',
            ], SymfonyResponse::HTTP_OK);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $e->errors(),
            ], SymfonyResponse::HTTP_UNPROCESSABLE_ENTITY);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kích thước không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật kích thước.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Xóa một kích thước.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $size = AttributeSize::findOrFail($id);
            $size->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Kích thước đã được xóa thành công.',
            ], SymfonyResponse::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kích thước không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi xóa kích thước.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}