<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopFakeDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('products')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('products')->insert([
            [
                'category_id' => 1,
                'product_name' => 'Áo thể thao Nike Dri-FIT',
                'description' => 'Áo thun thể thao co giãn tốt, thấm hút mồ hôi, phù hợp cho chạy bộ và tập gym.',
                'price' => 650000,
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/sg-11134201-7r98x-lp0mw0nh0rbh06',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 1,
                'product_name' => 'Áo tanktop Puma Active Dry',
                'description' => 'Thiết kế thể thao, vải khô nhanh, giúp bạn tập luyện thoải mái cả ngày.',
                'price' => 590000,
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m0f1ixq8x9fw30',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'product_name' => 'Quần jogger Adidas nam',
                'description' => 'Chất liệu cotton cao cấp, co giãn, thoải mái khi di chuyển hoặc tập luyện.',
                'price' => 850000,
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/sg-11134201-7rcc5-lrjhdodtl5lz27',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'product_name' => 'Quần short thể thao Under Armour',
                'description' => 'Vải khô nhanh, chống bám mồ hôi, phù hợp cho tập gym hoặc bóng rổ.',
                'price' => 480000,
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134201-23020-0kfw9kg2rfovc4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 3,
                'product_name' => 'Giày thể thao Adidas Ultraboost 22',
                'description' => 'Giày chạy bộ cao cấp, đệm Boost êm ái, độ bền cao và nhẹ chân.',
                'price' => 2900000,
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lsah7r2uxrns6d',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 3,
                'product_name' => 'Giày Nike Air Zoom Pegasus 40',
                'description' => 'Đệm Zoom Air tiên tiến, mang lại cảm giác linh hoạt và nhẹ khi chạy.',
                'price' => 3200000,
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsaet37f3p1ie7',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 4,
                'product_name' => 'Găng tay tập gym Adidas Training',
                'description' => 'Tăng độ bám tạ, chống trượt, bảo vệ lòng bàn tay khi tập luyện.',
                'price' => 350000,
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lr1k8vqopnfn14',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 4,
                'product_name' => 'Túi đeo chéo thể thao Nike Heritage',
                'description' => 'Túi nhỏ gọn, tiện lợi mang đồ cá nhân khi ra sân tập hoặc đi chơi.',
                'price' => 550000,
                'product_image_url' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsahbyq8ghsl36',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
