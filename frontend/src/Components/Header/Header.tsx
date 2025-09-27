import { AvatarDefault } from "@/assets/img";
import instance from "@/configs/axios";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Box, Input, Menu, Text, Tooltip } from "@mantine/core";
import {
    IconHeartSpark,
    IconLogout,
    IconShoppingCart,
    IconUserCircle,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo/logo";
import Favorite from "./components/FavoriteCollection";
import IconMenu from "./components/Menu";
import CartIcon from "./components/MiniCart";
import "./Header.scss";
//import { Category } from "@/model/Category";
import MenuHeader from "./components/MenuHeader";
import SearchBox from "./components/Search";
import Posts from "./components/Posts";

const Header = () => {
    const [visible, setVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [keysearch, setKeysearch] = useState("");

    const handleOverlayClick = () => {
        setVisible(false);
        setDropdownVisible(false);
    };

    // Lấy thông tin người dùng từ localStorageO
    const [userProfile, setUserProfile] = useState(() => {
        const storedUserProfile = localStorage.getItem("userProFile");
        return storedUserProfile ? JSON.parse(storedUserProfile) : {};
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const storedUserProfile = localStorage.getItem("userProFile");
            const parsedProfile = storedUserProfile
                ? JSON.parse(storedUserProfile)
                : {};
            if (JSON.stringify(parsedProfile) !== JSON.stringify(userProfile)) {
                setUserProfile(parsedProfile);
            }
        }, 1000); // Kiểm tra mỗi giây

        return () => clearInterval(intervalId); // Dọn dẹp khi component unmount
    }, [userProfile]);

    const navigate = useNavigate();

    // Xử lý đăng xuất
    const logout = () => {
        Modal.confirm({
            title: "Xác nhận đăng xuất",
            content: "Bạn có chắc chắn muốn đăng xuất?",
            okText: "Đăng Xuất",
            cancelText: "Ở lại",
            onOk: () => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("userProFile");
                localStorage.removeItem("dataCart");
                navigate("/xac-thuc/dang-nhap");
                message.success("Đăng xuất thành công");
            },
            onCancel() {
                console.log("Người dùng đã huỷ đăng xuất");
            },
        });
    };

    const fetchFavoritesData = async () => {
        const response = await instance.get("/favorites");
        return response?.data;
    };
    const { data } = useQuery({
        queryKey: ["favoritesData"],
        queryFn: fetchFavoritesData,
        staleTime: 0,
        enabled: true,
    });

    const handleSearch = () => {
        if (keysearch.trim()) {
            navigate(`/san-pham?keysearch=${encodeURIComponent(keysearch)}`);
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <>
            {/* Header1 */}
            <header className="container flex border-b border-gray-100 bg-white justify-between items-center !py-3">
                <div className="flex flex-row ml-5 xl:ml-0">
                    <span className="text-black flex flex-row items-center font-bold text-sm">
                        <FiPhone style={{ fontSize: "13px", color: "black" }} />{" "}
                        1800 7200
                    </span>
                    <div className="mx-5 space-x-5 text-sm hidden sm:flex">
                        <span>Giới Thiệu</span>
                        <span>Khuyến mãi</span>
                        <span className="text-red-500">Giám giá đặc biệt</span>
                    </div>
                </div>
                <div className="hidden lg:flex items-center mr-10 space-x-3">
                    <EnvironmentOutlined className="text-xl mb-1" />
                    <Favorite data={data} />
                    <CartIcon />
                    {localStorage.getItem("userProFile") ? (
                        <Menu
                            shadow="md"
                            width={200}
                            offset={2}
                            transitionProps={{
                                transition: "rotate-right",
                                duration: 150,
                            }}
                        >
                            <Menu.Target>
                                <Tooltip
                                    label={`Chào, ${userProfile.full_name || userProfile.username}`}
                                >
                                    <Avatar
                                        src={
                                            userProfile.avatar || AvatarDefault
                                        }
                                    />
                                </Tooltip>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>
                                    <Box w={170}>
                                        <Text truncate="end" size="sm">
                                            Chào,{" "}
                                            {userProfile.full_name ||
                                                userProfile.username}
                                        </Text>
                                    </Box>
                                </Menu.Label>
                                <Menu.Divider />
                                <Menu.Item
                                    leftSection={
                                        <IconUserCircle
                                            style={{ fontSize: "14px" }}
                                        />
                                    }
                                    style={{ fontSize: "13px" }}
                                >
                                    <Link
                                        to={"/nguoi-dung/thong-tin-tai-khoan"}
                                    >
                                        Thông tin của tôi
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconShoppingCart
                                            style={{ fontSize: "14px" }}
                                        />
                                    }
                                    style={{ fontSize: "13px" }}
                                >
                                    <Link to={"/nguoi-dung/don-hang"}>
                                        Đơn hàng
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconHeartSpark
                                            style={{ fontSize: "14px" }}
                                        />
                                    }
                                    style={{ fontSize: "13px" }}
                                >
                                    <Link to={"/nguoi-dung/yeu-thich"}>
                                        Sản Phẩm Yêu thích
                                    </Link>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    color="red"
                                    leftSection={
                                        <IconLogout
                                            style={{ fontSize: "14px" }}
                                        />
                                    }
                                    onClick={logout}
                                >
                                    Đăng xuất
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    ) : (
                        <Button className="border-none text-sm">
                            <Link to={"/xac-thuc/dang-nhap"}>Đăng Nhập</Link>
                        </Button>
                    )}
                </div>
                <div className="lg-hidden flex space-x-5 mr-5">
                    <div className="block lg-hidden">
                        <Favorite />
                    </div>
                    <div className="block lg-hidden items-center space-x-4">
                        <CartIcon />
                    </div>
                    <div>
                        {localStorage.getItem("token") ? (
                            <Menu
                                shadow="md"
                                width={200}
                                offset={2}
                                transitionProps={{
                                    transition: "rotate-right",
                                    duration: 150,
                                }}
                            >
                                <Menu.Target>
                                    <Tooltip
                                        label={`Chào, ${userProfile.full_name}`}
                                    >
                                        <Avatar
                                            size="sm"
                                            src={
                                                userProfile.avatar ||
                                                AvatarDefault
                                            }
                                        />
                                    </Tooltip>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>
                                        <Box w={170}>
                                            <Text truncate="end" size="sm">
                                                Chào, {userProfile.full_name}
                                            </Text>
                                        </Box>
                                    </Menu.Label>
                                    <Menu.Divider />
                                    <Menu.Item
                                        leftSection={
                                            <IconUserCircle
                                                style={{ fontSize: "14px" }}
                                            />
                                        }
                                        style={{ fontSize: "13px" }}
                                    >
                                        <Link
                                            to={
                                                "/nguoi-dung/thong-tin-tai-khoan"
                                            }
                                        >
                                            Thông tin của tôi
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={
                                            <IconShoppingCart
                                                style={{ fontSize: "14px" }}
                                            />
                                        }
                                        style={{ fontSize: "13px" }}
                                    >
                                        <Link to={"/nguoi-dung/don-hang"}>
                                            Đơn hàng
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={
                                            <IconHeartSpark
                                                style={{ fontSize: "14px" }}
                                            />
                                        }
                                        style={{ fontSize: "13px" }}
                                    >
                                        <Link to={"/nguoi-dung/yeu-thich"}>
                                            Sản Phẩm Yêu thích
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item
                                        color="red"
                                        leftSection={
                                            <IconLogout
                                                style={{ fontSize: "14px" }}
                                            />
                                        }
                                        onClick={logout}
                                    >
                                        Đăng xuất
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <Button className="border-none text-sm">
                                <Link to={"/xac-thuc/dang-nhap"}>
                                    Đăng Nhập
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Header2 */}
            <header className=" sticky top-0 space-x-5  bg-white left-0 w-ful z-50 flex items-center">
                <div
                    className="container top-0 space-x-5  !py-1 bg-white left-0 w-ful z-[9999] flex items-center"
                    style={{ zIndex: 999 }}
                >
                    <div className="flex items-center ml-5 xl:ml-0">
                        <div className=" mr-2 md:mr-5 text-5xl  lg:hidden">
                            <IconMenu />
                        </div>
                        <div className="w-[150px] h-[60px] flex items-center justify-center md:justify-start">
                            <Link to="/">
                                <Logo />
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full block xl:w-[180px]">
                        <ul className="hidden lg:flex justify-center space-x-3 xl:space-x-5 text-[14px] !md:text-sm !lg:text-[12px]">
                            <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`
                                    }
                                >
                                    Trang chủ
                                </NavLink>
                            </li>
                            <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                                <NavLink
                                    to="/gioi-thieu"
                                    className={({ isActive }) =>
                                        `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                    }
                                >
                                    Giới thiệu
                                </NavLink>
                            </li>
                            <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                                {/* MenuHeader sẽ hiển thị danh mục cha-con */}
                                <MenuHeader />
                            </li>
                            <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                                <NavLink
                                    to="/lien-he"
                                    className={({ isActive }) =>
                                        `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                    }
                                >
                                    Liên Hệ
                                </NavLink>
                            </li>
                            <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                                <Posts />
                            </li>
                        </ul>
                    </div>

                    <div className="!mr-3 md:mr-0">
                        {/* <Input
                            type="text"
                            variant="filled"
                            radius="xl"
                            placeholder="Tìm kiếm..."  
                            value={keysearch}
                            onChange={(e) => setKeysearch(e.target.value)} 
                            onKeyDown={handleKeyDown}                         
                            rightSection={<SearchOutlined onClick={handleSearch}/>}
                        /> */}
                        <SearchBox />
                    </div>
                </div>
            </header>
            {(visible || dropdownVisible) && (
                <div className="overlay" onClick={handleOverlayClick} />
            )}
        </>
    );
};

export default Header;
