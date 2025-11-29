import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import useProductStore from "../store/useProductStore";

export default function ProductList() {
  // 从全局状态获取数据和方法
  const {
    filters,
    pagination,
    updateFilters,
    resetFilters,
    updatePagination,
    getCurrentPageProducts,
    getFilteredProducts
  } = useProductStore();

  // 获取当前页的商品和总数量
  const currentPageProducts = getCurrentPageProducts();
  const filteredProductsCount = getFilteredProducts().length;

  // 处理筛选条件变化
  const handleMinPriceChange = (value) => {
    updateFilters({ minPrice: value });
  };

  const handleMaxPriceChange = (value) => {
    updateFilters({ maxPrice: value });
  };

  const handleSortOrderChange = (value) => {
    updateFilters({ sortOrder: value });
  };

  // 处理分页变化
  const handlePageChange = (page, size) => {
    updatePagination({ currentPage: page, pageSize: size });
  };

  return (
    <div>
      <div className="filter-panel">
        <FilterPanel
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          sortOrder={filters.sortOrder}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onSortOrderChange={handleSortOrderChange}
          onReset={resetFilters}
        />
      </div>

      {/* 商品列表 */}
      <div className="card-grid">
        {currentPageProducts.length > 0 ? (
          currentPageProducts.map((p) => (
            <ProductCard key={`${p.id}-${p.specs?.[0] || 'default'}`} product={p} />
          ))
        ) : (
          <div style={{ 
            gridColumn: "1 / -1", 
            textAlign: "center", 
            padding: "50px 20px",
            backgroundColor: "#f9f9f9",
            borderRadius: 8
          }}>
            <h3>暂无符合条件的商品</h3>
          </div>
        )}
      </div>

      {/* 分页器 */}
      {filteredProductsCount > 0 && (
        <Pagination
          current={pagination.currentPage}
          pageSize={pagination.pageSize}
          total={filteredProductsCount}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}
