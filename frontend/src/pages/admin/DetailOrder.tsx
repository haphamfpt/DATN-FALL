import { useContext, useEffect, useState } from "react";
import instance from "../../instance/instance";
import { useParams } from "react-router-dom";
import { Label, Select, Table } from "flowbite-react";
import { IOrder } from "../../interfaces/IOrder";
import ButtonSubmit from "../../components/Admin/ButtonSubmit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { OrderContext } from "../../context/OrderContext";

const DetailOrder = () => {
  const {register,handleSubmit,reset}=useForm()
  const { _id } = useParams();
  const [data, setData] = useState<IOrder>();
  const [dataDetail, setDataDetail] = useState<any>([]);
  const {orders,dispatch}=useContext(OrderContext)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`order/${_id}`);
        setData(data.data);
        setDataDetail(data.data.productItem);
        reset({
          status:data.data.status
        })
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  const handleUpdateStatus= async ({status}:any)=>{
    try {
      const {data}= await instance.patch(`order/${_id}`,{status})
      dispatch({
        type:"UPDATE",
        payload:data.data
      })
      toast.success('Update trạng thái thành công !')
      reset(data.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 ">
      <div className="lg:max-w-[75%] w-full shadow-detail rounded-lg p-5">
        <h2 className="font-medium text-primary shadow-list px-3 py-2.5 rounded-md">
          Chi tiết đơn hàng:{" "}
          <span className="text-orange-400">#{data?._id}</span>
        </h2>
        <div className="overflow-x-auto my-5">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
              <Table.HeadCell className="text-center">Số lượng</Table.HeadCell>
              <Table.HeadCell className="text-center">Giá</Table.HeadCell>
              <Table.HeadCell className="text-center">Total</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {dataDetail.map((item: any) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={item?._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-[450]">
                      {item?.productId?.name}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {item?.quantity}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      ${item.productId?.price}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      ${item?.quantity * item.productId?.price}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              {data && (
                <Table.Row className="bg-gray-50">
                  <Table.Cell
                    colSpan={5}
                    rowSpan={2}
                    className="text-right pr-12 font-semibold"
                  >
                    Tổng tiền:{" "}
                    <span className="font-semibold text-primary">
                      ${data.subtotalPrice}
                    </span>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <form className="flex justify-between" onSubmit={handleSubmit(handleUpdateStatus)}>
          <div>
            <div className="mb-3 block">
              <Label
                htmlFor="status-order"
                className="font-[400] text-primary"
                value="Cập nhật trạng thái đơn hàng"
              />
            </div>
            <Select id="status-order" {...register('status')}>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Đã hoàn thành</option>
              <option value="cancelled">Đơn hàng đã hủy</option>
            </Select>
          </div>
          <div className="flex items-end">
            <ButtonSubmit content="Cập nhật đơn hàng" />
          </div>
        </form>
      </div>
      <div className="lg:max-w-[25%] w-full shadow-detail rounded-lg p-5 h-fit">
        <h2 className="font-medium text-primary shadow-list text-center px-3 py-2 rounded-md">
          Thông tin giao hàng
        </h2>
        <div className="my-6 flex flex-col space-y-4 *:text-sm">
          <span className="block">Người nhận: {data?.name_shopping}</span>
          <span className="block">Email: {data?.userId.email}</span>
          <span className="block">Liên hệ: {data?.phone_shopping}</span>
          <span className="block">Địa chỉ: {data?.address_shopping}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
