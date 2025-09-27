import { footer } from "@/assets/img";
import { Box, Image, LoadingOverlay, Textarea } from "@mantine/core";
import { Button, Group, TextInput, Text, FileButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import Style from "./FormSupprt.module.scss";
import { MdPhone } from "react-icons/md";
import { useState } from "react";
import instance from "@/configs/axios";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { Supports } from "@/model/Supports";
import { NotificationExtension } from "@/extension/NotificationExtension";
import Loading from "@/extension/Loading";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const FormSupport = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [visible, { toggle }] = useDisclosure(true);
    const navigate = useNavigate();
    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await instance.get("/contacts");
        return response?.data?.data?.user || [];
    };

    const { data, error, isLoading, isError } = useQuery<Supports>({
        queryKey: ["contacts"],
        queryFn: fetchData,
    });
    const [loading, setLoading] = useState(false);
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const token = localStorage.getItem("token");

            if (!token) {
                message.error("Vui lòng đăng nhập gửi hỗ trợ");
                return; // Dừng lại không thực hiện hành động yêu thích
            }
            setLoading(true);
            const { data } = await instance.post("/contacts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            return data;
        },
        onSuccess: () => {
            const token = localStorage.getItem("token");

            // Chỉ thực hiện nếu người dùng đã đăng nhập
            if (token) {
                message.success("Gửi hõ trợ thành công ");
                form.reset();
                setFiles([]);
            }
        },
    });

    const OnSubmit = (product: any) => {
        if (!product.content || product.content.trim() === "") {
            message.error("Vui lòng nhập nội dung hỗ trợ.");
            return;
        }
        const formData = new FormData();
        formData.append("content", product.content);
        files.forEach((file) => {
            formData.append("image", file);
        });
        mutation.mutate(formData);
    };

    const form = useForm({
        mode: "controlled",
        initialValues: {
            content: "",
            image: "",
        },
        validate: {
            content: (value) =>
                value.trim() === "" ? "Nội dung không được để trống" : null,
        },
    });

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return (
            <div>
                Đã xảy ra lỗi khi tải dữ liệu liên hệ. Vui lòng thử lại sau.
            </div>
        );
    }

    return (
        <div className={Style.container}>
            <div className={Style.bannerLeft}>
                <div className={Style.title}>
                    <h1>Bạn cần hỗ trợ?</h1>
                    <p>Xin vui lòng để lại yêu cầu hỗ trợ của bạn.</p>
                </div>
                <div className="content">
                    <Box>
                        <Group justify="space-between">
                            <TextInput
                                className="mb-4 pointer-events-none cursor-not-allowed "
                                size="lg"
                                withAsterisk
                                readOnly
                                defaultValue={data?.full_name}
                                placeholder="Họ và tên"
                            />
                            <TextInput
                                className="mb-4 pointer-events-none cursor-not-allowed"
                                size="lg"
                                withAsterisk
                                readOnly
                                defaultValue={data?.phone}
                                placeholder="+(84) 123 456 789"
                            />
                        </Group>
                        <TextInput
                            className="mb-4 pointer-events-none cursor-not-allowed"
                            withAsterisk
                            size="lg"
                            readOnly
                            defaultValue={data?.email}
                            placeholder="your@email.com"
                        />
                    </Box>
                    <form onSubmit={form.onSubmit(OnSubmit)}>
                        <Textarea
                            size="lg"
                            withAsterisk
                            className={Style.textarea}
                            placeholder="Your comment"
                            {...form.getInputProps("content")}
                        />
                        {/* {form.errors.content && (
                            <Text color="red" size="sm">
                                {form.errors.content}
                            </Text>
                        )} */}
                        <Group justify="space-between" mt="md">
                            <Group>
                                <FileButton
                                    onChange={setFiles}
                                    accept="image/png,image/jpeg"
                                    multiple
                                >
                                    {(props) => (
                                        <Button
                                            variant="default"
                                            className="px-4 py-2 text-sm md:text-base lg:text-lg"
                                            {...props}
                                        >
                                            Chọn Tệp
                                        </Button>
                                    )}
                                </FileButton>
                                {files.length <= 0 && (
                                    <Text className="text-sm md:text-base lg:text-lg">
                                        Không có tệp nào được chọn
                                    </Text>
                                )}
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </Group>
                            <Button loading={loading} type="submit">
                                Gửi Yêu Cầu
                            </Button>
                        </Group>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormSupport;
