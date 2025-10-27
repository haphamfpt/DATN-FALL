<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopFakeDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->truncate();

        DB::table('products')->insert([
            [
                'category_id' => 1,
                'product_name' => 'Áo thun thể thao Nike Dri-FIT',
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/sg-11134201-7r98x-lp0mw0nh0rbh06',
                'description' => 'Áo thun co giãn, thấm hút mồ hôi tốt, giúp bạn tập luyện thoải mái cả ngày.',
                'price' => 650000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'product_name' => 'Quần jogger Adidas nam Tiro 21',
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134201-7rcc5-lrjhdodtl5lz27',
                'description' => 'Quần thể thao nam Tiro 21 form chuẩn, chất liệu vải thấm hút tốt.',
                'price' => 850000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 3,
                'product_name' => 'Giày Adidas Ultraboost 22',
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lt8bgy3rny4b73',
                'description' => 'Đệm Boost êm ái, tăng tốc độ và giảm chấn động khi chạy đường dài.',
                'price' => 2100000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 4,
                'product_name' => 'Găng tay tập gym Under Armour',
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lr1k8vqopnfn14',
                'description' => 'Tăng độ bám và bảo vệ tay khi tập tạ, chống trượt cực tốt.',
                'price' => 350000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
