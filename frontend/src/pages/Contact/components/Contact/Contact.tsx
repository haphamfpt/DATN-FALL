import { dia_chi } from "@/assets/img";
import { AspectRatio, Loader } from "@mantine/core";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Information } from "@/model/Information";
import FormSupport from "../FormFooter/FormSupport";
import Loading from "@/extension/Loading";

const ContactPage = () => {
    const fetchData = async () => {
        try {
            const response = await instance.get("/information");
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw new Error("Không thể tải dữ liệu liên hệ");
        }
    };

    const { data, isLoading, isError } = useQuery<Information[]>({
        queryKey: ["contactShow"],
        queryFn: fetchData,
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

    if (!data) {
        return <div>Không có thông tin liên hệ nào để hiển thị.</div>;
    }

    return (
        <div className="container">
            <h1 className="text-3xl mb-14 font-semibold text-center">
                Trang Liên Hệ
            </h1>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    {" "}
                    {data.map((item) => (
                        <div key={item.id} className="space-y-3">
                            <div className="space-y-3">
                                <h2 className="text-xl font-medium">
                                    Thông tin người hỗ trợ
                                </h2>
                                <div className="flex">
                                    <p className="font-semibold mr-3">
                                        Tên nhân viên hỗ trợ :
                                    </p>
                                    <p>{item.name}</p>
                                </div>
                                <div className="flex">
                                    <p className="font-semibold mr-3">
                                        Điện thoại :
                                    </p>
                                    <p>{item.phone}</p>
                                </div>
                                <div className="flex">
                                    <p className="font-semibold mr-3">
                                        Địa chỉ:
                                    </p>
                                    <p>{item.address}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-44">
                                    <h2 className="font-semibold">
                                        Ảnh cửa hàng:
                                    </h2>
                                    <img
                                        src={item.image}
                                        alt="Địa chỉ 1"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="h-44">
                                    <h2 className="font-semibold">Bản Đồ:</h2>
                                    <AspectRatio ratio={16 / 9}>
                                        <iframe
                                            src={item.map}
                                            className="w-full h-full"
                                            allowFullScreen
                                            title="map"
                                        />
                                    </AspectRatio>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <FormSupport />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
