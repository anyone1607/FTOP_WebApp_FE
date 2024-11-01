import React from "react";
import { Table, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
          }
        }
      }
    `,
  };
});

const columns = [
  {
    title: "Product ID",
    dataIndex: "productId",
    key: "productId",
    fixed: "left",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Product Price",
    dataIndex: "productPrice",
    key: "productPrice",
    sorter: (a, b) => a.productPrice - b.productPrice,
  },
  {
    title: "Category ID",
    dataIndex: "categoryId",
    key: "categoryId",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (status ? "Active" : "Inactive"),
  },
  // {
  //   title: "Store ID",
  //   dataIndex: "storeId",
  //   key: "storeId",
  //   width: 100,
  // },
];

const dataSource = Array.from({ length: 100 }).map((_, i) => ({
  key: i,
  productId: i + 1,
  productName: `Product ${i + 1}`,
  productPrice: (i + 1) * 10,
  categoryId: Math.floor(Math.random() * 5) + 1,
  status: i % 2 === 0,
  storeId: Math.floor(Math.random() * 10) + 1,
}));

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const ProductComponent = () => {
  const { styles } = useStyle();
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Import Excel</Button>
      </Upload>
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        bordered
        size="middle"
        scroll={{
          x: "calc(700px + 50%)",
          y: 47 * 5,
        }}
      />
    </>
  );
};

export default ProductComponent;
