<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            $validatedData = $request->validate([
                'category_id' => 'required|exists:product_category,product_category_id',
                'product_name' => 'required|string|max:255',
                'product_image_url' => 'nullable|string|max:255',
                'product_image2_url' => 'nullable|string|max:255',
                'product_image3_url' => 'nullable|string|max:255',
            ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
