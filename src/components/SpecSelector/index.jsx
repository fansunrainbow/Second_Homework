import { Radio } from "antd";
import { useState } from "react";

const SpecSelector = ({ specs = [], onSelectSpec }) => {
  const [selectedSpec, setSelectedSpec] = useState(specs[0] || '');

  const handleSpecChange = (e) => {
    const value = e.target.value;
    setSelectedSpec(value);
    if (onSelectSpec) {
      onSelectSpec(value);
    }
  };

  // 添加调试信息
  console.log('Specs data:', specs);
  console.log('Specs length:', specs.length);

  if (specs.length === 0) {
    return <div style={{ padding: 20, backgroundColor: '#f5f5f5', borderRadius: 4 }}>暂无规格选项</div>;
  }

  return (
    <div style={{ 
      marginBottom: 30, 
      padding: 20, 
      backgroundColor: '#fff', 
      borderRadius: 8,
      border: '1px solid #f0f0f0'
    }}>
      <h4 style={{ 
        marginBottom: 16, 
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#333'
      }}>规格选择</h4>
      <Radio.Group 
        onChange={handleSpecChange} 
        value={selectedSpec}
        style={{ width: '100%' }}
      >
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {specs.map((spec, index) => (
            <Radio.Button 
              key={index} 
              value={spec}
              style={{
                padding: '8px 20px',
                fontSize: 16,
                border: '1px solid #d9d9d9',
                borderRadius: 4
              }}
            >
              {spec}
            </Radio.Button>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
};

export default SpecSelector;