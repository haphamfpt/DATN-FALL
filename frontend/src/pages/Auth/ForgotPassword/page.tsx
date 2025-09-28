import instance from "@/configs/axios";
import { Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { message } from "antd";
import { useState } from "react";
import { FaAt, FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const form = useForm({
        initialValues: {
            email: "",
        },
        validate: {
            email: (value) => {
                if (!value) return "Email không được để trống";
                if (value.includes(" "))
                    return "Email không được chứa dấu cách";
                if (!/^\S+@\S+$/.test(value)) return "Email không hợp lệ";
                return null;
            },
        },
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true); // bật loading
            await instance.post("auth/forgot-password", values);
            message.success("Thành công, Mời bạn kiểm tra email");
            navigate("/xac-thuc/dang-nhap");
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false); // tắt loading khi xong
        }
    };

    return (
        <>
            <Flex
                mb={10}
                w={340}
                direction="row"
                align="center"
                justify="flex-start"
            >
                <Link
                    to={"/xac-thuc/dang-nhap"}
                    className="flex items-center hover:text-blue-300"
                >
                    <FaChevronLeft className="mr-1" size={13} />
                    <Text size="sm">Quay Lại</Text>
                </Link>
            </Flex>
            <Flex mb={20} w={340} direction="column">
                <Title c="#342e79" fw={500} order={3}>
                    Quên Mật Khẩu !
                </Title>
                <Text c="#8e8e8e" fw="400" size="sm">
                    Nhập địa chỉ email đã đăng ký của bạn. <br />
                    Chúng tôi sẽ gửi cho bạn mật khẩu mới
                </Text>
            </Flex>
            <form className="w-[340px]" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    className="mb-4"
                    withAsterisk
                    size="md"
                    radius="md"
                    label="Email"
                    placeholder="Mời bạn nhập email"
                    leftSection={<FaAt />}
                    {...form.getInputProps("email")}
                />
                <Button
                    type="submit"
                    radius="md"
                    size="md"
                    fullWidth
                    className="!bg-black !border-white !text-white hover:!bg-gray-800"
                    loading={loading}
                >
                    Gửi Mật Khẩu
                </Button>
            </form>
        </>
    );
};

export default ForgotPassword;
