<?php

namespace App\Http\Controllers\Api;

use App\Models\Variant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class VariantController extends Controller
{
    /**
     * Lấy danh sách tất cả các biến thể.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $variants = Variant::all();
            return response()->json([
                'status' => 'success',
                'data' => $variants,
            ], SymfonyResponse::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy danh sách biến thể.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Tạo mới một biến thể.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'product_id' => 'required|exists:products,product_id',
                'attribute_color_id' => 'required|exists:attribute_color,attribute_color_id',
                'attribute_size_id' => 'required|exists:attribute_size,attribute_size_id',
                'variant_stock' => 'required|integer|min:0',
                'variant_listed_price' => 'required|numeric|min:0',
                'variant_sale_price' => 'nullable|numeric|min:0',
                'variant_import_price' => 'required|numeric|min:0',
                'is_show' => 'required|boolean',
            ]);

            $variant = Variant::create($validatedData);

            return response()->json([
                'status' => 'success',
                'data' => $variant,
                'message' => 'Biến thể đã được tạo thành công.',
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
                'message' => 'Đã xảy ra lỗi khi tạo biến thể.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Lấy chi tiết một biến thể.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $variant = Variant::findOrFail($id);
            return response()->json([
                'status' => 'success',
                'data' => $variant,
            ], SymfonyResponse::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Biến thể không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lấy chi tiết biến thể.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Cập nhật một biến thể.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'product_id' => 'required|exists:products,product_id',
                'attribute_color_id' => 'required|exists:attribute_color,attribute_color_id',
                'attribute_size_id' => 'required|exists:attribute_size,attribute_size_id',
                'variant_stock' => 'required|integer|min:0',
                'variant_listed_price' => 'required|numeric|min:0',
                'variant_sale_price' => 'nullable|numeric|min:0',
                'variant_import_price' => 'required|numeric|min:0',
                'is_show' => 'required|boolean',
            ]);

            $variant = Variant::findOrFail($id);
            $variant->update($validatedData);

            return response()->json([
                'status' => 'success',
                'data' => $variant,
                'message' => 'Biến thể đã được cập nhật thành công.',
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
                'message' => 'Biến thể không tồn tại.',
            ], SymfonyResponse::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật biến thể.',
                'error' => $e->getMessage(),
            ], SymfonyResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}