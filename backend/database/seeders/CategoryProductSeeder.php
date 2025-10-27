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
                'image_url' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f8fa25b7-f0d7-47f3-a9b5-fcbb2da0e8b9/tee-Dri-FIT.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Quần thể thao',
                'image_url' => 'https://assets.adidas.com/images/w_600,f_auto,q_auto/3e734bfa4acb482d9ef3af2300979366_9366/Quan_Adidas_Tiro_21.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Giày thể thao',
                'image_url' => 'https://assets.adidas.com/images/w_600,f_auto,q_auto/3e734bfa4acb482d9ef3af2300979366_9366/Giay_Adidas_Samba_OG_Trang_B75806_01_standard.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Phụ kiện gym',
                'image_url' => 'https://underarmour.scene7.com/is/image/Underarmour/1369823-001_DEFAULT?$pdp$',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
