import { Pagination as AntdPagination } from "antd";

const Pagination = ({ current, pageSize, total, onChange }) => {
  return (
    <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
      <AntdPagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger
        showTotal={(total) => `共 ${total} 条数据`}
        pageSizeOptions={["4", "8", "12"]}
      />
    </div>
  );
};

export default Pagination;