<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // ✅ Bảng đúng là 'products'
    protected $table = 'products';
    protected $primaryKey = 'product_id';
    public $timestamps = true;

    protected $fillable = [
        'category_id',
        'product_name',
        'description',
        'product_image_url',
        'product_image2_url',
        'product_image3_url',
        'price',
    ];


    // ✅ Quan hệ với bảng categories
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    // ✅ Quan hệ với bảng variants
    public function variants()
    {
        return $this->hasMany(Variant::class, 'product_id', 'product_id');
    }
}
