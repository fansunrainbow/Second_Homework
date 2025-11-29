import { Link } from "react-router-dom";
import { Menu, Badge } from "antd";
import useCartStore from "../../store/useCartStore";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{ lineHeight: '64px', background: '#001529' }}
      items={[
        { key: "1", label: <Link to="/">首页</Link> },
        { key: "2", label: <Link to="/products">商品列表</Link> },
        { 
          key: "3", 
          label: (
            <Link to="/cart" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              购物车
              {totalQuantity > 0 && (
                <Badge count={totalQuantity} style={{ marginLeft: 8, backgroundColor: '#ff4d4f' }} />
              )}
            </Link>
          ), 
          style: { marginLeft: 'auto' }
        },
      ]}
    />
  );
}
