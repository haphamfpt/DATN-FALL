import { Table } from "flowbite-react";
import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import { Link } from "react-router-dom";

const OrdersAdmin = () => {
  const { orders } = useContext(OrderContext);
  const getStatus = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-red-500 bg-white shadow-list px-3 py-1.5 rounded-lg">Chờ xử lý</span>;
      case "processing":
        return <span className="text-yellow-500 bg-white shadow-list px-3 py-1.5 rounded-lg">Đang xử lý</span>;
      case "completed":
        return <span className="text-green-500 bg-white shadow-list px-3 py-1.5 rounded-lg">Đã hoàn thành</span>;
      case "cancelled":
        return <span className="text-red-500 bg-white shadow-list px-3 py-1.5 rounded-lg">Đơn hàng đã hủy</span>;
      default:
        return "Không xác định";
    }
  };
  return (
    <div className="overflow-x-auto w-full">
      <Table hoverable className="table w-full">
        <Table.Head className="text-center">
          <Table.HeadCell>STT</Table.HeadCell>
          <Table.HeadCell>Đơn hàng</Table.HeadCell>
          <Table.HeadCell>Sản phẩm</Table.HeadCell>
          <Table.HeadCell>Ngày mua</Table.HeadCell>
          <Table.HeadCell>Tổng tiền</Table.HeadCell>
          <Table.HeadCell>Tình trạng</Table.HeadCell>
          <Table.HeadCell>Hành động</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orders.map((order, index) => {
            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                key={order._id}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {order._id}
                </Table.Cell>
                <Table.Cell>{order.productItem.length}</Table.Cell>
                <Table.Cell>{String(order?.createdAt).slice(0, 10)}</Table.Cell>
                <Table.Cell className="text-primary">
                  {order.subtotalPrice} $
                </Table.Cell>
                <Table.Cell>{getStatus(order.status)}</Table.Cell>
                <Table.Cell>
                  <Link
                  to={`detail/${order._id}`}
                    className="bg-util shadow py-1.5 px-3 rounded-md flex justify-center w-fit mx-auto"
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
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrdersAdmin;
