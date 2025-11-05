<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('categories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('categories')->insert([
            [
                'category_name' => 'Áo thể thao',
                'image_url' => 'https://down-vn.img.susercontent.com/file/sg-11134201-7r98x-lp0mw0nh0rbh06',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Quần thể thao',
                'image_url' => 'https://down-vn.img.susercontent.com/file/sg-11134201-7rcc5-lrjhdodtl5lz27',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Giày thể thao',
                'image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lsah7r2uxrns6d',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Phụ kiện gym',
                'image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lr1k8vqopnfn14',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
