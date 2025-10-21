<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVariantTable extends Migration
{
    public function up()
    {
        Schema::create('variant', function (Blueprint $table) {
            $table->id('variant_id'); 
            $table->unsignedBigInteger('product_id'); 
            $table->unsignedBigInteger('attribute_color_id'); 
            $table->unsignedBigInteger('attribute_size_id'); 
            $table->integer('variant_stock'); 
            $table->decimal('variant_listed_price', 10, 2); 
            $table->decimal('variant_sale_price', 10, 2)->nullable();
            $table->decimal('variant_import_price', 10, 2); 
            $table->boolean('is_show')->default(true); 
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('variant');
    }
}