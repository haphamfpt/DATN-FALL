import { Breadcrumbs } from "@mui/material";
import { useEffect, useState } from "react";
import { IBlog } from "../../interfaces/Iblog";
import instance from "../../instance/instance";
import HTMLReactParser from "html-react-parser/lib/index";
import { Link } from "react-router-dom";
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
export default function BlogPage() {
  const [blog, setBlog] = useState<IBlog[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/blogs");
      setBlog(data.data);
    })();
  }, []);

  return (
    <>
      <div className=" bg-[#E7EBEF] py-2 dark:bg-[#1E2832]">
        <div className="container-main text-md text-secondary font-mono">
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs
              aria-label="breadcrumb"
              className="dark:text-util/70 *:!text-sm"
            >
              <Link color="inherit" to="/">
                Home
              </Link>
              <Link color="inherit" to="/news">
                News
              </Link>
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <main className="container-main pb-10">
        <div className="container m-auto flex">
          {/* Phần nội dung chính */}
          <div className="main-content flex-[2.5] mr-5">
            <h3 className="text-lg font-semibold py-3 dark:text-white">News</h3>
            <div className="news space-y-5">
              {blog &&
                blog.length > 0 &&
                blog.map((blog) => {
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(blog.content, "text/html");
                  const h1text = doc.querySelector("h1");
                  const img = doc.querySelectorAll("img");
                  const newimg = Array.from(img).map((i) => {
                    return i.src;
                  });
                  const p = doc.querySelector("p");
                  return (
                    <article className="flex mb-5 gap-8 bg-[#fff] p-5 rounded-lg shadow-lg">
                      <div className="max-w-[18.75rem]">
                        <img
                          src={newimg[0]}
                          alt="Great White Shark"
                          className="w-full h-auto mr-5 object-cover rounded"
                        />
                      </div>
                      <div className="text-content flex-1">
                        <Link
                          to={`/news/${blog.slug}`}
                          className="text-[1.56rem] leading-8 font-bold m-0 hover:text-primary dark:text-util duration-500 cursor-pointe"
                        >
                          {h1text?.innerText}
                        </Link>
                        <div className="text-body mt-3">
                          <p className="text-[1em] leading-5 text-[#555] mb-3 line-clamp-4">
                            {HTMLReactParser(p?.innerHTML as string)}
                          </p>
                          <Link
                            to={`/news/${blog.slug}`}
                            className="inline-block bg-[#007bff] text-[#fff] py-2 px-4 rounded hover:bg-[#0056b3]"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>

          {/* Các phần bên */}
          <aside className="flex-[1.5] space-y-5">
            <h3 className="text-lg font-semibold  py-3 dark:text-white">
              Recent Posts
            </h3>
            <div className="recent-posts p-5 mb-5 rounded-lg bg-white shadow-lg">
              <ul className="p-0 list-none">
                <li className="flex items-center mb-3.5 pb-3 border-b border-gray-300">
                  <a
                    href="https://hex-wp.com/gamemart/blog_1/"
                    className="flex items-center text-[#333] hover:text-[#007bff]"
                  >
                    <img
                      src="images/shark.jpg"
                      alt="Great White Shark"
                      className="max-w-[7.50rem] h-auto mr-3.5 rounded"
                    />
                    <span className="text-[0.9em] leading-5">
                      Great White Shark Nursery Found in Waters Off Montauk
                    </span>
                  </a>
                </li>
                <li className="flex items-center mb-3.5 pb-3 border-b border-gray-300">
                  <a
                    href="#"
                    className="flex items-center text-[#333] hover:text-[#007bff]"
                  >
                    <img
                      src="images/game1.jpg"
                      alt="Game Image"
                      className="max-w-[7.50rem] h-auto mr-3.5 rounded"
                    />
                    <span className="text-[0.9em] leading-5">
                      At Solmen va Essern Necesari the Angleso Grammatica
                    </span>
                  </a>
                </li>
                <li className="flex items-center mb-3.5 pb-3 border-b border-gray-300">
                  <a
                    href="#"
                    className="flex items-center text-[#333] hover:text-[#007bff]"
                  >
                    <img
                      src="images/game2.jpg"
                      alt="Game Image"
                      className="max-w-[7.50rem] h-auto mr-3.5 rounded"
                    />
                    <span className="text-[0.9em] leading-5">
                      I Really Believe that If You Practice Enough You Could
                    </span>
                  </a>
                </li>
                <li className="flex items-center mb-3.5 pb-3 border-b border-gray-300">
                  <a
                    href="#"
                    className="flex items-center text-[#333] hover:text-[#007bff]"
                  >
                    <img
                      src="images/game3.jpg"
                      alt="Game Image"
                      className="max-w-[7.50rem] h-auto mr-3.5 rounded"
                    />
                    <span className="text-[0.9em] leading-5">
                      AdIus Suas Lorem Eos Alii Vivendum Adversarium Ex Eirmod
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="tags p-5 mb-5 rounded-lg bg-white shadow-lg">
              <ul className="p-0 list-none">
                <li className="mb-3">
                  <a
                    href="#"
                    className="text-[#333] block py-2 px-3 rounded hover:bg-[#007bff] hover:text-[#fff]"
                  >
                    Action
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="#"
                    className="text-[#333] block py-2 px-3 rounded hover:bg-[#007bff] hover:text-[#fff]"
                  >
                    Adventure
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="#"
                    className="text-[#333] block py-2 px-3 rounded hover:bg-[#007bff] hover:text-[#fff]"
                  >
                    Strategy
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="#"
                    className="text-[#333] block py-2 px-3 rounded hover:bg-[#007bff] hover:text-[#fff]"
                  >
                    RPG
                  </a>
                </li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold">Product Categories</h3>
            <div className="categories p-5 mb-5 rounded-lg bg-white shadow-lg">
              <ul className="p-0 list-none">
                <li className="mb-3">
                  <a
                    href="#"
                    className="text-[#333] block py-2 px-3 rounded hover:bg-[#007bff] hover:text-[#fff]"
                  >
                    Accessories
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="#"
                    className="text-[#333] block py-2 px-3 rounded hover:bg-[#007bff] hover:text-[#fff]"
                  >
                    Games
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="#"
                    className="text-[#333] block py-2 px-3 rounded hover:bg-[#007bff] hover:text-[#fff]"
                  >
                    Consoles
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="#"
                    className="text-[#333] block py-2 px-3 rounded hover:bg-[#007bff] hover:text-[#fff]"
                  >
                    Gaming PCs
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
