import { Image } from "antd";
import { Link } from "react-router-dom";
import { IBlog } from "../../interfaces/Iblog";
import HTMLReactParser from "html-react-parser";
export default function BlogHome({ blog }: { blog: IBlog }) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.content, "text/html");
    const h1text = doc.querySelector("h1");
    const img = doc.querySelectorAll("img");
    const newimg = Array.from(img).map((i) => {
        return i.src;
    });
    const p = doc.querySelector("p");
    return (
        <>
            <div className=" overflow-hidden">
                <div>
                    <Image.PreviewGroup items={newimg}>
                        <Image
                            className="w-full rounded-2xl min-h-48 max-h-48 min-w-[308px] max-w-[308px]"
                            src={newimg[0]}
                        />
                    </Image.PreviewGroup>
                </div>
                <div>
                    <Link
                        to={`/news/${blog.slug}`}
                        className="font-bold text-base hover:text-primary dark:text-util duration-500 cursor-pointer line-clamp-1"
                    >
                        {h1text?.innerText}
                    </Link>
                </div>
                <div className="flex gap-3 items-center py-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 dark:text-util"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    <span className="text-primary/70 font-bold text-xs">
                        By{" "}
                        {typeof blog.userId === "object" &&
                        blog.userId !== null &&
                        "username" in blog.userId
                            ? (blog.userId as { username: string }).username
                            : blog.userId}{" "}
                        / February 15, 2024
                    </span>
                </div>
                <div className="text-xs text-black/80 dark:text-util line-clamp-4">
                    {HTMLReactParser(p?.innerHTML as string)}
                </div>
            </div>
        </>
    );
}
