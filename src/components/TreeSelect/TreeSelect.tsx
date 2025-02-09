import { TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import TreeSelectStyle from "./TreeSelect.module.scss";


export type TreeData  = { title: string; value: string | number; children?: any[] };
export type TreeDataList  = { title: string; value: string | number; children?: any[] }[];
interface TreeSelectProps {
  treeData: TreeDataList | undefined; // 树形数据
  value?: (number|string)[]; // 当前选中的值
  onChange: (value: (number|string)[]) => void; // 选中值变化时的回调
  placeholder?: string; // 默认占位符
}

const TreeSelectComponent: React.FC<TreeSelectProps> = ({
  treeData,
  value,
  onChange,
  placeholder = "请选择",
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (newValue: (number|string)[]) => {
    setSelectedValue(newValue);
    onChange(newValue); // 调用外部传入的 onChange 回调
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [setSelectedValue,value]);

  return (
    <div className={TreeSelectStyle["TreeSelect-Container"]}>
      {treeData && (
        <TreeSelect
          value={selectedValue}
          defaultValue={value}
          onChange={handleChange}
          treeData={treeData}
          placeholder={placeholder}
          treeDefaultExpandAll
          style={{ width: "100%" }}
          multiple
        />
      )}
    </div>
  );
};

TreeSelectComponent.displayName = "TreeSelectComponent";

export default TreeSelectComponent;
