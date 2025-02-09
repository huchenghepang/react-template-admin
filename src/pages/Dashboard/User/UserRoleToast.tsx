import { Modal } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TreeSelectComponent, { TreeData, TreeDataList } from "../../../components/TreeSelect/TreeSelect";
import { RootDispatch, RootState } from "../../../store";
import { fetchRolesInfoData } from "../../../store/slices/roleSlice";



interface UserRoleModalModalProps {
  visible: boolean;
  onClose: () => void;
  defaultValue?:(number | string) [] ;
  onSubmit: (selectedValue: (number|string)[]) => void;
}

const UserRoleModal: React.FC<UserRoleModalModalProps> = ({
  visible =false,
  onClose,
  defaultValue = [],
  onSubmit,
}) => {
  const [selectedValue, setSelectedValue] = useState<(number|string)[]>(defaultValue);
  /* 从redux中拿数据 */
  const roleStatus = useSelector((state: RootState) => state.role.status); 
    const rolesInfo = useSelector((state: RootState) => state.role.roles);
//   const [treeData,setTreeData] = useState<TreeData>()
  const dispatch = useDispatch<RootDispatch>();
  useEffect(() => {
    if (roleStatus !== "succeeded") {
      console.log("执行");
      void dispatch(fetchRolesInfoData());
    }
  }, [roleStatus,dispatch]);

  useEffect(()=>{
    setSelectedValue(defaultValue)},[defaultValue])
  // 选中值变化时的回调
  const handleChange = (value: (string|number)[]) => {
    setSelectedValue(value);
  };

 const treeData = useMemo<TreeDataList|undefined>(()=>{
    return rolesInfo?.map<TreeData>((roleInfo) => {
      return  {title:roleInfo.role_name,value:roleInfo.role_id};
    });
 },[rolesInfo])

  const handleOk = () => {
    onSubmit(selectedValue); // 将选中的值传递给父组件
    onClose(); // 关闭弹出框
  };

  const handleCancel = () => {
    onClose(); // 关闭弹出框
  };
    useEffect(() => {
      if (visible) {
        document.body.style.overflow = "auto"; // 不禁用滚动条
      } 
    }, [visible]);

  return (
    <Modal
      title="分配角色和权限"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确定"
      cancelText="取消"
      width={600}
    >
      <TreeSelectComponent
        treeData={treeData}
        value={selectedValue}
        onChange={handleChange}
        placeholder="请选择角色或权限"
      />
    </Modal>
  );
};

export default UserRoleModal;
