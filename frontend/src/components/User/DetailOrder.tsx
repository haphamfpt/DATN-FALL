import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import instance from "../../instance/instance";
import { IOrder } from "../../interfaces/IOrder";
import ReverseDateFormat from "../../utils/FomatDate";
export default function DetailOrder() {
  const [order, setOrder] = useState<IOrder[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(
        `order/detail/${JSON.parse(localStorage.getItem("user") as string)._id}`
      );
      setOrder(data.data);
    })();
  }, []);
  const statusClasse: Record<string, string> = {
    "Chờ xác nhận": "text-yellow-600 bg-yellow-200",
    "Đang xử lý": "text-green-600 bg-green-200",
    "Hoàn thành": "text-blue-600 bg-blue-200",
    "Đã hủy bỏ": "text-red-600 bg-red-200",
  };
  const handleRemoveOrder = async (id: string) => {
    try {
      const { data } = await instance.put("order/" + id, {
        status: "Đã hủy bỏ",
      });
      setOrder(
        order.map((or: any) => {
          if (or._id === data.data._id) {
            return data.data;
          }
          return or;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-lg font-bold pt-1 pb-3">Danh sách đơn hàng</h1>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Mã Đơn Hàng</Table.HeadCell>
            <Table.HeadCell>Ngày mua</Table.HeadCell>
            <Table.HeadCell>Sản phẩm</Table.HeadCell>
            <Table.HeadCell>Tổng tiền</Table.HeadCell>
            <Table.HeadCell>Tình trạng</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {order && order?.length > 0 ? (
              order.map((or) => (
                <Table.Row
                  key={or._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {or.code_Order}
                  </Table.Cell>
                  <Table.Cell>
                    {ReverseDateFormat(or?.createdAt?.slice(0, 10))}
                  </Table.Cell>
                  <Table.Cell className="">{or.productItem.length}</Table.Cell>
                  <Table.Cell>${or.subtotalPrice.toFixed(1)}</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`${
                        statusClasse[or.status]
                      } px-2 py-0.5 rounded-lg font-semibold`}
                    >
                      {or.status}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        swal({
                          title:
                            "Bạn có chắc chắn muốn hủy đơn hàng này không ?",
                          text: "Sau khi hủy sẽ không thể khôi phục !",
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                        }).then((willDelete) => {
                          if (willDelete) {
                            handleRemoveOrder(or._id!);
                            swal("Hủy đơn hàng thành công !", {
                              icon: "success",
                            });
                          }
                        });
                      }}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      {or.status == "Đã hủy bỏ" ? "" : "Hủy Đơn Hàng"}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <div>Không có đơn hàng nào</div>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
