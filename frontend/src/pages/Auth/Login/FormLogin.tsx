import instance from "@/configs/axios";
import { UserLogin } from "@/model/User";
import {
    Button,
    Flex,
    Group,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { message } from "antd";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },

        validate: {
            username: (value) => {
                if (!value) return "Tài khoản không được để trống";
                if (value.includes(" "))
                    return "Tài khoản không được chứa dấu cách";
                if (value.length < 6)
                    return "Tài khoản phải có ít nhất 6 ký tự";
                return null;
            },
            password: (value) => {
                if (!value) return "Mật khẩu không được để trống";
                if (value.includes(" "))
                    return "Mật khẩu không được chứa dấu cách";
                if (value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
                return null;
            },
        },
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (user: UserLogin) => {
        try {
            setLoading(true);
            const response = await instance.post(`/auth/login`, user);
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem(
                "userProFile",
                JSON.stringify(response.data.user),
            );

            localStorage.setItem("user", JSON.stringify(user.username));
            message.success("Đăng Nhập Thành Công");
            navigate("/");
        } catch (error) {
            message.error("Tài Khoản hoặc Mật Khẩu không chính xác");
            console.error("Error:", error);
        } finally {
            setLoading(false); // tắt loading khi xong
        }
    };

    return (
        <>
            <Flex mb={30} direction="column">
                <Title c="#342e79" fw={500} order={3}>
                    Chào mừng trở lại !
                </Title>
                <Text c="#8e8e8e" fw="400" size="md">
                    Xin hãy đăng nhập vào tài khoản của bạn
                </Text>
            </Flex>
            <form className="w-[340px]" onSubmit={form.onSubmit(onSubmit)}>
                <TextInput
                    className="mb-3"
                    withAsterisk
                    size="md"
                    radius="md"
                    label="Tên đăng nhập"
                    placeholder="Mời bạn nhập tên đăng nhập"
                    leftSection={<FaUser />}
                    {...form.getInputProps("username")}
                />
                <PasswordInput
                    className="mb-3"
                    withAsterisk
                    size="md"
                    radius="md"
                    leftSection={<FiLock />}
                    label="Mật khẩu"
                    placeholder="Mời bạn nhập mật khẩu"
                    {...form.getInputProps("password")}
                />
                <Group justify="flex-end" className="mb-1">
                    <Link
                        to="/xac-thuc/quen-mat-khau"
                        className="mb-1 text-sm hover:text-blue-500"
                    >
                        Quên Mật Khẩu ?
                    </Link>
                </Group>
                <Group justify="flex-end" className="mb-3">
                    <Link
                        to="/xac-thuc/dang-ky"
                        className="text-sm hover:text-blue-500"
                    >
                        Bạn chưa có tài khoản ?
                    </Link>
                </Group>
                <Button
                    type="submit"
                    radius="md"
                    size="md"
                    fullWidth
                    className="!bg-black !text-white hover:!bg-gray-800"
                    loading={loading}
                >
                    Đăng Nhập
                </Button>
            </form>
        </>
    );
};

export default Login;
