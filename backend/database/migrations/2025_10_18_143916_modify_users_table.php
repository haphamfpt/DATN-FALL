<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Xóa bảng hiện tại nếu tồn tại
        Schema::dropIfExists('users');

        // Tạo lại bảng với cấu trúc mới
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // Khóa chính tự tăng
            $table->string('user_email')->unique(); // Email, kiểu chuỗi, duy nhất
            $table->string('user_password'); // Mật khẩu, kiểu chuỗi
            $table->string('user_phone_number')->nullable(); // Số điện thoại, có thể null
            $table->string('user_address')->nullable(); // Địa chỉ, có thể null
            $table->string('user_role')->default('user'); // Vai trò, mặc định là 'user'
            $table->timestamps(); // Cột created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Xóa bảng mới
        Schema::dropIfExists('users');

        // Tạo lại bảng cũ (nếu cần khôi phục)
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
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
};