import React, { useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Upload,
  message,
  Popconfirm,
  Switch,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
  DeleteFilled,
} from "@ant-design/icons";

const { Column } = Table;

const initialData = [
  {
    key: "1",
    voucherId: 101,
    voucherName: "Holiday Discount",
    voucherDiscount: 15.0,
    storeId: 501,
    expiredDate: "2024-12-31",
    createdDate: "2024-10-01",
    isDeleted: false,
  },
  {
    key: "2",
    voucherId: 102,
    voucherName: "Winter Sale",
    voucherDiscount: 20.0,
    storeId: 502,
    expiredDate: "2024-11-30",
    createdDate: "2024-09-15",
    isDeleted: false,
  },
  {
    key: "3",
    voucherId: 103,
    voucherName: "Summer Offer",
    voucherDiscount: 10.0,
    storeId: 503,
    expiredDate: "2025-01-15",
    createdDate: "2024-08-20",
    isDeleted: false,
  },
];

const VoucherManagement = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [showDeleted, setShowDeleted] = useState(false); // Toggle for Recycle Bin

  const handleAddEditVoucher = (values) => {
    const newData = [
      ...data,
      { key: data.length + 1, isDeleted: false, ...values },
    ];
    setData(newData);
    setIsModalVisible(false);
    form.resetFields();
    message.success("Voucher added successfully!");
  };

  const handleSoftDelete = (voucherId) => {
    const updatedData = data.map((item) =>
      item.voucherId === voucherId ? { ...item, isDeleted: true } : item
    );
    setData(updatedData);
    message.success("Voucher moved to Recycle Bin!");
  };

  const handleRestore = (voucherId) => {
    const updatedData = data.map((item) =>
      item.voucherId === voucherId ? { ...item, isDeleted: false } : item
    );
    setData(updatedData);
    message.success("Voucher restored successfully!");
  };

  const handlePermanentDelete = (voucherId) => {
    const updatedData = data.filter((item) => item.voucherId !== voucherId);
    setData(updatedData);
    message.success("Voucher permanently deleted!");
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Filter based on Recycle Bin toggle
  const filteredData = showDeleted
    ? data.filter((item) => item.isDeleted)
    : data.filter((item) => !item.isDeleted);

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          >
            Add Voucher
          </Button>
          <Upload
            name="file"
            action="/upload"
            onChange={handleUpload}
            accept=".xls,.xlsx"
          >
            <Button icon={<UploadOutlined />}>Import Excel</Button>
          </Upload>
        </div>

        {/* Toggle for showing Recycle Bin */}
        <Switch
          checkedChildren={<DeleteOutlined />} 
          unCheckedChildren={<DeleteOutlined />}
          checked={showDeleted}
          onChange={setShowDeleted}
        />
      </div>

      <Table dataSource={filteredData} rowKey="voucherId">
        <Column title="Voucher ID" dataIndex="voucherId" key="voucherId" />
        <Column
          title="Voucher Name"
          dataIndex="voucherName"
          key="voucherName"
        />
        <Column
          title="Discount (%)"
          dataIndex="voucherDiscount"
          key="voucherDiscount"
        />
        <Column title="Store ID" dataIndex="storeId" key="storeId" />
        <Column title="Expiry Date" dataIndex="expiredDate" key="expiredDate" />
        <Column
          title="Created Date"
          dataIndex="createdDate"
          key="createdDate"
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              {!record.isDeleted ? (
                <>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to move this voucher to Recycle Bin?"
                    onConfirm={() => handleSoftDelete(record.voucherId)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </>
              ) : (
                <>
                  <Button
                    type="link"
                    icon={<RollbackOutlined />}
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleRestore(record.voucherId)}
                  >
                    Restore
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to permanently delete this voucher?"
                    onConfirm={() => handlePermanentDelete(record.voucherId)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="link"
                      icon={<DeleteFilled />}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete Permanently
                    </Button>
                  </Popconfirm>
                </>
              )}
            </Space>
          )}
        />
      </Table>

      {/* Modal for Adding/Editing Vouchers */}
      <Modal
        title="Add/Edit Voucher"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddEditVoucher} layout="vertical">
          <Form.Item
            name="voucherName"
            label="Voucher Name"
            rules={[{ required: true, message: "Please enter voucher name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="voucherDiscount"
            label="Discount (%)"
            rules={[{ required: true, message: "Please enter discount value" }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="storeId"
            label="Store ID"
            rules={[{ required: true, message: "Please enter store ID" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="expiredDate"
            label="Expiry Date"
            rules={[{ required: true, message: "Please select expiry date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsModalVisible(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default VoucherManagement;
