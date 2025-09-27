import React, { useState } from "react";
import { List } from "antd";
import { Input } from "@mantine/core";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import instance from "@/configs/axios";
import "../Header.scss";

interface Suggestion {
    id: number;
    name: string;
    slug: string;
    sku?: string;
}

const SearchBox: React.FC = () => {
    const [keysearch, setKeysearch] = useState<string>(""); // Lưu từ khóa tìm kiếm
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]); // Lưu danh sách gợi ý
    const [visible, setVisible] = useState<boolean>(false); // Hiển thị danh sách gợi ý
    const navigate = useNavigate();

    // Hàm debounce để giảm số lần gọi API
    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeout: ReturnType<typeof setTimeout> | undefined;
        return (...args: any[]) => {
            if (timeout) {
                clearTimeout(timeout); // Xóa timeout nếu nó tồn tại
            }
            timeout = setTimeout(() => {
                func(...args); // Thực hiện hàm truyền vào sau thời gian trì hoãn
            }, delay);
        };
    };

    // Gọi API để lấy danh sách gợi ý sản phẩm
    const fetchSuggestions = async (query: string) => {
        try {
            const response = await instance.get(
                `/products/list?keysearch=${query}`,
            );
            setSuggestions(response.data.data); // Lưu danh sách gợi ý vào state
        } catch (error) {
            console.error("Lỗi khi lấy danh sách gợi ý:", error);
        }
    };

    // Hàm debounce gọi API
    const handleSearch = debounce((value: string) => {
        if (value.trim()) {
            fetchSuggestions(value);
            setVisible(true); // Hiển thị Popover khi có kết quả
        } else {
            setSuggestions([]); // Xóa danh sách gợi ý
            setVisible(false); // Ẩn Popover nếu không có từ khóa
        }
    }, 300);

    // Khi người dùng thay đổi nội dung input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKeysearch(value); // Cập nhật từ khóa tìm kiếm
        handleSearch(value); // Gọi hàm debounce
    };

    // Xử lý khi chọn sản phẩm từ gợi ý
    const handleSuggestionClick = (item: Suggestion) => {
        navigate(`/chi-tiet-san-pham/${item.slug}`, {
            state: { 
                id: item.id,
             },
        });
        // console.log("Item slug", item.slug)
        setVisible(false); // Ẩn Popover
    };
    

    return (
        <div style={{ position: "relative", width: "300px" }}>
            {/* Ô input tìm kiếm */}
            <Input
                type="text"
                variant="filled"
                radius="xl"
                placeholder="Tìm kiếm..."
                value={keysearch}
                onChange={handleChange}
                // onKeyDown={handleKeyDown}
                rightSection={
                    <SearchOutlined
                        onClick={() => handleSearch(keysearch)}
                        style={{ cursor: "pointer", color: "#999" }}
                    />
                }
            />

            {/* Hiển thị gợi ý */}
            {visible && suggestions.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        zIndex: 1000,
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        maxHeight: "300px",
                        overflowY: "auto",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Tạo hiệu ứng đổ bóng                        
                    }}
                    className="suggestions-container"
                >
                    <List
                        dataSource={suggestions}
                        renderItem={(item) => (
                            <List.Item
                                style={{
                                    cursor: "pointer",
                                    padding: "10px 15px", // Thêm khoảng cách trong mỗi item
                                    borderBottom: "1px solid #f0f0f0", // Đường kẻ chia các item
                                    transition: "background-color 0.3s ease",
                                }}
                                onClick={() => handleSuggestionClick(item)}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "#f5f5f5")
                                } // Hiệu ứng hover
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "white")
                                } // Hoàn về trạng thái ban đầu
                            >
                                <span
                                    style={{
                                        fontSize: "14px",
                                        color: "#333",
                                        wordWrap: "break-word", // Đảm bảo chữ không bị tràn
                                    }}
                                >
                                    {item.name} {/* Hiển thị tên sản phẩm */}
                                </span>
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchBox;
