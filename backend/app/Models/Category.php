<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'product_category';
    protected $primaryKey = 'product_category_id';
    public $timestamps = true;

    protected $fillable = [
        'product_category_name',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'product_category_id');
    }
}