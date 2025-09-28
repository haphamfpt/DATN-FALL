import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { ChangePasswordNew } from "@/model/User";
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

const ChangePassword = () => {
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState("");

    const form = useForm({
        initialValues: {
            password: "",
            new_password: "",
            password_confirmation: "",
        },
        validate: {
            new_password: (value) => {
                if (!value) return "Mật khẩu mới không được để trống";
                if (value.includes(" "))
                    return "Mật khẩu không được chứa dấu cách";
                if (value.length < 6)
                    return "Mật khẩu mới phải có ít nhất 6 ký tự";
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
                    return "Mật khẩu không được chứa dấu cách";
                if (value !== values.new_password) return "Mật khẩu không khớp";
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
    const onSubmit = async (user: ChangePasswordNew) => {
        try {
            setLoading(true);
            await instance.post(`/auth/change-password`, user);
            message.success("Đổi Mật Khẩu Thành Công");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("userProFile");
            navigate("/xac-thuc/dang-nhap");
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false); // tắt loading khi xong
        }
    };

    return (
        <div className="bg-white p-5 h-[610px]">
            <Text
                size="xl"
                mb="xl"
                className="text-brown-600 items-center my-auto"
            >
                Đổi mật khẩu
            </Text>
            <hr />
            <form
                className="w-[340px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
                onSubmit={form.onSubmit(onSubmit)}
            >
                <PasswordInput
                    withAsterisk
                    label="Mật khẩu"
                    size="md"
                    radius="md"
                    leftSection={<FiLock />}
                    placeholder="Mời bạn nhập mật khẩu"
                    {...form.getInputProps("password")}
                    className="mb-4"
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
                                    label="Mật khẩu mới"
                                    size="md"
                                    radius="md"
                                    leftSection={<FiLock />}
                                    placeholder="Mời bạn nhập mật khẩu"
                                    {...form.getInputProps("new_password")}
                                    value={value}
                                    onChange={(event) => {
                                        const newPassword =
                                            event.currentTarget.value.trim();
                                        setValue(newPassword);
                                        form.setFieldValue(
                                            "new_password",
                                            newPassword,
                                        );
                                        form.validateField(
                                            "password_confirmation",
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
                        className="mb-4"
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
                <Button
                    loading={loading}
                    type="submit"
                    radius="md"
                    size="md"
                    fullWidth
                    className="bg-black text-white hover:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Đổi Mật Khẩu
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
