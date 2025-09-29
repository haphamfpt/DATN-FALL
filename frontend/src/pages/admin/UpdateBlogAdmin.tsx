import { useContext, useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { ToggleSwitch } from "flowbite-react";
import ButtonSubmit from "../../components/Admin/ButtonSubmit";
import { useForm } from "react-hook-form";
import { IBlog } from "../../interfaces/Iblog";
import instance from "../../instance/instance";
import slugify from "react-slugify";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay-ts";
import { BlogContext } from "../../context/BlogContext";
import { useNavigate, useParams } from "react-router-dom";
const UpdateBlogAdmin = () => {
  const [statusBlog, setStatusBlog] = useState<boolean>(true);
  const [titleSlugBlog, setTitleSlugBlog] = useState("");
  const [errorBlog, setErrorBlog] = useState<string>("");
  const editorRef = useRef(null);
  const [content, setContent] = useState<string>("");
  const [isActive, setActive] = useState(false);
  const { _id } = useParams();
  const navigate = useNavigate();
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Viết Blog ...",
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  
  const { dispatch } = useContext(BlogContext);
  const { handleSubmit } = useForm<IBlog>();
  const onSubmit = async () => {
    try {
      if (titleSlugBlog !== "") {
        setErrorBlog("");
        setActive(true);
      }
      const images = doc.querySelectorAll("img");
      const uploadImagesBlog = Array.from(images).map(async (img) => {
        const src = img.src;
        const response = await fetch(src);
        const fileBlob = await response.blob();
        const formData = new FormData();
        formData.append("file", fileBlob);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_PRESET_KEY_CLOADINARY
        );
        const responseImageCloud = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME_CLOADINARY
          }/image/upload`,
          formData
        );
        return { originalSrc: src, newSrc: responseImageCloud.data.secure_url };
      });
      const dataImagesCloud = await Promise.all(uploadImagesBlog);
      let contentNew = content;
      dataImagesCloud.forEach((img) => {
        contentNew = contentNew.replace(img.originalSrc, img.newSrc);
      });
      const { data } = await instance.put(`blogs/${_id}`, {
        content: contentNew,
        slug: slugify(titleSlugBlog),
        status: statusBlog,
        userId: "66a0f4fafa296beeb591cddb",
      });
      if (data) {
        setActive(false);
      }
      toast.success(data.message);
      dispatch({
        type: "UPDATE",
        payload: data.data,
      });
      navigate('/admin/blogs')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const h1Element = doc.querySelector("h1");
    if (h1Element) {
      const titleSlug = h1Element.textContent;
      setTitleSlugBlog(titleSlug!);
    }
  }, [content]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`blogs/${_id}`);
        setContent(data.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [_id]);
  return (
    <LoadingOverlay active={isActive} spinner>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <JoditEditor
          ref={editorRef}
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
          }}
          config={config}
        />
        {errorBlog !== "" ? (
          <div className="my-2">
            <span className="text-sm text-red-500">{errorBlog}</span>
          </div>
        ) : (
          ""
        )}
        <div>
          <ToggleSwitch
            label="Trạng thái"
            checked={statusBlog}
            className="my-7"
            onChange={setStatusBlog}
            sizing={'sm'}
          />
        </div>
        <ButtonSubmit content="Sửa bài viết" />
      </form>
    </LoadingOverlay>
  );
};

export default UpdateBlogAdmin;
