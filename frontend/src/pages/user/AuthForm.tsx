import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { IUser } from "../../interfaces/IUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, ResSchema } from "../../schemaValid/AuthSchema";
import instance from "../../instance/instance";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  isLogin?: boolean;
};
const AuthForm = ({ isLogin }: Props) => {
  const nav = useNavigate();
  const { login: contextLogin } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<IUser>({
    resolver: zodResolver(isLogin ? LoginSchema : ResSchema),
  });
  const onSubmit = async (data: IUser) => {
    try {
      if (isLogin) {
        const res = await instance.post(`auth/login`, data);
        if (res.data.token) {
          toast.success("Đăng nhập thành công");
        }
        contextLogin(res.data.token, res.data.data);
      } else {
        const res = await instance.post(`auth/register`, {
          username: data.username,
          email: data.email,
          password: data.password,
        });
        toast.success(res.data.message);
        nav("/login");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error!");
    }
  };
  return (
    <>
      <div className="container-main">
        <div className="flex justify-center pt-4">
          <div className="flex justify-content-center shadow-catelist py-5 overflow-hidden rounded-lg align-items-center">
            <div
              className="border-1 border-primary w-full rounded-lg p-3"
              style={{ width: "600px" }}
            >
              <form
                className="flex  flex-col gap-4 px-10"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h1 className="bg-primary w-fit px-6 py-2 rounded-lg text-white hover:opacity-90">
                  {isLogin ? "Đăng Nhập" : "Đăng kí tài khoản"}
                </h1>
                {!isLogin && (
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="name"
                        className="form-label"
                        value="Your name"
                      />
                    </div>
                    <TextInput
                      id="name"
                      type="text"
                      placeholder="Tên Tài Khoản"
                      {...register("username", {
                        required: true,
                      })}
                    />
                    <div className="text-red-500">
                      {errors.username?.message}
                    </div>
                  </div>
                )}
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email"
                      className="form-label"
                      value="Your email"
                    />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  <div className="text-red-500 text-sm pt-2">
                    {errors.email?.message}
                  </div>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="password"
                      className="form-label"
                      value="Your password"
                    />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Nhập password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <div className="text-red-500 text-sm pt-2">
                    {errors.password?.message}
                  </div>
                </div>
                {!isLogin && (
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="password"
                        className="form-label"
                        value="Your ConfirmPass"
                      />
                    </div>
                    <TextInput
                      id="password"
                      type="password"
                      placeholder="ConfirmPass"
                      {...register("confirmPass", {
                        required: true,
                        validate: (value) => {
                          if (value !== watch("password")) {
                            return "Không khớp mật khẩu";
                          }
                        },
                      })}
                    />
                    <div className="text-red-500">
                      {errors.confirmPass?.message}
                    </div>
                  </div>
                )}
                <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
                {isLogin ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Bạn chưa có tài khoản ? </span>
                    <Link className="text-primary" to="/register">
                      Đăng kí
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Bạn đã có tài khoản ? </span>
                    <Link className="text-primary" to="/login">
                      Đăng nhập
                    </Link>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthForm;
