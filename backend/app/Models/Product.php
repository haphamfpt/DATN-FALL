<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';

    protected $primaryKey = 'product_id';

    public $timestamps = true;

    protected $fillable = [
       
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, '');
    }

    public function variants()
    {
        return $this->hasMany(Variant::class, '');
    }
}
