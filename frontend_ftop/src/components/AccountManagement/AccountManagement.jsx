import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
const items = [
  {
    key: '1',
    label: 'Ban User',
  },
  {
    key: '2',
    label: 'Delete User',
  },
];
const expandDataSource = Array.from({
  length: 3,
}).map((_, i) => ({
  key: i.toString(),
  name: 'Store Onwer',
  password: 'iOS',
  email: '10.3.4.5654',
  phone: 500,
  role: 'Jack',
  walletBalance: '2014-12-24 23:12:00',
}));
const dataSource = Array.from({
  length: 3,
}).map((_, i) => ({
  key: i.toString(),
  totalUser: 1000,
  totalRevenue: 2000,
  totalOrder: 2500,
}));
const expandColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: 'E-Mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Wallet Balance',
    dataIndex: 'walletBalance',
    key: 'walletBalance',
  },
  {
    title: 'Status',
    key: 'state',
    render: () => <Badge status="success" text="Active" />,
  },
  {
    title: 'Action',
    key: 'operation',
    render: () => (
      <Space size="middle">
        <a href='/'>View</a>
        <a href='/'>Soft Delete</a>
        <Dropdown
          menu={{
            items,
          }}
        >
          <a href='/'>
            More <DownOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];
const columns = [
  {
    title: 'Tổng User',
    dataIndex: 'totalUser',
    key: 'totalUser',
  },
  {
    title: 'Tổng Doanh Thu',
    dataIndex: 'totalRevenue',
    key: 'totalRevenue',
  },
  {
    title: 'Tổng Đơn Hàng',
    dataIndex: 'totalOrder',
    key: 'totalOrder',
  },
  // {
  //   title: 'Phone',
  //   dataIndex: 'phone',
  //   key: 'phone',
  // },
  // {
  //   title: 'Role',
  //   dataIndex: 'role',
  //   key: 'role',
  // },
  // {
  //   title: 'WalletBalance',
  //   dataIndex: 'walletBalance',
  //   key: 'walletBalance',
  // },
  {
    title: 'Position',
    key: 'operation',
    render: () => <a href='/'>Staff, Manage, Owner</a>,
  },
];
const expandedRowRender = () => (
  <Table columns={expandColumns} dataSource={expandDataSource} pagination={false} />
);
const AccountManagement = () => (
  <>
    <Table
      columns={columns}
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: ['0'],
      }}
      dataSource={dataSource}
    />
  </>
);
export default AccountManagement;