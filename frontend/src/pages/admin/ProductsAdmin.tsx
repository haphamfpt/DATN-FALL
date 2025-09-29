import { FileInput, Label, ToggleSwitch, Select, Table } from "flowbite-react";
import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../../interfaces/IProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductSchemaValid from "../../schemaValid/ProductSchemaValid";
import slugify from "react-slugify";
import instance from "../../instance/instance";
import { toast } from "react-toastify";
import { ICategory } from "../../interfaces/ICategory";
import _ from "lodash";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay-ts";
import { ProductContext } from "../../context/ProductContext";
import swal from "sweetalert";
import Highlighter from "react-highlight-words";
import ButtonSubmit from "../../components/Admin/ButtonSubmit";
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
const ProductsAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [statusProduct, setStatus] = useState(true);
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [isActive, setActive] = useState(false);
  const { products, dispatch } = useContext(ProductContext);
  const [AddOrUpdate, setAddOrUpdate] = useState<string>("ADD");
  const [valueSearch, setValueSearch] = useState<string>("");
  const [idProduct, setIdProduct] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [totalPage, setTotalPage] = useState();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IProduct>({
    resolver: zodResolver(ProductSchemaValid),
  });

  const handleUploadImageProduct = async (e: any) => {
    try {
      const fileForms = e.target.files;
      if (AddOrUpdate === "ADD") {
        setFiles(fileForms);
        if ([...files].length > 0) {
          setFiles(_.uniqBy([...files, ...fileForms], "name"));
        }
      } else {
        setFiles([...files, ...fileForms]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onSubmit = async (dataForm: IProduct) => {
    try {
      if (isValid) {
        setActive(true);
      }
      const uploadCloud = [...files].map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_PRESET_KEY_CLOADINARY
        );
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME_CLOADINARY
          }/image/upload`,
          formData
        );
        return response.data.secure_url;
      });
      const urls = await Promise.all(uploadCloud);
      const { name, price, price_discount, categoryId } = dataForm;

      if (AddOrUpdate === "ADD") {
        const { data } = await instance.post("products", {
          name,
          price,
          price_discount,
          slug: slugify(name),
          images: urls,
          status: statusProduct,
          categoryId,
        });

        if (data) {
          setActive(false);
        }
        reset();
        setStatus(true);
        setOpenModal(false);
        dispatch({
          type: "ADD",
          payload: data.data,
        });
        toast.success("Thêm sản phẩm thành công!");
      } else {
        const { data } = await instance.put(`products/${idProduct}`, {
          name,
          price,
          price_discount,
          slug: slugify(name),
          images: urls,
          status: statusProduct,
          categoryId,
        });
        if (data) {
          setActive(false);
        }
        reset();
        setStatus(true);
        setOpenModal(false);
        dispatch({
          type: "UPDATE",
          payload: data.data,
        });
        toast.success("Sửa sản phẩm thành công !");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("categorys");
        setCategorys(
          data.data.filter((category: ICategory) => {
            return category.status === true;
          })
        );
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();
  }, []);

  const handleRemoveImage = (image_name: string) => {
    setFiles([...files].filter((file) => file.name !== image_name));
  };
  const handleRemoveImageUrl = (url: string) => {
    setFiles([...files].filter((file) => file !== url));
  };

  const handleRemoveProduct = async (id: string) => {
    try {
      await instance.delete(`products/${id}`);
      dispatch({
        type: "DELETE",
        payload: id,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const fillDataProduct = async (id: string) => {
    try {
      const { data } = await instance.get(`products/${id}`);
      setFiles(data.data.images);
      reset({
        ...data.data,
        categoryId: data.data.categoryId._id,
        images: files,
      });
      setIdProduct(id);
      setAddOrUpdate("UPDATE");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUpdateStatusProduct = async (
    id: string,
    statusProduct: boolean
  ) => {
    try {
      const { data } = await instance.patch(`products/${id}`, {
        status: statusProduct,
      });
      dispatch({
        type: "UPDATE",
        payload: data.data,
      });

      if (data.data.status) {
        toast.success("Public");
      } else {
        toast.warning("Private");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    (() => {
      reset({});
      setStatus(true);
      setFiles([]);
      setAddOrUpdate("ADD");
    })();
  }, [openModal === false]);

  useEffect(() => {
    (async () => {
      try {
        setSearchParams({ page: String(page) });
      const { data } = await instance(`products/pagination?page=${page}`);
      dispatch({
        type: "LIST",
        payload: data.data,
      });
      setTotalPage(data.totalPages);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();
  }, [page]);

  return (
    <div className="products-admin">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center py-2 px-4 bg-primary text-util rounded-md hover:bg-util hover:text-primary hover:outline hover:outline-primary transition-all"
        >
          Thêm sản phẩm{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <div className="border flex max-w-[200px] md:max-w-xs w-full items-center outline-none px-2 rounded-md">
          <input
            placeholder="Tìm theo tên: "
            className="border-0 outline-none py-2 w-full text-sm"
            onChange={(e) => {
              setValueSearch(e.target.value);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={"lg"}
      >
        <Modal.Header>
          {AddOrUpdate === "ADD" ? "Thêm" : "Sửa"} sản phẩm
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay active={isActive} spinner>
            <div className="px-3 pb-2 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3.5 w-full">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name-product"
                      className="font-medium text-sm"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      className="block border border-[#d9d9d9] rounded-md w-full h-10 text-sm"
                      placeholder="Tên sản phẩm: "
                      {...register("name")}
                    />
                    <span className="text-sm text-red-400">
                      {errors.name?.message}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="price-product"
                        className="font-medium text-sm"
                      >
                        Giá
                      </label>
                      <input
                        type="number"
                        className="block border border-[#d9d9d9] rounded-md w-full h-10 text-sm"
                        placeholder="Giá: "
                        min={1}
                        {...register("price", {
                          valueAsNumber: true,
                        })}
                      />
                      <span className="text-sm text-red-400">
                        {errors.price?.message}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="price_discount-product"
                        className="font-medium text-sm"
                      >
                        Giá Discount
                      </label>
                      <input
                        type="number"
                        className="block border border-[#d9d9d9] rounded-md w-full h-10 text-sm"
                        placeholder="Giá giảm giá: "
                        min={0}
                        {...register("price_discount", {
                          valueAsNumber: true,
                        })}
                        defaultValue={0}
                      />
                      <span className="text-sm text-red-400">
                        {errors.price_discount?.message}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="mb-2 block">
                      <Label htmlFor="categorys" value="Chọn danh mục" />
                    </div>
                    <Select {...register("categoryId")} id="id-categorys">
                      {categorys &&
                        categorys.map((category) => {
                          return (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          );
                        })}
                    </Select>
                    <span className="text-sm text-red-400">
                      {errors.categoryId?.message}
                    </span>
                  </div>
                  <div className="flex w-full flex-col space-y-2">
                    <label className="font-medium text-sm">
                      Upload{" "}
                      <span className="text-primary">
                        ( {[...files] && files.length} ảnh)
                      </span>
                    </label>
                    <Label
                      htmlFor="dropzone-file"
                      className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="h-8 w-8 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className=" text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                      </div>
                      <FileInput
                        id="dropzone-file"
                        className="hidden"
                        sizing={'sm'}
                        multiple
                        {...register("images", {
                          onChange(event) {
                            handleUploadImageProduct(event);
                          },
                        })}
                        accept="image/*"
                      />
                    </Label>
                    <div
                      className={
                        files.length > 0
                          ? "p-2 rounded-lg flex flex-col gap-2 w-full border"
                          : "flex flex-col gap-2 w-full"
                      }
                    >
                      {[...files].map((file, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-2 border rounded-md"
                          >
                            <div className="flex items-center justify-betweenv w-full gap-2">
                              <div className="max-w-[100px] w-full h-full">
                                {typeof file === "string" ? (
                                  <img
                                    src={file}
                                    className="rounded-md inline-block object-cover"
                                  />
                                ) : (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    className="rounded-md inline-block object-cover"
                                  />
                                )}
                              </div>
                              <div className="max-w-[150px] w-full">
                                <p className="text-sm overflow-ellipsis whitespace-nowrap overflow-hidden w-full">
                                  {file.name}
                                </p>
                                <div className="hover:bg-util w-fit text-primary px-2 mt-1 rounded-sm shadow-sm">
                                  <span className="text-xs">
                                    {file.size} KB
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  if (typeof file === "string") {
                                    handleRemoveImageUrl(file);
                                  } else {
                                    handleRemoveImage(file.name);
                                  }
                                }}
                                type="button"
                                className="w-fit mx-auto block h-fit rounded-full hover:bg-red-100 hover:shadow"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1}
                                  stroke="#FF6C37"
                                  className="size-7"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-sm text-red-400">
                      {errors.images?.message}
                    </span>
                  </div>
                  <div>
                    <ToggleSwitch
                      label="Trạng thái"
                      checked={statusProduct}
                      {...register("status")}
                      className="my-7"
                      sizing={'sm'}
                      onChange={setStatus}
                    />
                  </div>
                </div>
                <ButtonSubmit
                  content={`${AddOrUpdate === "ADD" ? "Thêm" : "Sửa"} sản phẩm`}
                />
              </form>
            </div>
          </LoadingOverlay>
        </Modal.Body>
      </Modal>
      <div className="overflow-x-auto w-full mt-8 space-y-5">
        <Table hoverable className="table w-full">
          <Table.Head className="text-center">
            <Table.HeadCell>STT</Table.HeadCell>
            <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
            <Table.HeadCell>Danh mục</Table.HeadCell>
            <Table.HeadCell>Giá</Table.HeadCell>
            <Table.HeadCell>Ảnh sản phẩm</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>Hành động</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products
              .filter((item) => {
                return item.name
                  .toLowerCase()
                  .includes(valueSearch.toLowerCase());
              })
              .map((product, index) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                    key={product._id}
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {" "}
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[valueSearch.toLowerCase()]}
                        autoEscape={true}
                        textToHighlight={product.name}
                      />
                    </Table.Cell>
                    <Table.Cell>{product.categoryId.name}</Table.Cell>
                    <Table.Cell>{product.price.toLocaleString()}</Table.Cell>
                    <Table.Cell>
                      <div className="max-w-[50px] h-[50px] w-fit mx-auto rounded-full overflow-hidden shadow p-2">
                        <img
                          src={product.images[0]}
                          className="w-full object-cover"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <ToggleSwitch
                        checked={product.status}
                        className="mx-auto"
                        sizing={'sm'}
                        onChange={() => {
                          setStatus(!product.status);
                          handleUpdateStatusProduct(
                            product._id!,
                            !product.status
                          );
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-util shadow py-1.5 px-3 rounded-md"
                          onClick={() => {
                            swal({
                              title: "Bạn có muốn xóa sản phẩm này ?",
                              text: "Sau khi xóa sẽ không thể không phục !",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                handleRemoveProduct(product._id!);
                                swal("Xóa sản phẩm thành công !", {
                                  icon: "success",
                                });
                              }
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="red"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                        <button
                          className="bg-util shadow py-1.5 px-3 rounded-md"
                          onClick={() => {
                            setOpenModal(true);
                            setAddOrUpdate("UPDATE");
                            fillDataProduct(product._id!);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#1B95F2"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
        <Pagination
          count={totalPage}
          variant="outlined"
          color="primary"
          className="float-end"
          page={Number(page)}
          onChange={(e, value) => {
            setSearchParams({ page: String(value) });
          }}
        />
      </div>
    </div>
  );
};

export default ProductsAdmin;
