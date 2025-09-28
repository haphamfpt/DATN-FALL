export interface UserLogin {
    password: string;
    username: string;
}
export interface UserRegister {
    email: string;
    password: string;
    password_confirmation: string;
    username: string;
}

export interface UserProfile {
    id: number; // ID của người dùng
    username: string; // Tên người dùng
    full_name: string | null; // Tên đầy đủ (có thể là null)
    email: string; // Địa chỉ email
    phone: string | null; // Số điện thoại (có thể là null)
    province: string | null; // ID tỉnh (có thể là null)
    district: string | null; // ID huyện (có thể là null)
    ward: string | null; // ID xã (có thể là null)
    address: string | null; // Địa chỉ (có thể là null)
    birthday: string | null; // Ngày sinh (có thể là null)
    avatar: string; // Đường dẫn tới ảnh đại diện (có thể là null)
    description: string | null; // Mô tả (có thể là null)
    user_agent: string | null; // Thông tin về user agent (có thể là null)
    created_at: string; // Thời gian tạo
    updated_at: string; // Thời gian cập nhật
    rule_id: number; // ID quyền (role)
    google_id: string | null; // ID Google (có thể là null)
    last_login: string | null; // Thời gian đăng nhập lần cuối (có thể là null)
    deleted_at: string | null; // Thời gian xóa (có thể là null)
    status: number; // Trạng thái
}
export interface ChangePasswordNew {
    password: string;
    new_password: string;
}
