<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeSize extends Model
{
    protected $table = 'attribute_size';
    protected $primaryKey = 'attribute_size_id';
    public $timestamps = true;

    protected $fillable = [
        'attribute_size_name',
    ];

    public function variants()
    {
        return $this->hasMany(Variant::class, 'attribute_size_id', 'attribute_size_id');
    }
}