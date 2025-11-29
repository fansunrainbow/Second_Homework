import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import 'antd/dist/reset.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Navbar />

      <Content style={{ padding: "20px", backgroundColor: "#fff", minHeight: "calc(100vh - 128px)" }}>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        My React Shop ©2025
      </Footer>
    </Layout>
  );
}

export default App;
