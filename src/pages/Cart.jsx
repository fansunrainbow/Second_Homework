import { useState, useEffect } from "react";
import { Card, Button, message, Empty, Table, Space, Typography } from "antd";
import useCartStore from "../store/useCartStore";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // 计算总价和总数量
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(total);
    setTotalQuantity(quantity);
  }, [cartItems]);

  // 处理删除商品
  const handleRemove = (item) => {
    removeFromCart(item.id, item.spec);
    message.success('已从购物车中移除该商品');
  };

  // 处理增加数量
  const handleIncrease = (item) => {
    addToCart(item);
    message.success('数量已增加');
  };

  // 处理减少数量
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      // 先删除一个，然后重新添加减少后的数量
      removeFromCart(item.id, item.spec);
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      addToCart(updatedItem);
      message.success('数量已减少');
    }
  };

  // 处理清空购物车
  const handleClearCart = () => {
    useCartStore.getState().clearCart();
    message.success('购物车已清空');
  };

  // 表格列配置
  const columns = [
    {
      title: '商品信息',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <img 
            src={record.image} 
            alt={name} 
            style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 10 }} 
          />
          <div>
            <Link to={`/products/${record.id}`}>{name}</Link>
            <div style={{ color: '#666', marginTop: 5 }}>规格: {record.spec || '默认'}</div>
          </div>
        </div>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <Space>
          <Button 
            size="small" 
            disabled={quantity <= 1} 
            onClick={() => handleDecrease(record)}
          >
            -
          </Button>
          <span>{quantity}</span>
          <Button 
            size="small" 
            onClick={() => handleIncrease(record)}
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: '小计',
      key: 'subtotal',
      render: (_, record) => `$${record.price * record.quantity}`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button 
          danger 
          onClick={() => handleRemove(record)}
          type="text"
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Card title="">
      <Title level={2}>购物车</Title>
      
      {cartItems.length === 0 ? (
        <Empty 
          description="您的购物车是空的"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <>
          <Table 
            columns={columns} 
            dataSource={cartItems} 
            rowKey={(record) => `${record.id}-${record.spec}`} 
            pagination={false}
            style={{ marginBottom: 20 }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Button 
                danger 
                onClick={handleClearCart}
              >
                清空购物车
              </Button>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 16, marginBottom: 10 }}>
                总计: {totalQuantity} 件商品
              </div>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#ff4d4f' }}>
                合计: ${totalAmount}
              </div>
              <Button 
                type="primary" 
                size="large" 
                style={{ marginTop: 10, backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
                onClick={() => message.info('结算功能即将开放，敬请期待！')}
              >
                结算
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
