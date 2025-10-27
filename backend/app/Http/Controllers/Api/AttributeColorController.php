<?php

namespace App\Http\Controllers\Api;

use App\Models\AttributeColor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AttributeColorController extends Controller
{
    /**
     * Lấy danh sách tất cả các màu sắc.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $colors = AttributeColor::all();
            return response()->json([
                'status' => 'success',
                'data' => $colors,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy danh sách màu sắc.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Tạo mới một màu sắc.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'attribute_color_name' => 'required|string|max:255',
                'attribute_color_code' => 'nullable|string|size:7', 
            ]);

            $color = AttributeColor::create($validatedData);

            return response()->json([
                'status' => 'success',
                'data' => $color,
                'message' => 'Màu sắc đã được tạo thành công.',
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
                'message' => 'Đã xảy ra lỗi khi tạo màu sắc.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Lấy chi tiết một màu sắc.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $color = AttributeColor::findOrFail($id);
            return response()->json([
                'status' => 'success',
                'data' => $color,
            ], SymfonyResponse::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Màu sắc không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy chi tiết màu sắc.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Cập nhật một màu sắc.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'attribute_color_name' => 'required|string|max:255',
                'attribute_color_code' => 'nullable|string|size:7',
            ]);

            $color = AttributeColor::findOrFail($id);
            $color->update($validatedData);

            return response()->json([
                'status' => 'success',
                'data' => $color,
                'message' => 'Màu sắc đã được cập nhật thành công.',
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
                'message' => 'Màu sắc không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật màu sắc.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Xóa một màu sắc.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $color = AttributeColor::findOrFail($id);
            $color->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Màu sắc đã được xóa thành công.',
            ], SymfonyResponse::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Màu sắc không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi xóa màu sắc.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
