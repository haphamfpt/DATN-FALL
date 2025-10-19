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


}