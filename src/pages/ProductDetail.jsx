import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, message, Spin, Space } from "antd";
import useCartStore from "../store/useCartStore";
import { useState, useEffect } from "react";
import SpecSelector from "../components/SpecSelector";
import useProductStore from "../store/useProductStore";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getProductById = useProductStore((state) => state.getProductById);
  const [product, setProduct] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [inCart, setInCart] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  // 使用useEffect来处理异步加载
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      // 当找到商品后再设置默认规格
      if (foundProduct && foundProduct.specs && foundProduct.specs.length > 0) {
        setSelectedSpec(foundProduct.specs[0]);
      }
    }
  }, [id, getProductById]);

  // 检查商品是否已在购物车中
  useEffect(() => {
    if (product && selectedSpec) {
      const exists = cartItems.some(
        item => item.id === product.id && item.spec === selectedSpec
      );
      setInCart(exists);
    }
  }, [product, selectedSpec, cartItems]);

  // 处理加载状态
  if (id && !product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <Spin size="large" />
        <p style={{ marginTop: 20, fontSize: 16 }}>加载中...</p>
      </div>
    );
  }

  // 处理商品不存在的情况
  if (id && product === undefined) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ color: '#ff4d4f' }}>商品不存在</h2>
        <p style={{ margin: '20px 0' }}>您访问的商品可能已下架或不存在</p>
        <Button type="primary" href="/products">返回商品列表</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, spec: selectedSpec });
    message.success('成功加入购物车！');
    setInCart(true);
  };

  const handleViewCart = () => {
    // 导航到购物车页面
    navigate('/cart');
  };

  const handleIncreaseQuantity = () => {
    addToCart({ ...product, spec: selectedSpec });
    message.success('数量已增加！');
  };

  const handleSpecSelect = (spec) => {
    setSelectedSpec(spec);
  };

  return (
    <div>
      <Card>
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              md: '1fr 2fr',
              lg: '1fr 2fr'
            }, 
            gap: 30,
            alignItems: 'start'
          }}>
          {/* 商品图片 */}
          <div style={{ textAlign: 'center', padding: 10 }}>
            <img 
              alt={product.name} 
              src={product.image} 
              className="responsive-image"
              style={{ 
                maxWidth: '100%', 
                maxHeight: { xs: 300, md: 400 }, 
                objectFit: 'contain',
                borderRadius: 8
              }} 
            />
          </div>
          
          {/* 商品信息 */}
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>{product.name}</h1>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 32, color: '#ff4d4f', fontWeight: 'bold' }}>${product.price}</span>
              <span style={{ marginLeft: 20, color: '#666' }}>销量: {product.sales}</span>
            </div>
            
            {/* 规格选择器 */}
            <SpecSelector 
              specs={product.specs} 
              onSelectSpec={handleSpecSelect} 
            />
            
            {/* 购买按钮 */}
            <div style={{ marginTop: 30 }}>
              {inCart ? (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ marginBottom: 10, color: '#52c41a', fontSize: 16 }}>
                    该商品已在购物车中
                  </div>
                  <Space style={{ width: '100%' }}>
                    <Button 
                      type="primary" 
                      size="large" 
                      onClick={handleIncreaseQuantity}
                      className="responsive-button"
                      style={{ 
                        fontSize: { xs: 16, md: 18 }, 
                        padding: { xs: '8px 20px', md: '10px 30px' },
                        flex: 1,
                        marginRight: 10,
                        backgroundColor: '#faad14',
                        borderColor: '#faad14'
                      }}
                    >
                      增加数量
                    </Button>
                    <Button 
                      type="default" 
                      size="large" 
                      onClick={handleViewCart}
                      className="responsive-button"
                      style={{ 
                        fontSize: { xs: 16, md: 18 }, 
                        padding: { xs: '8px 20px', md: '10px 30px' },
                        flex: 1
                      }}
                    >
                      查看购物车
                    </Button>
                  </Space>
                </Space>
              ) : (
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={handleAddToCart}
                  className="responsive-button"
                  style={{ 
                    fontSize: { xs: 16, md: 18 }, 
                    padding: { xs: '8px 20px', md: '10px 40px' },
                    width: { xs: '100%', md: 'auto' },
                    backgroundColor: '#ff4d4f',
                    borderColor: '#ff4d4f'
                  }}
                >
                  加入购物车
                </Button>
              )}
            </div>
            
            {/* 商品描述 */}
            <div style={{ marginTop: 40, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
              <h3 style={{ marginBottom: 10 }}>商品描述</h3>
              <p style={{ lineHeight: 1.8, color: '#333' }}>{product.description}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
