<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeColor extends Model
{
    protected $table = 'attribute_color';
    protected $primaryKey = 'attribute_color_id';
    public $timestamps = true;

    protected $fillable = [
        'attribute_color_name',
    ];

    public function variants()
    {
        return $this->hasMany(Variant::class, 'attribute_color_id', 'attribute_color_id');
    }
}