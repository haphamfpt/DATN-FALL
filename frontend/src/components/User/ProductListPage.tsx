import Links from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductList1 from "./ProductList1";
import ProductList2 from "./ProductList2";
import { CategorysContext } from "../../context/CategoryContext";
import instance from "../../instance/instance";
import { IProduct } from "../../interfaces/IProduct";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function ProductListPage() {
  const { categorys } = useContext(CategorysContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [listPro, setListPro] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPagesCate, setTotalPagesCate] = useState(0);
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageCate = parseInt(searchParams.get("pageCate") || "1");
  const sort = searchParams.get("sort") || "";

  const handleChange = (event: SelectChangeEvent) => {
    setSearchParams({ sort: event.target.value, page: "1", pageCate: "1" });
  };

  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`products/pagination?page=${page}`);
      const sortedData = sortProducts(data.data, sort);
      setProducts(sortedData);
      setTotalPages(data.totalPages);
    })();
  }, [page, sort, slug]);

  useEffect(() => {
    console.log(1);
    (async () => {
      if (slug) {
        const { data } = await instance.get(
          `categorys/${slug}?page=${pageCate}`
        );
        const sortedData = sortProducts(data.data.productId[0], sort);
        setProducts(sortedData);
        setTotalPagesCate(data.data.productId[1].totalPages);
      }
    })();
  }, [slug, pageCate, sort]);

  const sortProducts = (products: IProduct[], sortOrder: string) => {
    if (sortOrder === "ascending") {
      return products.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "descending") {
      return products.sort((a: any, b: any) => b.price - a.price);
    }
    return products;
  };

  const handlePageClick = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  const handlePageClickCate = (pageNumber: number) => {
    setSearchParams({ pageCate: pageNumber.toString() });
  };

  return (
    <>
      <div className="bg-[#E7EBEF] py-2 dark:bg-[#1E2832]">
        <div className="container-main text-md text-secondary font-mono">
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs
              aria-label="breadcrumb"
              className="dark:text-util/70 *:!text-sm"
            >
              <Links underline="hover" color="inherit" href="/">
                Home
              </Links>
              <Links
                underline="hover"
                color="text.primary"
                href="/material-ui/react-breadcrumbs/"
                aria-current="page"
                className="dark:text-util/90 !text-sm"
              >
                Products
              </Links>
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="container-main grid grid-cols-12 gap-10 pt-2 pb-8">
        <div className="col-span-3 sticky top-0 z-10 ">
          <div className="w-full border-b-[3px] py-3">
            <h3 className="text-lg font-bold w-fit tab-border-bottom relative text-black dark:text-util">
              Product Categories
            </h3>
          </div>
          <div>
            <div className="pt-5">
              <div className="flex flex-wrap gap-2 shadow-catelist dark:bg-util rounded-xl">
                <ul className="*:flex *:gap-3 *:space-y-3 *:items-center w-full p-4 *:my-2">
                  {categorys &&
                    categorys.length > 0 &&
                    categorys.map((cate) => {
                      if (cate.status === true) {
                        return (
                          <li className="w-full" key={cate._id}>
                            <NavLink
                              to={`/products/${cate.slug}`}
                              className="flex px-4 py-2.5 gap-1.5 rounded-md w-full"
                            >
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
                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                              </svg>
                              {cate.name}
                            </NavLink>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-9">
          <div className="w-full border-b-[3px] py-3">
            <h3 className="text-lg font-bold w-fit after:!bg-red-600 tab-border-bottom relative text-black dark:text-util">
              Shop
            </h3>
          </div>
          <div className="py-5">
            <div className="flex justify-between items-center shadow-catelist rounded-lg px-3 dark:bg-util">
              <div className="flex gap-2 items-center">
                <svg
                  onClick={() => setListPro(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 cursor-pointer ${
                    !listPro && "text-black/30"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
                <svg
                  onClick={() => setListPro(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 cursor-pointer ${
                    listPro && "text-black/30"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                  />
                </svg>
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel
                    className="!bg-white !text-base"
                    id="demo-select-small-label"
                  >
                    Sort By Price
                  </InputLabel>
                  <Select
                    className="!w-[150px] !rounded-xl !text-base"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={sort}
                    label="Sort By Price"
                    onChange={handleChange}
                  >
                    <MenuItem value="">No Sort</MenuItem>
                    <MenuItem value="ascending">Sort up ascending</MenuItem>
                    <MenuItem value="descending">Sort up desscending</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div>
            {listPro ? (
              <div className="grid grid-cols-4 gap-4">
                {products &&
                  products.length > 0 &&
                  products.map((pro) => (
                    <ProductList1 key={pro._id} product={pro} />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {products &&
                  products.length > 0 &&
                  products.map((pro) => (
                    <ProductList2 key={pro._id} product={pro} />
                  ))}
              </div>
            )}
          </div>
          {!slug ? (
            <div className="flex justify-center items-center gap-3 pt-4">
              <button
                className={`${
                  page === 1
                    ? "border py-1 px-1 rounded-md"
                    : "bg-black/20 py-1 px-1 rounded-md border cursor-pointer"
                }`}
                onClick={() => handlePageClick(page - 1)}
                disabled={page === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 dark:text-util"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index + 1)}
                  className={`${
                    page === index + 1
                      ? "bg-blue-500 rounded-md text-white font-semibold"
                      : ""
                  } px-3 py-1`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`${
                  page === totalPages
                    ? "border py-1 px-1 rounded-md dark:text-util"
                    : "bg-black/20 py-1 px-1 rounded-md border cursor-pointer dark:text-util"
                }`}
                onClick={() => handlePageClick(page + 1)}
                disabled={page === totalPages}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 dark:text-util"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-3 pt-4">
              <button
                className={`${
                  pageCate === 1
                    ? "border py-1 px-1 rounded-md"
                    : "bg-black/20 py-1 px-1 rounded-md border cursor-pointer"
                }`}
                onClick={() => handlePageClickCate(pageCate - 1)}
                disabled={pageCate === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 dark:text-util"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              {[...Array(totalPagesCate)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClickCate(index + 1)}
                  className={`${
                    pageCate === index + 1
                      ? "bg-blue-500 rounded-md text-white font-semibold"
                      : ""
                  } px-3 py-1`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`${
                  pageCate === totalPagesCate
                    ? "border py-1 px-1 rounded-md dark:text-util"
                    : "bg-black/20 py-1 px-1 rounded-md border cursor-pointer dark:text-util"
                }`}
                onClick={() => handlePageClickCate(pageCate + 1)}
                disabled={pageCate === totalPagesCate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 dark:text-util"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
