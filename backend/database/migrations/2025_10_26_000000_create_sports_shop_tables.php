<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // --- USERS & ADMINS ---
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });

        Schema::create('admins', function (Blueprint $table) {
            $table->id('admin_id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });

        // --- ATTRIBUTES ---
        Schema::create('attributes', function (Blueprint $table) {
            $table->id('attribute_id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('attribute_values', function (Blueprint $table) {
            $table->id('attribute_value_id');
            $table->foreignId('attribute_id')->constrained('attributes', 'attribute_id')->cascadeOnDelete();
            $table->string('value');
            $table->timestamps();
        });

        // --- BRANDS & CATEGORIES ---
        Schema::create('brands', function (Blueprint $table) {
            $table->id('brand_id');
            $table->string('brand_name');
            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id');
            $table->string('category_name');
            $table->string('image_url')->nullable(); // ✅ Thêm dòng này
            $table->timestamps();
        });


        // --- PRODUCTS ---
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('brand_id')->nullable()->constrained('brands')->onDelete('set null');
            $table->string('product_name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0); // ✅ thêm dòng này
            $table->string('product_image_url')->nullable();
            $table->string('product_image2_url')->nullable();
            $table->string('product_image3_url')->nullable();
            $table->timestamps();
        });


        Schema::create('product_attribute_values', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->foreignId('attribute_value_id')->constrained('attribute_values', 'attribute_value_id')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->id('image_id');
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->string('image_url');
            $table->timestamps();
        });

        Schema::create('product_variants', function (Blueprint $table) {
            $table->id('variant_id');
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->foreignId('attribute_value_id')->nullable()->constrained('attribute_values', 'attribute_value_id')->nullOnDelete();
            $table->integer('stock')->default(0);
            $table->decimal('price', 10, 2)->default(0);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->boolean('is_show')->default(true);
            $table->timestamps();
        });

        // --- CARTS & ORDERS ---
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id('cart_item_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('variant_id')->constrained('product_variants', 'variant_id')->cascadeOnDelete();
            $table->integer('quantity')->default(1);
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->string('order_code')->unique();
            $table->decimal('total_price', 12, 2);
            $table->string('status')->default('pending');
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id('order_item_id');
            $table->foreignId('order_id')->constrained('orders', 'order_id')->cascadeOnDelete();
            $table->foreignId('variant_id')->constrained('product_variants', 'variant_id')->cascadeOnDelete();
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id('payment_id');
            $table->foreignId('order_id')->constrained('orders', 'order_id')->cascadeOnDelete();
            $table->string('method');
            $table->decimal('amount', 12, 2);
            $table->string('status')->default('unpaid');
            $table->timestamps();
        });

        // --- CONTENT ---
        Schema::create('banners', function (Blueprint $table) {
            $table->id('banner_id');
            $table->string('title');
            $table->string('image_url');
            $table->string('link')->nullable();
            $table->timestamps();
        });

        Schema::create('blogs', function (Blueprint $table) {
            $table->id('blog_id');
            $table->string('title');
            $table->text('content');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id('comment_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('blog_id')->nullable()->constrained('blogs', 'blog_id')->cascadeOnDelete();
            $table->text('content');
            $table->timestamps();
        });

        Schema::create('contacts', function (Blueprint $table) {
            $table->id('contact_id');
            $table->string('name');
            $table->string('email');
            $table->text('message');
            $table->timestamps();
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->id('review_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->integer('rating');
            $table->text('comment')->nullable();
            $table->timestamps();
        });

        // --- VOUCHERS ---
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id('voucher_id');
            $table->string('code')->unique();
            $table->decimal('discount_percent', 5, 2);
            $table->date('expiry_date')->nullable();
            $table->timestamps();
        });

        // --- PASSWORD RESETS ---
        Schema::create('password_resets', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // --- CACHE & SESSION (Laravel default) ---
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration');
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration');
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('cache_locks');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('password_resets');
        Schema::dropIfExists('vouchers');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('banners');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('product_variants');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('product_attribute_values');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('brands');
        Schema::dropIfExists('attribute_values');
        Schema::dropIfExists('attributes');
        Schema::dropIfExists('admins');
        Schema::dropIfExists('users');
    }
};
