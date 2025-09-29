import { Table, ToggleSwitch } from "flowbite-react";
import { useContext } from "react";
import { VoucherContext } from "../../context/VoucherContext";
import swal from "sweetalert";
import instance from "../../instance/instance";
import { toast } from "react-toastify";
import { IVoucher } from "../../interfaces/IVoucher";

type Props={
    reset:(data:IVoucher)=>void
    setOpenModal:(openModal:boolean)=>void
    setStatus:(status:boolean)=>void
    setCodeVoucher:(code:string)=>void
    setIdVoucher:(id:string)=>void
    setAddOrUpdate:(property:string)=>void
}

const ListVouchersAdmin = ({setOpenModal,reset,setStatus,setCodeVoucher,setIdVoucher,setAddOrUpdate}:Props) => {

  const { vouchers, dispatch } = useContext(VoucherContext);

  const handleRemoveVoucher = async (id: string) => {
    try {
      await instance.delete(`vouchers/${id}`);
      dispatch({
        type: "DELETE",
        payload: id,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUpdateStatus = async (id:string,statusVoucher:boolean)=>{
    try {
        const {data}=await instance.patch(`vouchers/${id}`,{
            status:statusVoucher
        })
        dispatch({
            type:"UPDATE",
            payload:data.data
        })
        if (statusVoucher) {
            toast.success('Public')
        }else{
            toast.warning('Private')
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
  }

  const fillDataVoucher=async (id:string)=>{
    try {
        const {data}=await instance.get(`vouchers/${id}`)
        setAddOrUpdate("UPDATE")
        reset(data.data)
        setStatus(data.data.status)
        setCodeVoucher(data.data.code)
        setIdVoucher(data.data._id)
    } catch (error) {
        toast.error(error.response.data.message);
    }
  }
  
  return (
    <div className="overflow-x-auto w-full mt-8">
      <Table hoverable className="table w-full">
        <Table.Head className="text-center">
          <Table.HeadCell>STT</Table.HeadCell>
          <Table.HeadCell>Mã voucher</Table.HeadCell>
          <Table.HeadCell>Giảm giá</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>Hành động</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {vouchers &&
            vouchers.map((voucher, index) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                  key={voucher._id}
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-primary dark:text-white">
                    <span className="border border-dotted border-primary p-2 rounded-md">
                      {voucher.code}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="text-red-500">
                    {voucher.discount}%
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleSwitch
                      sizing={"sm"}
                      checked={voucher.status}
                      onChange={() => {
                        handleUpdateStatus(voucher._id!, !voucher.status);
                      }}
                      className="mx-auto"
                    />
                    {voucher.status}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-util shadow py-1.5 px-3 rounded-md"
                        onClick={() => {
                          swal({
                            title: "Bạn có muốn xóa voucher này ?",
                            text: "Sau khi xóa sẽ không thể không phục !",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              handleRemoveVoucher(voucher._id!);
                              swal("Xóa voucher thành công !", {
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
                            fillDataVoucher(voucher._id!)
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
    </div>
  );
};

export default ListVouchersAdmin;
