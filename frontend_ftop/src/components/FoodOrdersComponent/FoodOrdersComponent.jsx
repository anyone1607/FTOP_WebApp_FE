import React from 'react';
import { Table } from 'antd';
import { createStyles } from 'antd-style';

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
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
    fixed: 'left',
    width: 100,
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
    width: 100,
  },
  {
    title: 'Store ID',
    dataIndex: 'storeId',
    key: 'storeId',
    width: 100,
  },
  {
    title: 'Order Status',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    width: 120,
    render: (orderStatus) => (orderStatus ? 'Completed' : 'Pending'),
  },
  {
    title: 'Order Date',
    dataIndex: 'orderDate',
    key: 'orderDate',
    width: 180,
  },
  {
    title: 'Voucher ID',
    dataIndex: 'voucherId',
    key: 'voucherId',
    width: 100,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
    width: 150,
  },
  {
    title: 'Total Price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    width: 120,
    render: (totalPrice) => `$${totalPrice.toFixed(2)}`,
  },
  {
    title: 'Action',
    fixed: 'right',
    width: 90,
    render: () => <a href='/'>View</a>,
  },
];

const dataSource = [
  {
    key: '1',
    orderId: 101,
    userId: 1,
    storeId: 5,
    orderStatus: true,
    orderDate: '2024-10-22 12:34:56',
    voucherId: 15,
    note: 'Express delivery',
    totalPrice: 99.99,
  },
  {
    key: '2',
    orderId: 102,
    userId: 2,
    storeId: 3,
    orderStatus: false,
    orderDate: '2024-10-21 09:15:30',
    voucherId: null,
    note: 'Please call on arrival',
    totalPrice: 49.50,
  },
];

const FoodOrdersComponent = () => {
  const { styles } = useStyle();
  return (
    <Table
      bordered
      className={styles.customTable}
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
      pagination={false}
    />
  );
};

export default FoodOrdersComponent;
