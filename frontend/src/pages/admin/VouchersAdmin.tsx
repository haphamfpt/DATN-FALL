import { Modal, ToggleSwitch } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import ButtonSubmit from "../../components/Admin/ButtonSubmit";
import ramdom from "random-string-generator";
import { useForm } from "react-hook-form";
import { IVoucher } from "../../interfaces/IVoucher";
import { zodResolver } from "@hookform/resolvers/zod";
import VoucherSchemaValid from "../../schemaValid/VoucherSchemaValid";
import instance from "../../instance/instance";
import { VoucherContext } from "../../context/VoucherContext";
import { toast } from "react-toastify";
import ListVouchersAdmin from "./ListVouchersAdmin";
const VouchersAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(true);
  const [codeVoucher, setCodeVoucher] = useState("");
  const { dispatch } = useContext(VoucherContext);
  const [AddOrUpdate, setAddOrUpdate] = useState<string>("ADD");
  const [idVoucher,setIdVoucher]=useState<string>('')
  const handleRamdomVoucher = () => {
    const randomCode = ramdom("uppernumeric");
    setCodeVoucher(randomCode);
    setValue("code", randomCode);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<IVoucher>({
    resolver: zodResolver(VoucherSchemaValid),
  });

  const onSubmit = async (dataForm: IVoucher) => {
    switch (AddOrUpdate) {
      case "ADD":
        try {
          const { data } = await instance.post("vouchers", dataForm);
          dispatch({
            type: "ADD",
            payload: data.data,
          });
          toast.success("Thêm voucher thành công !");
          setOpenModal(false);
          reset();
          setCodeVoucher("");
          setStatus(true);
        } catch (error) {
          toast.error(error.response.data.message);
        }
        break;
      case "UPDATE":
        try {
          const { data } = await instance.put(`vouchers/${idVoucher}`, dataForm);
          dispatch({
            type: "UPDATE",
            payload: data.data,
          });
          toast.success("Update voucher thành công !");
          setOpenModal(false);
          reset();
          setCodeVoucher("");
          setStatus(true);
        } catch (error) {
          toast.error(error.response.data.message);
        }
        break;

      default:
        break;
    }
  };
    // reset data
    useEffect(() => {
      (() => {
        reset({});
        setCodeVoucher("")
        setStatus(true)
        setAddOrUpdate("ADD");
      })();
    }, [openModal === false]);

  return (
    <div>
      <div>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center py-2 px-4 bg-primary text-util rounded-md hover:bg-util hover:text-primary hover:outline hover:outline-primary transition-all"
        >
          Thêm voucher
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
        <Modal
          dismissible
          show={openModal}
          onClose={() => setOpenModal(false)}
          className="h-full"
          size={"md"}
        >
          <Modal.Header>
            {AddOrUpdate === "ADD" ? "Thêm" : "Sửa"} voucher
          </Modal.Header>
          <Modal.Body>
            <div className="px-3 pb-2 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3 w-full">
                  <div className="space-y-1.5">
                    <div className="flex justify-between ">
                      <label htmlFor="code" className="font-medium text-sm">
                        Code
                      </label>
                      <button
                        className="flex items-center text-sm gap-1 text-primary"
                        type="button"
                        onClick={handleRamdomVoucher}
                      >
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
                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                          />
                        </svg>
                        Ramdom
                      </button>
                    </div>
                    <input
                      type="text"
                      className="block border border-[#d9d9d9] rounded-md w-full h-10 text-sm"
                      placeholder="Code: "
                      value={codeVoucher}
                      {...register("code", {
                        onChange(event) {
                          setCodeVoucher(event.target.value);
                        },
                      })}
                    />
                    <span className="text-sm text-red-400">
                      {errors.code?.message}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="discount" className="font-medium text-sm">
                      Giảm giá
                    </label>
                    <input
                      type="text"
                      className="block border border-[#d9d9d9] rounded-md w-full h-10 text-sm"
                      placeholder="% "
                      {...register("discount", {
                        valueAsNumber: true,
                      })}
                      min={0}
                    />
                    <span className="text-sm text-red-400">
                      {errors.discount?.message}
                    </span>
                  </div>
                  <div>
                    <ToggleSwitch
                      label="Trạng thái"
                      {...register("status")}
                      checked={status}
                      onChange={() => {
                        setStatus(!status);
                        setValue("status", !status);
                      }}
                      sizing={"sm"}
                      className="my-8"
                    />
                  </div>
                </div>
                <ButtonSubmit content={`${AddOrUpdate === "ADD" ? "Thêm" : "Sửa"} voucher`} />
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <ListVouchersAdmin
        setOpenModal={setOpenModal}
        reset={reset}
        setStatus={setStatus}
        setCodeVoucher={setCodeVoucher}
        setIdVoucher={setIdVoucher}
        setAddOrUpdate={setAddOrUpdate}
      />
    </div>
  );
};

export default VouchersAdmin;
