import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { UserRegister } from "@/model/User";
import {
    Button,
    Flex,
    Group,
    PasswordInput,
    Popover,
    Progress,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { message } from "antd";
import { useState } from "react";
import { FaAt, FaUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState("");

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            password_confirmation: "",
            username: "",
        },
        validate: {
            username: (value) => {
                if (!value) return "Tên đăng nhập không được để trống";
                if (value.includes(" "))
                    return "Tên đăng nhập không được chứa dấu cách";
                if (value.length < 6)
                    return "Tên đăng nhập phải có ít nhất 6 ký tự";
                return null;
            },
            email: (value) => {
                if (!value) return "Email không được để trống";
                if (value.includes(" "))
                    return "Email không được chứa dấu cách";
                if (!/^\S+@\S+$/.test(value)) return "Email không hợp lệ";
                return null;
            },
            password: (value) => {
                if (!value) return "Mật khẩu không được để trống";
                if (value.includes(" "))
                    return "Mật khẩu không được chứa dấu cách";
                if (value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
                return null;
            },
            password_confirmation: (value, values) => {
                if (!value) return "Nhập lại mật khẩu không được để trống";
                if (value.includes(" "))
                    return "Mật khẩu xác nhận không được chứa dấu cách";
                if (value !== values.password) return "Mật khẩu không khớp";
                return null;
            },
        },
    });

    function PasswordRequirement({
        meets,
        label,
    }: {
        meets: boolean;
        label: string;
    }) {
        return (
            <Text
                c={meets ? "teal" : "red"}
                style={{ display: "flex", alignItems: "center" }}
                mt={7}
                size="sm"
            >
                {meets ? <IconCheck /> : <IconX />}{" "}
                <span style={{ marginLeft: 10 }}>{label}</span>
            </Text>
        );
    }

    const requirements = [
        { re: /[0-9]/, label: "Bao gồm số" },
        { re: /[a-z]/, label: "Bao gồm chữ thường" },
        { re: /[A-Z]/, label: "Bao gồm chữ hoa" },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Bao gồm ký tự đặc biệt" },
    ];

    function getStrength(password: string) {
        let multiplier = password.length > 5 ? 0 : 1;

        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });

        return Math.max(
            100 - (100 / (requirements.length + 1)) * multiplier,
            10,
        );
    }

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
        />
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (user: UserRegister) => {
        // const isPasswordValid = requirements.every((requirement) =>
        //     requirement.re.test(user.password),
        // );

        // // Kiểm tra độ dài mật khẩu
        // const isLengthValid = user.password.length >= 6;

        // if (!isLengthValid || !isPasswordValid) {
        //     message.error(
        //         "Mật khẩu không hợp lệ. Vui lòng đảm bảo mật khẩu của bạn đáp ứng tất cả các yêu cầu.",
        //     );
        //     return; // Ngừng thực hiện nếu mật khẩu không hợp lệ
        // }
        try {
            setLoading(true);
            await instance.post(`/auth/register`, user);
            message.success("Đăng Ký Thành Công");
            navigate("/xac-thuc/dang-nhap");
        } catch (error: any) {
            // const axiosError = error as AxiosError;
            // interface ValidationErrorResponse {
            //     [key: string]: string[];
            // }
            // if (axiosError.response) {
            //     const errorData = axiosError.response
            //         .data as ValidationErrorResponse;

            //     // Duyệt qua các lỗi và hiển thị
            //     for (const key in errorData) {
            //         if (errorData.hasOwnProperty(key)) {
            //             const messages = errorData[key];
            //             messages.forEach((errorMessage) => {
            //                 message.error(`${key}: ${errorMessage}`);
            //             });
            //         }
            //     }
            // } else {
            //     message.error("Đã xảy ra lỗi không xác định.");
            // }

            if (error.response.data.username) {
                message.error(error.response.data.username);
            }

            // Kiểm tra xem có lỗi cho email không
            if (error.response.data.email) {
                message.error(error.response.data.email);
            }
        } finally {
            setLoading(false); // tắt loading khi xong
        }
    };

    return (
        <>
            <Flex
                mb={30}
                direction="column"
                justify="flex-start"
                align="flex-start"
                className="w-[340px]"
            >
                <Title c="#342e79" fw={500} order={3}>
                    Tạo tài khoản mới !
                </Title>
                <Text c="#8e8e8e" fw="400" size="md">
                    Vui lòng nhập thông tin chi tiết
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

                <TextInput
                    className="mb-3"
                    withAsterisk
                    size="md"
                    radius="md"
                    label="Email"
                    placeholder="Mời bạn nhập email"
                    leftSection={<FaAt />}
                    {...form.getInputProps("email")}
                />
                <Stack>
                    <Popover
                        opened={popoverOpened}
                        position="bottom"
                        width="target"
                        transitionProps={{ transition: "pop" }}
                    >
                        <Popover.Target>
                            <div
                                onFocusCapture={() => setPopoverOpened(true)}
                                onBlurCapture={() => setPopoverOpened(false)}
                            >
                                <PasswordInput
                                    withAsterisk
                                    // className="mb-1"
                                    label="Mật khẩu"
                                    size="md"
                                    radius="md"
                                    leftSection={<FiLock />}
                                    placeholder="Mời bạn nhập mật khẩu"
                                    {...form.getInputProps("password")}
                                    value={value}
                                    onChange={(event) => {
                                        const newPassword =
                                            event.currentTarget.value.trim();
                                        setValue(newPassword);
                                        form.setFieldValue(
                                            "password",
                                            newPassword,
                                        );
                                    }}
                                />
                            </div>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Progress
                                color={color}
                                value={strength}
                                size={5}
                                mb="sm"
                            />
                            <PasswordRequirement
                                label="Bao gồm ít nhất 6 ký tự"
                                meets={value.length > 5}
                            />
                            {checks}
                        </Popover.Dropdown>
                    </Popover>
                    <PasswordInput
                        className="mb-3"
                        withAsterisk
                        size="md"
                        radius="md"
                        visible={visibleConfirmPassword}
                        onVisibilityChange={() =>
                            setVisibleConfirmPassword((prev) => !prev)
                        }
                        leftSection={<FiLock />}
                        label="Nhập lại mật khẩu"
                        placeholder="Mời bạn nhập lại mật khẩu"
                        {...form.getInputProps("password_confirmation")}
                    />
                </Stack>
                <Group justify="flex-end">
                    <Link
                        to="/xac-thuc/dang-nhap"
                        className="mb-3 text-sm hover:text-blue-500"
                    >
                        Bạn đã có tài khoản
                    </Link>
                </Group>
                <Button
                    loading={loading}
                    type="submit"
                    radius="md"
                    size="md"
                    fullWidth
                    className="!bg-black !border-white !text-white hover:!bg-gray-800"
                >
                    Đăng Ký
                </Button>
            </form>
        </>
    );
};

export default Register;
