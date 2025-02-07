import { Button, Input, Select } from "antd";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useFormReducer } from "../../hooks/useFormReducer";
import tabletopStyle from "./tabletop.module.scss";

type SelectChangeOptions =
  | {
      value: string;
      label: string;
    }
  | {
      value: string;
      label: string;
    }[]
  | undefined;

// 定义组件的 Props 类型
interface TabletopProps {
  // 这里是组件的属性
  style?: React.CSSProperties;
  leftTopInfo?: {
    leftFiledName: string;
    defaultValue?: string;
    placeholder?: string;
  };
  filterInfo?: {
    centerTitle: string;
    defaultValue?: string;
    onChange?: (value: string, option?: SelectChangeOptions) => void;
    option?: { value: string; label: string }[];
  };
  queryHandler?: (keyword: string, selectKeyword: string) => void;
  resetHandler?: () => void;
}

// 根据文件名生成组件
const TableTop: React.FC<TabletopProps> = ({
  style,
  leftTopInfo,
  filterInfo,
  queryHandler,
  resetHandler,
}) => {
  const { formState, handleChange, resetForm, updateField } =
    useFormReducer({
      keyword: leftTopInfo?.defaultValue ?? "",
      selectKeyword: filterInfo?.defaultValue ?? "",
    });
  const [loading,setLoading] = useState(false)
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e, "keyword");
    },
    [handleChange],
  );

  const filterHandler = useCallback(
    (value: string, options: SelectChangeOptions) => {
      if (filterInfo?.onChange) {
        filterInfo.onChange(value, options);
      } else {
        updateField("selectKeyword", value);
      }
    },
    [updateField, filterInfo],
  );

  const onResetHandler = useCallback(() => {
    if (resetHandler) resetHandler();
    resetForm();
  }, [resetHandler, resetForm, ]);

  const onQueryHanlder = useCallback(()=>{
    setLoading(true)
    if(queryHandler) queryHandler(formState.keyword, formState.selectKeyword);
    setLoading(false)
  },[queryHandler,setLoading,formState])

  return (
    <div className={tabletopStyle["tabletop-Container"]} style={style}>
      {leftTopInfo && (
        <div className={tabletopStyle["tabtop-section-left"]}>
          <span
            style={{
              height: "22px",
              fontSize: "14px",
              color: "rgba(0,0,0,0.88)",
              lineHeight: "22px",
            }}
          >
            {leftTopInfo.leftFiledName}:
          </span>
          <Input
            style={{
              marginLeft: "10px",
              width: "283px",
              height: "32px",
              borderRadius: "2px",
              background: "#ffffff",
              border: "1px solid #d9d9d9",
            }}
            name="keyword"
            onChange={changeHandler}
            placeholder={leftTopInfo.placeholder}
            value={formState.keyword}
          ></Input>
        </div>
      )}
      {filterInfo && (
        <div className={tabletopStyle["tabtop-section-center"]}>
          <span
            style={{
              height: "22px",
              fontSize: "14px",
              color: "rgba(0,0,0,0.88)",
              marginRight: "10px",
              lineHeight: "22px",
            }}
          >
            {filterInfo.centerTitle}
          </span>
          <Select
            defaultValue={filterInfo.defaultValue}
            value={formState.selectKeyword}
            options={filterInfo.option}
            style={{ width: "283px" }}
            onChange={filterHandler}
          ></Select>
        </div>
      )}
      <div className={tabletopStyle["tabtop-section-right"]}>
        <Button
          type="default"
          style={{
            border: "#d9d9d9 1px soild",
            boxShadow: "0 2px 0 0 rgba(0,0,0,0.02)",
            width: "64px",
            height: "32px",
            font: "14px",
            color: "rgba(0,0,0,0.88)",
            marginRight: "10px",
          }}
          onClick={onResetHandler}
        >
          重置
        </Button>
        <Button
          type="default"
          loading={loading}
          style={{
            border: "#d9d9d9 1px soild",
            boxShadow: "0 2px 0 0 rgba(0,0,0,0.02)",
            width: "64px",
            height: "32px",
            font: "14px",
            color: "#fff",
            backgroundColor: "#1890ff",
          }}
          onClick={onQueryHanlder}
        >
          查询
        </Button>
      </div>
    </div>
  );
};

export default TableTop;
