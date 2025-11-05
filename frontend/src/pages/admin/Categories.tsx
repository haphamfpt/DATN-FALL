import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Popconfirm,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categoryApi";
import type { Category } from "../../type/category";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();

  //Lấy danh sách danh mục
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data as Category[]);
    } catch {
      message.error("Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //Mở modal thêm mới
  const openCreateModal = () => {
    setIsEditMode(false);
    setEditingCategory(null);
    form.resetFields();
    setFileList([]);
    setModalVisible(true);
  };

  //Mở modal sửa danh mục
  const openEditModal = (category: Category) => {
    setIsEditMode(true);
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
    });

    // Nếu có ảnh cũ -> hiển thị sẵn
    setFileList(
      category.image_url
        ? [
            {
              uid: "-1",
              name: "current.jpg",
              status: "done",
              url: category.image_url,
            },
          ]
        : []
    );

    setModalVisible(true);
  };

  // Gửi dữ liệu form
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.originFileObj) {
          formData.append("image_url", file.originFileObj);
        }
      }

      console.log("FormData gửi đi:", [...formData.entries()]);

      if (isEditMode && editingCategory) {
        // Laravel hỗ trợ PUT qua FormData bằng _method
        formData.append("_method", "PUT");
        await updateCategory(editingCategory.id, formData);
        message.success("Cập nhật danh mục thành công");
      } else {
        await createCategory(formData);
        message.success("Thêm danh mục thành công");
      }

      setModalVisible(false);
      fetchCategories();
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.errors) {
        Object.values(err.response.data.errors).forEach((msg: any) =>
          message.error(msg)
        );
      } else {
        message.error("Đã xảy ra lỗi, vui lòng thử lại");
      }
    }
  };

  //Xóa danh mục
  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      message.success("Xóa danh mục thành công");
      fetchCategories();
    } catch {
      message.error("Xóa danh mục thất bại");
    }
  };

  //Cấu hình cột table
  const columns = [
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    {
      title: "Hình ảnh",
      dataIndex: "image_url",
      key: "image_url",
      render: (url: string | null | undefined) =>
        url ? (
          <img
            src={url}
            alt="Ảnh danh mục"
            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "Chưa có"
        ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Category) => (
        <>
          <Button
            type="primary"
            size="small"
            onClick={() => openEditModal(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa danh mục này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger size="small">
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={openCreateModal}
        style={{ marginBottom: 16 }}
      >
        Thêm danh mục mới
      </Button>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={isEditMode ? "Sửa danh mục" : "Thêm danh mục"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText={isEditMode ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item label="Hình ảnh">
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false} 
              onChange={({ fileList }) => setFileList(fileList)}
              onRemove={() => setFileList([])}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
