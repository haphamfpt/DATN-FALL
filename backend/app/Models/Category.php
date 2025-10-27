<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Tên bảng trong database
    protected $table = 'categories';

    // Khóa chính
    protected $primaryKey = 'category_id';

    // Tự động quản lý created_at, updated_at
    public $timestamps = true;

    // Cho phép gán hàng loạt các cột sau
    protected $fillable = [
        'category_name',
        'image_url',
    ];

    /**
     * 🔗 Quan hệ 1-n: Một danh mục có nhiều sản phẩm
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'category_id');
    }
}
