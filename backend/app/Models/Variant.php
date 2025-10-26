<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    // ✅ Bảng đúng là 'product_variants'
    protected $table = 'product_variants';
    protected $primaryKey = 'variant_id';
    public $timestamps = true;

    protected $fillable = [
        'product_id',
        'attribute_color_id',
        'attribute_size_id',
        'variant_stock',
        'variant_listed_price',
        'variant_sale_price',
        'variant_import_price',
        'is_show',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function color()
    {
        return $this->belongsTo(AttributeColor::class, 'attribute_color_id', 'attribute_color_id');
    }

    public function size()
    {
        return $this->belongsTo(AttributeSize::class, 'attribute_size_id', 'attribute_size_id');
    }
}
