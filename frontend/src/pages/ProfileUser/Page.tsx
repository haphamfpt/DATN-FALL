import { Box, Image, NavLink, Text } from "@mantine/core";
import {
  IconCards,
  IconHeart,
  IconLock,
  IconMail,
  IconPencil,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import { Outlet } from "react-router-dom";

const ProfileUser = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="container !mt-5">
        <hr />
      </div>
      <div className="container grid grid-cols-1 lg:grid-cols-[25%_75%] xl:gap-5 xl:grid-cols-[20%_80%] !mt-6 !pb-5">
        <div className="w-64 border-2 hidden lg:block bg-white">
          <div className="flex items-center space-x-2 mt-5 justify-center mx-auto py-2">
            {/* <img
              src={AvatarDefault}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            /> */}
            <Box w={160}>
              <Text truncate="end" size="lg">
                Username
              </Text>
              <Text size="md" className="flex items-center !text-[#9B9B9B]">
                <IconPencil color="#9B9B9B" size={16} />
                Sửa hồ sơ
              </Text>
            </Box>
          </div>
          <hr />
          <ul className="flex flex-col space-y-2 p-4">
            <NavLink
              leftSection={<IconUser size="1.4rem" />}
              href="/nguoi-dung/thong-tin-tai-khoan"
              label={
                <span style={{ fontSize: "14.20px" }}>Thông tin cá nhân</span>
              }
            />
            <NavLink
              leftSection={<IconLock size="1.4rem" />}
              href="/nguoi-dung/doi-mat-khau"
              label={<span style={{ fontSize: "14.20px" }}>Đổi mật khẩu</span>}
            />
            <NavLink
              leftSection={<IconShoppingCart size="1.3rem" />}
              href="/nguoi-dung/don-hang"
              label={
                <span style={{ fontSize: "14.20px" }}>Danh sách đơn hàng</span>
              }
            />
            <NavLink
              leftSection={<IconMail size="1.3rem" />}
              href="/nguoi-dung/thu-ho-tro"
              label={
                <span style={{ fontSize: "14.20px" }}>Thư hõ trợ đã gửi</span>
              }
            />
            <NavLink
              leftSection={<IconHeart size="1.3rem" />}
              href="/nguoi-dung/yeu-thich"
              label={
                <span style={{ fontSize: "14.20px" }}>Danh sách yêu thích</span>
              }
            />
          </ul>
        </div>

        {/* Main content */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
