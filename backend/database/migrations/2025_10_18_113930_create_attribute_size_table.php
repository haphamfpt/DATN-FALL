<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributeSizeTable extends Migration
{
    public function up()
    {
        Schema::create('attribute_size', function (Blueprint $table) {
            $table->id('attribute_size_id'); 
            $table->string('attribute_size_name'); 
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('attribute_size'); 
    }
}