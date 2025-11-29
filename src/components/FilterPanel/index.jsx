import { Select, InputNumber, Button, Row, Col } from "antd";

const FilterPanel = ({ minPrice, maxPrice, sortOrder, onMinPriceChange, onMaxPriceChange, onSortOrderChange, onReset }) => {
  return (
    <div style={{ 
      marginBottom: 20, 
      padding: 15,
      backgroundColor: '#f5f5f5',
      borderRadius: 8
    }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={16} lg={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14 }}>价格筛选：</span>
            <InputNumber
              min={0}
              value={minPrice}
              onChange={onMinPriceChange}
              placeholder="最小价"
              style={{ width: { xs: '100%', sm: 100 } }}
            />
            <span style={{ fontSize: 14 }}>-</span>
            <InputNumber
              min={0}
              value={maxPrice}
              onChange={onMaxPriceChange}
              placeholder="最大价"
              style={{ width: { xs: '100%', sm: 100 } }}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Select
              value={sortOrder}
              onChange={onSortOrderChange}
              style={{ width: 'flex: 1', minWidth: 120 }}
              options={[
                { value: "asc", label: "价格升序" },
                { value: "desc", label: "价格降序" },
                { value: "sales", label: "销量优先" }
              ]}
            />
            <Button 
              onClick={onReset}
              className="responsive-button"
            >
              重置
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FilterPanel;
