import React, { useState } from "react";
import { Menu, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/model/Category";
import instance from "@/configs/axios";
import { useNavigate } from "react-router-dom";

// API fetch danh mục
const fetchCategories = async () => {
    const response = await instance.get("/product-catalogues");
    return response.data;
};

// Tổ chức lại dữ liệu theo cha - con
const groupCategoriesByParent = (categories: Category[]) => {
    const map: Record<number, Category[]> = {};
    const rootCategories: Category[] = [];

    categories.forEach((category) => {
        if (category.parent_id === null) {
            rootCategories.push(category);
        } else {
            if (!map[category.parent_id]) {
                map[category.parent_id] = [];
            }
            map[category.parent_id].push(category);
        }
    });

    rootCategories.forEach((category: any) => {
        category.children = map[category.id] || [];
    });

    return rootCategories;
};

// Menu cho từng danh mục
const MenuContent = ({ categories }: { categories: Category[] }) => {
    const navigate = useNavigate();
    const handleCategoryClick = (categoryId: number) => {
        navigate("/san-pham", {
            state: {
                id: categoryId,
            },
        });
    };
    const renderSubMenu = (category: any) => {
        if (category.children && category.children.length > 0) {
            return (
                <Menu.SubMenu
                    key={category.id}
                    //onClick={() => handleCategoryClick(category.id)}
                    title={<span>{category.name}</span>}
                >
                    {category.children.map((child: any) => (
                        <Menu.Item
                            key={child.id}
                            onClick={() => handleCategoryClick(child.id)}
                        >
                            {child.name}
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            );
        }
        return (
            <Menu.Item
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
            >
                {category.name}
            </Menu.Item>
        );
    };

    const groupedCategories = groupCategoriesByParent(categories);

    return (
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
            {groupedCategories.map((category) => renderSubMenu(category))}
        </Menu>
    );
};

const IconMenu = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    // Fetch categories using react-query
    const { data: categories } = useQuery<Category[]>({
        queryKey: ["categories123"],
        queryFn: fetchCategories,
    });
    return (
        <>
            <div className="flex items-center">
                <MenuOutlined
                    className="text-2xl cursor-pointer"
                    onClick={showDrawer}
                />
            </div>
            <Drawer
                title="Menu"
                placement="left"
                closable={true}
                onClose={onClose}
                open={drawerVisible}
                width={300}
            >
                <MenuContent categories={categories || []} />
            </Drawer>
        </>
    );
};

export default function App() {
    return (
        <div>
            <IconMenu />
        </div>
    );
}
