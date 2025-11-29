import { Card, Button, message, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { useState, useEffect } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const [inCart, setInCart] = useState(false);
  
  // 检查商品是否已在购物车中
  useEffect(() => {
    if (product) {
      const exists = cartItems.some(
        item => item.id === product.id && item.spec === (product.specs?.[0] || "")
      );
      setInCart(exists);
    }
  }, [product, cartItems]);

  return (
    <Card
      hoverable
      style={{ 
        width: '100%', 
        minWidth: 0, // 防止内容溢出
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      cover={
        <div style={{ padding: 10 }}>
          <img 
            alt={product.name} 
            src={product.image} 
            style={{ 
              width: '100%', 
              height: 180, 
              objectFit: 'contain',
              maxWidth: '100%'
            }} 
          />
        </div>
      }
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div>
        <Card.Meta 
          title={
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {product.name}
            </div>
          } 
          description={
            <div>
              <span style={{ color: '#ff4d4f', fontSize: '18px', fontWeight: 'bold' }}>
                ${product.price}
              </span>
              <span style={{ marginLeft: 10, color: '#666', fontSize: '12px' }}>
                销量: {product.sales}
              </span>
            </div>
          } 
        />
      </div>
      <Button
        type="primary"
        style={{ 
          marginTop: 10, 
          width: '100%',
          padding: '6px 0',
          fontSize: '14px'
        }}
        onClick={(e) => {
          e.stopPropagation();
          addToCart({ ...product, spec: product.specs?.[0] || "" });
          setInCart(true);
          message.success(inCart ? '数量已增加！' : '成功加入购物车！');
        }}
      >
        {inCart ? (
          <Tooltip title="该商品已在购物车中，点击增加数量">
            <span>增加数量</span>
          </Tooltip>
        ) : (
          '加入购物车'
        )}
      </Button>
    </Card>
  );
}
