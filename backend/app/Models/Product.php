<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';
    protected $primaryKey = 'product_id';
    public $timestamps = true;

    protected $fillable = [
        'category_id',
        'product_name',
        'product_image_url',
        'product_image2_url',
        'product_image3_url',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'product_category_id');
    }

    public function variants()
    {
        return $this->hasMany(Variant::class, 'product_id', 'product_id');
    }
}