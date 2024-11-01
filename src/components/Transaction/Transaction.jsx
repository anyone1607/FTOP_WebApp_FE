import React from 'react';
import { Table, Tooltip, Button, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const columns = [
  {
    title: 'Transfer User ID',
    dataIndex: 'transferUserId',
    key: 'transferUserId',
    render: (text) => <a href='/'>{text}</a>,
    width: 150,
  },
  {
    title: 'Receive User ID',
    dataIndex: 'receiveUserId',
    key: 'receiveUserId',
    width: 150,
  },
  {
    title: 'Transaction Date',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
    render: (date) => new Date(date).toLocaleString(),
    width: 150,
  },
  {
    title: 'Transaction Amount',
    dataIndex: 'transactionAmount',
    key: 'transactionAmount',
    render: (amount) => `$${amount.toFixed(2)}`,
    width: 150,
  },
  {
    title: 'Description',
    dataIndex: 'transactionDescription',
    key: 'transactionDescription',
    ellipsis: {
      showTitle: false,
    },
    render: (description) => (
      <Tooltip placement="topLeft" title={description}>
        {description}
      </Tooltip>
    ),
    width: 200,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (status ? 'Completed' : 'Pending'),
    width: 100,
  },
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
    width: 100,
  },
];


const data = [
  {
    key: '1',
    transferUserId: 1,
    receiveUserId: 2,
    transactionDate: '2024-10-20T10:00:00Z',
    transactionAmount: 50.00,
    transactionDescription: 'Payment for services rendered',
    status: true,
    orderId: 101,
  },
  {
    key: '2',
    transferUserId: 2,
    receiveUserId: 3,
    transactionDate: '2024-10-21T12:30:00Z',
    transactionAmount: 75.00,
    transactionDescription: 'Refund for order cancellation',
    status: false,
    orderId: 102,
  },
  {
    key: '3',
    transferUserId: 1,
    receiveUserId: 3,
    transactionDate: '2024-10-22T09:15:00Z',
    transactionAmount: 100.00,
    transactionDescription: 'Purchase of goods',
    status: true,
    orderId: 103,
  },
];

const Transaction = () => {
  return (
    <>
      <Upload
            name="file"
            action="/upload"
            // onChange={handleUpload}
            accept=".xls,.xlsx"
          >
            <Button icon={<DownloadOutlined />}>Export Excel</Button>
          </Upload>
      <Table columns={columns} dataSource={data} rowKey="key" />
    </>
  );
};

export default Transaction;
