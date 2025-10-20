<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductCategoryTable extends Migration
{
    public function up()
    {
        Schema::create('product_category', function (Blueprint $table) {
            $table->id('product_category_id'); 
            $table->string('product_category_name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_category'); 
    }
}