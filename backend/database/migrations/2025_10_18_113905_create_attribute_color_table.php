<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributeColorTable extends Migration
{
    public function up()
    {
        Schema::create('attribute_color', function (Blueprint $table) {
            $table->id('attribute_color_id'); 
            $table->string('attribute_color_name'); 
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('attribute_color'); 
    }
}