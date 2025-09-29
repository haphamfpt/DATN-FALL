import { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Label, Radio } from "flowbite-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import instance from "../../instance/instance";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RandomString } from "../../utils/RandomOrder";
export interface OrderFormData {
  name_shopping: string;
  phone_shopping: string;
  address_shopping: string;
}
export default function Order() {
  const stepperRef = useRef<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [idCart, setIdCart] = useState<string>("");
  const [detailOrder, setDetailOrder] = useState({} as OrderFormData);
  const nav = useNavigate();
  const { cart, dispatch } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<OrderFormData>({ mode: "onChange" });

  useEffect(() => {
    const total = cart.products.reduce((acc: number, item: any) => {
      const price =
        Number(item.productId.price_discount) || Number(item.productId.price);
      return acc + price * item.quantity;
    }, 0);
    setTotalPrice(total);
    setTotalOrder(total);
  }, [cart]);

  useEffect(() => {
    const validateForm = async () => {
      const result = await trigger();
      setIsFormValid(result);
    };
    validateForm();
  }, [trigger]);

  const handleNextStep = async () => {
    const isValidForm = await trigger();
    setTimeout(() => {
      if (isValidForm) {
        stepperRef?.current?.nextCallback();
      }
    }, 2000);
  };

  const updateCart = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user") as string)._id;
      if (cart.products && userId) {
        const { data } = await instance.put(`cart/${userId}`, {
          products: cart.products,
        });
        setIdCart(data.data._id);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user") as string);
      reset({
        address_shopping: user.address,
        name_shopping: user.username,
      });
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user") as string)._id;
      if (userId) {
        await instance.put(`cart/${userId}/${id}`);
        dispatch({ type: "DELETE_PRODUCT_CART", payload: id });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const onSubmit: SubmitHandler<OrderFormData> = async (dataForm) => {
    setDetailOrder(dataForm);
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleClick = async () => {
    try {
      const { data } = await instance.get(`vouchers/code/${inputValue}`);
      if (data.data) {
        setTotalOrder(totalOrder - totalOrder * (data.data.discount / 100));
        toast.success(
          `Áp dụng mã giảm giá thành công. Bạn được giảm ${data.data.discount}%`
        );
      }
    } catch (error) {
      toast.success("Mã giảm giá không chính xác");
    }
  };

  const addOrder = async () => {
    const codeOrder = RandomString();
    try {
      const users = JSON.parse(localStorage.getItem("user") as string);
      if (users && idCart) {
        const data = await instance.post("/order", {
          userId: users._id,
          code_Order: `GAMEMART${codeOrder}`,
          subtotalPrice: totalOrder,
          name_shopping: detailOrder.name_shopping,
          address_shopping: detailOrder.address_shopping,
          phone_shopping: detailOrder.phone_shopping,
          productItem: cart.products,
          totalPrice: totalPrice,
        });
        if (data.data) {
          toast.success("Đặt hàng thành công");
          await instance.delete(`cart/${idCart}`);
          dispatch({
            type: "LIST_CART",
            payload: [],
          });
          nav("/");
        }
      } else {
        nav("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center">
      <Stepper
        ref={stepperRef}
        style={{
          flexBasis: "54rem",
          padding: "1px !important",
          borderRadius: "0.5rem",
        }}
      >
        <StepperPanel header="Giỏ hàng">
          <div className="flex flex-col">
            <div className="min-w-[740px] shadow-catelist rounded-md dark:shadow-none dark:rounded-none p-8 ">
              {cart && cart.products.length > 0 ? (
                <div>
                  {cart.products.map((pro: any, index: string) => (
                    <fieldset key={index} className="flex flex-col mb-6 mt-4">
                      <div className="flex justify-between gap-8 p-4">
                        <div className="">
                          <div className="border p-2">
                            <img
                              className="w-32 "
                              src={pro?.productId?.images[0]}
                              alt=""
                            />
                          </div>
                          <div className="flex justify-center py-2 text-gray-400/75">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() => handleDelete(pro.productId._id)}
                              viewBox="0 0 24 24"
                              fill="gray"
                              className="size-6"
                            >
                              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                              <path
                                fillRule="evenodd"
                                d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex px-3 gap-16 items-center">
                          <div className="">
                            <Label htmlFor="nam" className="dark:text-black">
                              {pro.productId.name}
                            </Label>
                          </div>
                          <div>
                            <p className="font-semibold text-red-500 text-lg">
                              $
                              {pro.productId.price_discount != 0
                                ? (
                                    pro.productId.price_discount * pro.quantity
                                  ).toFixed(1)
                                : (pro.productId.price * pro.quantity).toFixed(
                                    1
                                  )}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="bg-red-400/50 px-3 rounded-md text-xl"
                              onClick={() =>
                                dispatch({
                                  type: "UPDATE_COUNT_PRODUCT_DECREASE",
                                  payload: pro.productId._id,
                                })
                              }
                            >
                              -
                            </button>
                            <div className="">{pro.quantity}</div>
                            <button
                              className="bg-red-400/50 px-3 rounded-md text-sm py-1"
                              onClick={() =>
                                dispatch({
                                  type: "UPDATE_COUNT_PRODUCT_INCREASE",
                                  payload: pro.productId._id,
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  ))}
                  <hr />
                  <div className="flex justify-between p-4 ">
                    <span className="medium"> Tổng tiền:</span>
                    <p className=" text-red-500 font-bold text-lg">
                      ${totalPrice.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <NavLink to="/Order">
                      <button
                        onClick={() => {
                          stepperRef?.current?.nextCallback(), updateCart();
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                      >
                        Xác nhận đặt hàng
                      </button>
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div>Không có sản phẩm trong giỏ hàng</div>
              )}
            </div>
          </div>
        </StepperPanel>
        <StepperPanel header="Thông tin khách hàng">
          <div className="flex flex-column ">
            <div className="container-main mx-auto flex justify-center items-center ">
              <form
                className="min-w-[740px] shadow-2xl dark:shadow-none p-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid gap-4 py-2 grid-cols-2">
                  <div className="w-full">
                    <Label htmlFor="nam" className="dark:text-black">
                      Tên người nhận
                    </Label>
                    <input
                      className="rounded-lg w-full mt-1 py-2 ps-3 pe-2"
                      type="text"
                      {...register("name_shopping", {
                        required: "Vui lòng nhập tên người nhận",
                        minLength: {
                          value: 6,
                          message: "Tên người nhận lớn hơn 6 kí tự",
                        },
                      })}
                      placeholder="Nhập họ và tên"
                    />
                    {errors.name_shopping && (
                      <span className="text-red-500">
                        {errors?.name_shopping?.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <Label htmlFor="nam" className="dark:text-black">
                      Số điện thoại
                    </Label>
                    <input
                      className="border-red-600 w-full mt-1 rounded-lg py-2 ps-3 pe-2"
                      type="text"
                      {...register("phone_shopping", {
                        required: "Vui lòng nhập vào số điện thoại",
                        pattern: {
                          value: /^[+84|0][1-9]\d{8}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                      placeholder="Nhập số điện thoại"
                    />
                    {errors.phone_shopping && (
                      <span className="text-red-500">
                        {errors?.phone_shopping?.message}
                      </span>
                    )}
                  </div>
                </div>
                <fieldset className="flex flex-col gap-4 mb-6">
                  <legend className="mb-4">Chọn cách nhận hàng</legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="giao-tan-noi"
                      name="nhan-hang"
                      value="Giao tận nơi"
                      defaultChecked
                    />
                    <Label htmlFor="giao-tan-noi" className="dark:text-black">
                      Giao hàng tận nơi
                    </Label>
                  </div>
                </fieldset>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Label htmlFor="nam" className="dark:text-black">
                      Địa chỉ
                    </Label>
                    <input
                      className="rounded-lg w-full mt-1 py-2 ps-3 pe-2"
                      type="text"
                      {...register("address_shopping", {
                        required: "Vui lòng nhập địa chỉ nhận hàng",
                        minLength: {
                          value: 6,
                          message: "Địa chỉ nhận hàng lớn hơn 6 kí tự",
                        },
                      })}
                      placeholder="Exam: Số nhà 1, Đống Đa, Hà Nội"
                    />
                    {errors.address_shopping && (
                      <span className="text-red-500">
                        {errors?.address_shopping?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <Label htmlFor="nam" className="dark:text-black">
                      Voucher
                    </Label>
                    <div className="flex items-center relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 block absolute top-[55%] translate-y-[-50%] left-2 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                        />
                      </svg>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Nhập voucher"
                        className="rounded-lg w-full mt-1 py-2 pe-2 ps-10"
                      />
                      <button
                        className="absolute right-2 text-[11px] top-[30%] bg-primary text-util rounded-md py-1 px-2"
                        onClick={handleClick}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between py-4">
                  <h1>Tổng Tiền</h1>
                  <p className="text-red-700 font-bold">
                    ${totalOrder.toFixed(1)}
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleNextStep}
                    disabled={isFormValid}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                  >
                    Xác nhận thông tin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </StepperPanel>
        <StepperPanel header="Thanh toán">
          <div className="flex flex-column h-12rem">
            <div className="container-main mx-auto flex justify-center items-center">
              <div className="min-w-[740px] shadow-2xl p-8 ">
                <fieldset className="flex flex-col gap-4 mb-6 mt-4">
                  <legend className="mb-4 font-bold">
                    Thông tin khách mua hàng
                  </legend>
                  <div className="flex items-center gap-10 ">
                    <li className="medium"> Khách hàng:</li>
                    <p className="ml-8">{detailOrder.name_shopping}</p>
                  </div>
                  <div className="flex items-center gap-10 ">
                    <li className="medium"> Số điện thoại:</li>
                    <p className="ml-8">{detailOrder.phone_shopping}</p>
                  </div>
                  <div className="flex items-center gap-10 ">
                    <li className="medium"> Địa chỉ nhận hàng:</li>
                    <p className="ml-8">{detailOrder.address_shopping}</p>
                  </div>
                  <div className="flex items-center gap-10 ">
                    <li className="medium"> Tổng tiền:</li>
                    <p className="ml-8 text-red-500 font-normal">
                      ${totalOrder.toFixed(1)}
                    </p>
                  </div>
                  <hr />
                  <div>
                    <h1 className="mb-4 font-bold">
                      Chọn hình thức thanh toán
                    </h1>
                    <div className="flex items-center gap-6">
                      <Radio id="nam" name="ten" value="Nam" defaultChecked />
                      <img
                        className="w-8"
                        src="https://file.hstatic.net/200000636033/file/pay_2d752907ae604f08ad89868b2a5554da.png"
                        alt=""
                      />
                      <Label htmlFor="nam" className="dark:text-black">
                        Thanh toán khi giao hàng(COD)
                      </Label>
                    </div>
                    <div className="flex items-center gap-6">
                      <Radio id="check" name="ten" value="check" />
                      <img
                        className="w-8"
                        src="data:image/png;base64,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"
                        alt=""
                      />
                      <Label htmlFor="nam" className="dark:text-black">
                        Qua VNPAY-QR
                      </Label>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => addOrder()}
                      className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                    >
                      Xác nhận đặt hàng
                    </button>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}
