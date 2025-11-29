import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Typography } from "antd";
import useProductStore from "../store/useProductStore";

const { Title, Paragraph, Text } = Typography;

// 商品分类数据
const categories = [
  { id: 1, name: "电子产品", icon: "📱" },
  { id: 2, name: "服装鞋帽", icon: "👕" },
  { id: 3, name: "家居生活", icon: "🏠" },
  { id: 4, name: "美妆个护", icon: "💄" },
  { id: 5, name: "食品生鲜", icon: "🍎" },
  { id: 6, name: "运动户外", icon: "⚽" },
];

export default function Home() {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  
  // 获取销量最高的4个商品作为推荐
  const topProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* 横幅区域 */}
      <div style={{ 
        backgroundColor: "#1890ff", 
        color: "white", 
        padding: "60px 30px", 
        textAlign: "center",
        marginBottom: "40px",
        borderRadius: "8px"
      }}>
        <Title level={1}>欢迎来到我的电商平台</Title>
        <Paragraph style={{ fontSize: "18px", marginBottom: "30px" }}>
          发现优质商品，享受便捷购物体验
        </Paragraph>
        <Button 
          type="primary" 
          size="large"
          style={{ fontSize: "16px", padding: "10px 40px" }}
          onClick={() => navigate("/products")}
        >
          立即选购
        </Button>
      </div>

      {/* 分类导航 */}
      <Title level={2}>商品分类</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: "40px" }}>
        {categories.map((category) => (
          <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
            <Card 
              hoverable 
              onClick={() => navigate("/products")}
              style={{ cursor: "pointer", height: "100%" }}
            >
              <div style={{ textAlign: "center", fontSize: "40px", marginBottom: "10px" }}>
                {category.icon}
              </div>
              <div style={{ textAlign: "center", fontSize: "16px" }}>
                {category.name}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 热销推荐 */}
      <Title level={2}>热销推荐</Title>
      <Row gutter={[16, 16]}>
        {topProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              onClick={() => navigate(`/products/${product.id}`)}
              style={{ cursor: "pointer", height: "100%" }}
            >
              <Card.Meta 
                title={product.name} 
                description={
                  <div>
                    <Text strong style={{ color: "#ff4d4f", fontSize: "18px" }}>
                      ${product.price}
                    </Text>
                    <Text style={{ marginLeft: "10px", color: "#666" }}>
                      销量: {product.sales}
                    </Text>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
