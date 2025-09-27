import {
    CloseCircleOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, message } from "antd";
import { useState } from "react";
import { sanpham1 } from "@/assets/img";
import instance from "@/configs/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Loader, Text } from "@mantine/core";
import { Favorites } from "@/model/Favorite";
import { min } from "lodash";
import Index from "../../../routes/index";
import { formatCurrencyVN } from "@/model/_base/Number";
import { Link, useNavigate } from "react-router-dom";

// const fetchFavoritesData = async () => {
//     const response = await instance.get("/favorites");
//     return response.data;
// };

const removeFavorite = async (productId: number) => {
    const response = await instance.post("/favorites/toggle", {
        product_id: productId,
    });
    return response.data;
};

const Favorite = ({ data }: any) => {
    const navigate = useNavigate();
    const [drawerVisible, setDrawerVisible] = useState(false);

    // const { data: products, refetch } = useQuery<Favorites[]>({
    //     queryKey: ["favoritesData"],
    //     queryFn: fetchFavoritesData,
    // });
    const queryClient = useQueryClient();
    const handleRemoveFavorite = async (productId: number) => {
        queryClient.setQueryData(
            ["favoritesData"],
            (oldData: Favorites[] | undefined) => {
                const newData = oldData?.filter(
                    (favorite) => favorite.product.id !== productId,
                );
                return newData;
            },
        );
        try {
            await removeFavorite(productId);
            message.success("Xóa thành công sản phẩm yêu thích");
        } catch (error) {
            message.error("Có lỗi khi xóa sản phẩm yêu thích");

            // Hoàn tác lại thay đổi trong cache nếu có lỗi từ API
            queryClient.setQueryData(
                ["favoritesData"],
                (oldData: Favorites[] | undefined) => {
                    const currentData = oldData ?? [];
                    return [...currentData, { product: { id: productId } }];
                },
            );
        }
    };

    const showDrawer = () => {
        setDrawerVisible(true);
        // refetch();
    };

    const onClose = () => {
        setDrawerVisible(false);
    };
    const onhandleTurnPage = (id: number, slug: string) => {
        navigate(`/chi-tiet-san-pham/${slug}`, { state: { id: id } });
        onClose();
    };
    const handleNavigate = () => {
        onClose();

        navigate("/nguoi-dung/yeu-thich");
    };

    return (
        <>
            <div className="items-center space-x-4">
                <Badge count={data?.length || 0} className="relative">
                    <HeartOutlined
                        className="text-xl cursor-pointer"
                        onClick={showDrawer}
                    />
                </Badge>
            </div>
            <Drawer
                placement="right"
                closable={true}
                onClose={onClose}
                open={drawerVisible}
                width={500}
            >
                {/* <MiniFavorite /> */}
                <div className="flex flex-col justify-between h-full">
                    <div className="text-center h-[10%]">
                        <h3 className="font-bold mb-5 text-2xl pb-2 border-b-4 border-b-gray-400 inline-block">
                            Sưu tập yêu thích
                        </h3>
                    </div>
                    <div className="max-h-[80%] overflow-auto custom-scrollbar">
                        {data && data.length > 0 ? (
                            data?.map((favorite: any, index: any) => (
                                <div
                                    key={index}
                                    className="flex space-x-4 mb-2 items-center cursor-pointer"
                                >
                                    <div
                                        className="flex space-x-4 mb-2 items-center cursor-pointer"
                                        onClick={() => {
                                            if (
                                                !favorite?.product?.id ||
                                                !favorite?.product?.slug
                                            ) {
                                                message.error(
                                                    "Sản phẩm đã ngừng bán",
                                                );
                                            } else {
                                                onhandleTurnPage(
                                                    favorite.product.id,
                                                    favorite.product.slug,
                                                );
                                            }
                                        }}
                                    >
                                        <div>
                                            <img
                                                src={favorite.product.image_url}
                                                alt={favorite.product.name}
                                                width={100}
                                                height={10}
                                                style={{ minWidth: 100 }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h1 className="font-medium text-lg">
                                                <Box w={290}>
                                                    <Text
                                                        truncate="end"
                                                        size="lg"
                                                    >
                                                        {favorite.product.name}
                                                    </Text>
                                                </Box>
                                            </h1>
                                            <p className="text-base">
                                                {formatCurrencyVN(
                                                    favorite.product.price,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <CloseCircleOutlined
                                            onClick={() =>
                                                handleRemoveFavorite(
                                                    favorite.product.id,
                                                )
                                            }
                                            style={{
                                                fontSize: "24px",
                                                color: "red",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Không có sản phẩm yêu thích nào !</p>
                        )}
                    </div>

                    <div className="border-t border-t-gray-300 p-3 h-[10%] flex flex-col justify-between">
                        {/* <div className="flex justify-between">
                    <h1>Thành tiền :</h1>
                    <h3>37,451,000₫</h3>
                </div> */}
                        <div className="mt-5">
                            <button
                                onClick={handleNavigate} // Sử dụng hàm xử lý sự kiện
                                className="w-full bg-black text-white p-2 rounded-md mb-3"
                            >
                                Xem yêu thích
                            </button>
                            {/* <button className="w-full hover:bg-gray-300 border border-collapse p-2 rounded-md">
                        Thanh Toán
                    </button> */}
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default Favorite;
