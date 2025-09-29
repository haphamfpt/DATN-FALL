import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBlog } from "../../interfaces/Iblog";
import instance from "../../instance/instance";
import ReverseDateFormat from "../../utils/FomatDate";
import HTMLReactParser from "html-react-parser/lib/index";

export default function NewsPage() {
  const [blog, setBlog] = useState({} as IBlog);
  const [parsedContent, setParsedContent] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("blogs/detail/" + slug);
        setBlog(data.data);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    })();
  }, [slug]);
  function removeH1(html: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const h1Tags = doc.querySelectorAll("h1");
    h1Tags.forEach((tag) => tag.remove());
    return doc.body.innerHTML;
  }
  useEffect(() => {
    if (blog.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(blog.content, "text/html");
      const h1text = doc.querySelector("h1");
      setParsedContent(h1text?.innerText || "");
      const newDate = blog.updatedAt ? blog.updatedAt.slice(0, 10) : "";
      setFormattedDate(ReverseDateFormat(newDate));
    }
  }, [blog.content, blog.updatedAt]);
  const contentNew = blog?.content ? removeH1(blog.content) : "";
  return (
    <>
      <main className="flex pt-10 w-full container-main pb-10">
        <div className="w-[62.5%] p-5 mr-5 rounded-lg border border-gray-300 dark:bg-util dark:text-util">
          <article>
            <h2 className="text-[#333] text-2xl font-bold">{parsedContent}</h2>
            <div className="post-meta mb-3.5 text-[0.9em] py-3 leading-5 text-[#888]">
              By {blog?.userId?.username} / {formattedDate}
            </div>
            <div>{HTMLReactParser(contentNew)}</div>
          </article>
        </div>
        <aside className="w-[37.5%] p-5 mb-5 rounded-lg border dark:bg-util border-gray-300">
          <div className="recent-posts">
            <h3 className="mb-3 text-lg font-semibold">Recent Posts</h3>
            <ul className="p-0">
              <li className="flex items-center mb-3.5 pb-3 border-b border-gray-300 hover:bg-gray-100">
                <a
                  href=""
                  className="flex items-center text-[#333] w-full py-2 px-3"
                >
                  <img
                    src="../../../public/images/game1.jpg"
                    alt="Great White Shark"
                    className="max-w-[7.50rem] h-auto mr-3.5 rounded"
                  />
                  <span className="text-[0.9em] leading-5 hover:text-[#007bff]">
                    Great White Shark Nursery Found in Waters Off Montauk
                  </span>
                </a>
              </li>
              <li className="flex items-center mb-3.5 pb-3 border-b border-gray-300 hover:bg-gray-100">
                <a
                  href="#"
                  className="flex items-center text-[#333] w-full py-2 px-3"
                >
                  <img
                    src="../../../public/images/game2.jpg"
                    alt="Game Image"
                    className="max-w-[7.50rem] h-auto mr-3.5 rounded"
                  />
                  <span className="text-[0.9em] leading-5 hover:text-[#007bff]">
                    At Solmen va Essern Necesari the Angleso Grammatica
                  </span>
                </a>
              </li>
              <li className="flex items-center mb-3.5 pb-3 border-b border-gray-300 hover:bg-gray-100">
                <a
                  href="#"
                  className="flex items-center text-[#333] w-full py-2 px-3"
                >
                  <img
                    src="../../../public/images/game3.jpg"
                    alt="Game Image"
                    className="max-w-[7.50rem] h-auto mr-3.5 rounded"
                  />
                  <span className="text-[0.9em] leading-5 hover:text-[#007bff]">
                    I Really Believe that If You Practice Enough You Could
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="tags p-5 mb-5 rounded-lg border dark:bg-util border-gray-300">
            <h3 className="mb-3 text-lg font-semibold">Tags</h3>
            <ul className="flex flex-col p-0">
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Accessories
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Action
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Adventure
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  RPG
                </a>
              </li>
            </ul>
          </div>
          <div className="categories p-5 mb-5 rounded-lg border dark:bg-util border-gray-300">
            <h3 className="mb-3 text-lg font-semibold">Product Categories</h3>
            <ul className="p-0">
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Accessories
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Action
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Adventures
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Console
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Gamepad
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  Games
                </a>
              </li>
              <li className="mb-3.5 border-b border-gray-300">
                <a
                  href="#"
                  className="text-[#333] block py-2 px-3 rounded-lg duration-300 hover:bg-[#007bff] hover:text-[#fff]"
                >
                  HeadPhone
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
}
