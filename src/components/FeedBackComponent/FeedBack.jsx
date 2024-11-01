import React from 'react';
import { Space, Table, Tag, Rate } from 'antd';

const { Column } = Table;

const data = [
  {
    key: '1',
    reviewId: 101,
    reviewDescription: 'Great service!',
    userId: 1,
    stars: 5,
    storeId: 501,
    tags: ['excellent', 'friendly'],
  },
  {
    key: '2',
    reviewId: 102,
    reviewDescription: 'Not satisfied with the product quality.',
    userId: 2,
    stars: 2,
    storeId: 502,
    tags: ['poor'],
  },
  {
    key: '3',
    reviewId: 103,
    reviewDescription: 'Average experience.',
    userId: 3,
    stars: 3,
    storeId: 503,
    tags: ['average'],
  },
];

const FeedBack = () => (
  <Table dataSource={data} rowKey="reviewId">
    <Column title="Review ID" dataIndex="reviewId" key="reviewId" />
    <Column title="Description" dataIndex="reviewDescription" key="reviewDescription" />
    <Column title="User ID" dataIndex="userId" key="userId" />
    <Column
      title="Stars"
      dataIndex="stars"
      key="stars"
      render={(stars) => <Rate disabled defaultValue={stars} />}
    />
    <Column title="Store ID" dataIndex="storeId" key="storeId" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'poor') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a href={`/invite/${record.userId}`}>Invite User {record.userId}</a>
          <a href={`/delete/${record.reviewId}`}>Delete</a>
        </Space>
      )}
    />
  </Table>
);

export default FeedBack;
