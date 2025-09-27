import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { formatCurrencyVN } from "@/model/_base/Number";
import { CartItem } from "@/model/Cart";
import { CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Flex, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Badge, Drawer, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const IconCart = () => {
    const navigate = useNavigate();

    //   tỔNG TIỀN
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const fetchDataCart = async () => {
        try {
            const response = await instance.get("/cart");
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const {
        data: dataCart,
        isLoading: isLoadingCart,
        refetch,
    } = useQuery<CartItem[]>({
        queryKey: ["cart"],
        queryFn: fetchDataCart,
    });

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    //chuyển trang Thanh toán
    const handlePayment = () => {
        if (dataCart && dataCart.length === 0) {
            message.error("Vui lòng chọn sản phẩm để thanh toán");
            return;
        }
        onClose();
        navigate("/thanh-toan", {
            state: { listchecked: dataCart, totalPrice: totalPrice },
        });
    };
    // Xóa sản phẩm
    const handleDeleteProduct = async (ids: number) => {
        try {
            const response = await instance.delete(`/delete-cart?ids=${ids}`);
            if (response && response.status === 200) {
                refetch();
                message.success("Xóa sản phẩm thành công");
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xóa sản phẩm");
        }
    };
    useEffect(() => {
        if (!dataCart) return;
        if (dataCart?.length > 0) {
            const total = dataCart.reduce(
                (acc: any, item: CartItem) => {
                    acc.totalQuantity += item.quantity;
                    acc.totalPrice +=
                        Number(
                            item.product_variant
                                ? item.product_variant.discount_price !== "0.00"
                                    ? item.product_variant.discount_price
                                    : item.product_variant.price
                                : item.price,
                        ) * Number(item.quantity);

                    return acc;
                },
                { totalQuantity: 0, totalPrice: 0 },
            );
            setTotalPrice(total.totalPrice);
        } else {
            setTotalPrice(0);
        }
    }, [dataCart]);
    const onhandleTurnPage = (id: number, slug: string) => {
        navigate(`/chi-tiet-san-pham/${slug}`, { state: { id: id } });
        onClose();
    };
    return (
        <>
            <div className="items-center space-x-4">
                <Badge count={dataCart?.length} className="relative">
                    <ShoppingCartOutlined
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
                <Skeleton visible={isLoadingCart} />
                {/* <MiniCart dataCart={dataCart} refetch={refetch} /> */}
                <div className="flex flex-col justify-between h-full">
                    <div className="text-center h-[10%]">
                        <h3 className="font-bold mb-5 text-2xl pb-2 border-b-4 border-b-gray-400 inline-block">
                            Giỏ Hàng
                        </h3>
                    </div>
                    <div className="max-h-[80%] overflow-auto custom-scrollbar">
                        {dataCart?.map((product: any, index: number) => (
                            <Flex
                                direction={"row"}
                                key={index}
                                justify={"space-between"}
                                align={"start"}
                                gap={"sm"}
                                style={{
                                    borderBottom: "1px solid #f0f0f0",
                                    padding: "10px 0",
                                    cursor: "pointer",
                                }}
                            >
                                <Flex
                                    direction="row"
                                    gap={"sm"}
                                    align={"center"}
                                    onClick={() => {
                                        if (
                                            !product?.product?.id ||
                                            !product?.product?.slug
                                        ) {
                                            message.error(
                                                "Sản phẩm đã ngừng bán",
                                            );
                                        } else {
                                            onhandleTurnPage(
                                                product.product.id,
                                                product.product.slug,
                                            );
                                        }
                                    }}
                                >
                                    <div>
                                        <img
                                            src={product.product.image_url}
                                            alt=""
                                            width={100}
                                            style={{
                                                maxHeight: "60px",
                                                minHeight: "60px",
                                                maxWidth: "80px",
                                                minWidth: "80px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h1 className="font-medium text-lg">
                                            {product.product.name}
                                        </h1>
                                        <div>
                                            <p
                                                style={{
                                                    color: "#333",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                }}
                                            >
                                                {product.product_variant
                                                    ? product.product_variant.attribute_values
                                                          .map(
                                                              (item: any) =>
                                                                  item.name,
                                                          )
                                                          .join(", ")
                                                    : ""}
                                            </p>
                                        </div>
                                        <Flex
                                            direction={"row"}
                                            align={"center"}
                                        >
                                            <p
                                                className="text-base"
                                                style={{
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {formatCurrencyVN(
                                                    product.product_variant
                                                        ? product
                                                              .product_variant
                                                              .discount_price !==
                                                          "0.00"
                                                            ? product
                                                                  .product_variant
                                                                  .discount_price
                                                            : product
                                                                  .product_variant
                                                                  .price
                                                        : product.price,
                                                )}{" "}
                                                x {product.quantity}
                                            </p>
                                        </Flex>
                                    </div>
                                </Flex>
                                <div>
                                    <CloseCircleOutlined
                                        style={{
                                            fontSize: "24px",
                                            color: "red",
                                            marginTop: "5px",
                                        }}
                                        onClick={() => {
                                            handleDeleteProduct(product.id);
                                        }}
                                    />
                                </div>
                            </Flex>
                        ))}
                    </div>
                    <div className="border-t border-t-gray-300 p-3 h-[20%] flex flex-col justify-between">
                        <div className="flex justify-between">
                            <h1>Thành tiền :</h1>
                            <h3>{formatCurrencyVN(String(totalPrice))}</h3>
                        </div>
                        <div className="mt-5">
                            <Link to="/gio-hang" onClick={onClose}>
                                <button className="w-full bg-black text-white p-2 rounded-md mb-3">
                                    Xem Giỏ Hàng
                                </button>
                            </Link>
                            <button
                                className="w-full hover:bg-gray-300 border border-collapse p-2 rounded-md"
                                onClick={() => handlePayment()}
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default IconCart;
