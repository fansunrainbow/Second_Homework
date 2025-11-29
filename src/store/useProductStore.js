import { create } from "zustand";

// 统一的商品数据
const initialProducts = [
  { id: 1, name: "商品 A", price: 99, image: "https://via.placeholder.com/240", sales: 120, specs: ["红色", "蓝色"], description: "这是一个高品质的商品，经久耐用，深受用户喜爱。" },
  { id: 2, name: "商品 B", price: 199, image: "https://via.placeholder.com/240", sales: 350, specs: ["黑色", "白色"], description: "采用最新技术制造，外观精美，功能强大。" },
  { id: 3, name: "商品 C", price: 299, image: "https://via.placeholder.com/240", sales: 89, specs: ["大码", "中码", "小码"], description: "舒适透气，适合各种场合使用。" },
  { id: 4, name: "商品 D", price: 399, image: "https://via.placeholder.com/240", sales: 220, specs: ["标准版", "豪华版"], description: "性价比极高，是您的明智之选。" },
  { id: 5, name: "商品 E", price: 499, image: "https://via.placeholder.com/240", sales: 156, specs: ["32GB", "64GB", "128GB"], description: "大容量存储，满足您的各种需求。" },
  { id: 6, name: "商品 F", price: 599, image: "https://via.placeholder.com/240", sales: 42, specs: ["大号", "中号", "小号"], description: "精工制作，细节处理到位。" },
  { id: 7, name: "商品 G", price: 699, image: "https://via.placeholder.com/240", sales: 280, specs: ["标准版", "专业版"], description: "专业级性能，满足专业人士需求。" },
  { id: 8, name: "商品 H", price: 799, image: "https://via.placeholder.com/240", sales: 95, specs: ["红色", "绿色", "蓝色"], description: "限量版设计，彰显独特品味。" },
];

const useProductStore = create((set, get) => ({
  // 商品数据
  products: initialProducts,
  
  // 筛选条件
  filters: {
    minPrice: 0,
    maxPrice: 1000,
    sortOrder: "asc",
    category: "all"
  },
  
  // 分页信息
  pagination: {
    currentPage: 1,
    pageSize: 4
  },
  
  // 更新筛选条件
  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, currentPage: 1 } // 筛选条件改变时重置到第一页
    }));
  },
  
  // 重置筛选条件
  resetFilters: () => {
    set({
      filters: {
        minPrice: 0,
        maxPrice: 1000,
        sortOrder: "asc",
        category: "all"
      },
      pagination: {
        currentPage: 1,
        pageSize: 4
      }
    });
  },
  
  // 更新分页信息
  updatePagination: (newPagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...newPagination }
    }));
  },
  
  // 获取筛选后的商品
  getFilteredProducts: () => {
    const { products, filters } = get();
    
    return products
      .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
      .sort((a, b) => {
        if (filters.sortOrder === "asc") return a.price - b.price;
        if (filters.sortOrder === "desc") return b.price - a.price;
        if (filters.sortOrder === "sales") return b.sales - a.sales;
        return 0;
      });
  },
  
  // 获取当前页的商品
  getCurrentPageProducts: () => {
    const { getFilteredProducts, pagination } = get();
    const filteredProducts = getFilteredProducts();
    const { currentPage, pageSize } = pagination;
    
    return filteredProducts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  },
  
  // 获取商品详情
  getProductById: (id) => {
    const { products } = get();
    return products.find(p => p.id === Number(id));
  }
}));

export default useProductStore;