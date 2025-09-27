import instance from "@/configs/axios";
import { PostCatelogues } from "@/model/Posts";
import { Menu } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const Posts = () => {
    const navigate = useNavigate();

    const handlePostsClick = (categoryId: number) => {
        navigate("/tin-tuc", {
            state: {
                id: categoryId,
            },
        });
    };

    const fetchData = async (): Promise<PostCatelogues[]> => {
        const response = await instance.get("/post-catelogues");
        return response.data;
    };

    const { data: posts } = useQuery<PostCatelogues[]>({
        queryKey: ["posts"],
        queryFn: fetchData,
        refetchOnWindowFocus: true,
    });

    return (
        <div>
            <Menu
                trigger="hover"
                withArrow
                position="bottom-start"
                closeDelay={100}
            >
                <Menu.Target>
                    {/* <Link to={"/tin-tuc"}>
                        {" "}
                        <button>Tin tức</button>
                    </Link> */}
                    <button>Tin tức</button>
                </Menu.Target>
                <Menu.Dropdown>
                    {posts && posts.length > 0 ? (
                        posts.map((category) => (
                            <Menu.Item
                                key={category.id}
                                onClick={() => handlePostsClick(category.id)}
                            >
                                {category.name}
                            </Menu.Item>
                        ))
                    ) : (
                        <Menu.Item disabled>Không có danh mục nào</Menu.Item>
                    )}
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default Posts;
