import React, { useState } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Store ID',
    dataIndex: 'storeId',
    key: 'storeId',
  },
  {
    title: 'Store Name',
    dataIndex: 'storeName',
    key: 'storeName',
  },
  {
    title: 'Store Address',
    dataIndex: 'storeAddress',
    key: 'storeAddress',
  },
  {
    title: 'Store Phone',
    dataIndex: 'storePhone',
    key: 'storePhone',
  },
  {
    title: 'Owner ID',
    dataIndex: 'ownerId',
    key: 'ownerId',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (status ? 'Active' : 'Inactive'),
  },
];

const dataSource = Array.from({ length: 46 }).map((_, i) => ({
  key: i,
  storeId: i + 1,
  storeName: `Store ${i + 1}`,
  storeAddress: `Address ${i + 1}`,
  storePhone: `0123456789${i}`,
  ownerId: i + 100,
  status: i % 2 === 0,
}));

const StoreManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('Selected Row Keys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />;
};

export default StoreManagement;
