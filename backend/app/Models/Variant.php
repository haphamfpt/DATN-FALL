<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    protected $table = 'variant';
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

}