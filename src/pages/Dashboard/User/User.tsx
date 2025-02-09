import {
  Avatar,
  Form,
  Input,
  Modal,
  Popconfirm,
  PopconfirmProps,
  Radio,
  RadioChangeEvent,
  Space,
  Switch,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
  Tooltip,
} from "antd";

import { PaginationProps } from "antd/lib";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../../components/button/Button";
import TimeFormatter from "../../../components/formatdatetime/FormatDatetime";
import { showMessage } from "../../../components/message/MessageManager";
import TableTop from "../../../components/Table/tabletop";
import { RoleINFO, UserList } from "../../../interface/response/admin.r";
import { registerAddSchema } from "../../../schema/user";
import { validate } from "../../../schema/validate";
import {
  reqAddUser,
  reqAssignUserRoles,
  reqChangeUserStatus,
  reqDeleteUser,
  reqUsersRolesInfo,
} from "../../../serices/api/admin";
import UserStyle from "./User.module.scss";
import UserRoleModal from "./UserRoleToast";

// 定义组件的 Props 类型
interface UserProps {
  // 这里是组件的属性
}

type FieldType = {
  account: string;
  password: string;
};

const options: { value: string; label: string }[] = [
  { value: "你好", label: "hao " },
  { value: "你好1", label: "haoa " },
  { value: "你好2", label: "haoaa " },
];

/* 分页配置 */

/* 记录总记录数信息 */
const showTotal: PaginationProps["showTotal"] = (total) => `共 ${total} 条记录`;

/* 是否默认展开 */
const defaultExpandable: ExpandableConfig<UserList> = {
  expandedRowRender: (record: UserList) => <p>{record.role}</p>,
};

/* 默认标题和脚注 */
const defaultTitle = () => "用户信息表";
const defaultFooter = () => "脚注：管理员管理用户信息";

/* 通用配置 表格类型*/

// 表格大小
type SizeType = TableProps["size"];

type ExpandableConfig<T extends object> = TableProps<T>["expandable"];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

// 根据文件名生成组件
const User: React.FC<UserProps> = () => {
  const [userList, setUserList] = useState<UserList[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 0,
  });
  const getUserInfo = useCallback(
    async (pagination: { page: number; limit: number }) => {
      try {
        const { success, data, errorMessage } =
          await reqUsersRolesInfo(pagination);
        if (!success)
          return showMessage({
            type: "error",
            text: errorMessage || "获取用户信息失败",
          });
        showMessage({ type: "success", text: "获取用户信息成功" });
        setUserList(data.userList);
        setPagination(data.pagination);
      } catch (error) {
        showMessage({ type: "error", text: "获取用户信息出错" });
        console.log(error);
      }
    },
    [],
  );

  /* 分配用户角色 */
  const AssignUserRolesReq = useCallback(
    async (params: AssignUserRoles) => {
      try {
        const { success, errorMessage, message } =
          await reqAssignUserRoles(params);
        if (!success)
          return showMessage({
            type: "error",
            text: errorMessage || "分配角色失败",
          });
        void getUserInfo({ page: pagination.page, limit: pagination.limit });
        showMessage({
          type: "success",
          text: message || "分配用户角色成功",
        });
      } catch (error) {
        showMessage({ type: "error", text: "分配用户角色出错" });
        console.log(error);
      }
    },
    [getUserInfo, pagination],
  );
  useEffect(() => {
    void getUserInfo({ page: pagination.page, limit: pagination.limit });
  }, []);
  const [dafaultSelectedRolevalue, setDafaultSelectedRolevalue] = useState<
    number[]
  >([]);
  // 提交表单
  const handleSubmit = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const values: FieldType = userForm.getFieldsValue();
      const { valid, errors } = await validate(registerAddSchema, values);
      if (!valid) {
        errors.map((error) => {
          showMessage({ type: "error", text: error.message });
        });
        return;
      }

      /* 发起添加用户的请求 */
      const { success, errorMessage, message } = await reqAddUser(values);
      if (!success)
        return showMessage({
          type: "error",
          text: errorMessage || "添加用户失败",
        });
      showMessage({ type: "success", text: message || "添加用户成功" });
      handleClose();
      return getUserInfo(pagination);
    } catch {
      showMessage({ type: "error", text: "表单验证错误" });
    }
  };

  /* 删除用户 */
  const deleteUser = useCallback(
    async (userId: string) => {
      try {
        const { errorMessage, success, message } = await reqDeleteUser({
          userId,
        });
        if (!success)
          return showMessage({
            type: "error",
            text: errorMessage || "删除用户失败",
          });
        showMessage({ type: "success", text: message || "删除用户成功" });
        const newPage =
          pagination.page > 1 && userList.length === 1
            ? pagination.page - 1
            : pagination.page;
        setPagination({ ...pagination, page: newPage });
        await getUserInfo({ page: newPage, limit: pagination.limit });
      } catch {
        showMessage({ type: "error", text: "删除用户错误" });
      }
    },
    [getUserInfo, pagination, userList],
  );
  /* 重置密码 */
  const ResetUserPassword = useCallback(
    async (userId: string) => {
      try {
        const { success } = await reqChangeUserStatus({
          userId,
          type: "password",
        });
        if (!success)
          return showMessage({
            type: "error",
            text: "重置密码失败",
          });
        showMessage({ type: "success", text: "重置密码成功" });

        await getUserInfo({
          page: pagination.page,
          limit: pagination.limit,
        });
      } catch {
        showMessage({ type: "error", text: "重置密码错误" });
      }
    },
    [getUserInfo, pagination],
  );

  const [currentUserId, setCurrentUserId] = useState<string>();
  /* 点击分配用户角色 */
  const assignUserRoles = useCallback((userId: string, roles: RoleINFO[]) => {
    setCurrentUserId(userId);
    const defaultValue: number[] = [];
    roles.forEach((role) => {
      if (role?.roleId) {
        defaultValue.push(role?.roleId);
      }
    });
    setDafaultSelectedRolevalue(defaultValue);
    setShowUserRoleToToast(true);
  }, []);
  /* 展示的表格列 */
  const columns: TableColumnsType<UserList> = useMemo(
    () => [
      {
        dataIndex: "user_id",
        key: "user_id",
        title: "用户ID",
        ellipsis: true,
        render(user_id: string) {
          return (
            <Tooltip placement="topLeft" title={user_id}>
              {user_id}
            </Tooltip>
          );
        },
      },
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
        ellipsis: {
          showTitle: false,
        },
        render(value: string) {
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      },
      {
        title: "账号",
        dataIndex: "account",
        key: "account",
        ellipsis: true,
        render(value: string) {
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: "avatar",
        title: "头像",
        key: "avatar",
        render: (value: string) => {
          return <Avatar src={value} />;
        },
      },
      {
        dataIndex: "email",
        title: "邮箱",
        key: "email",
        ellipsis: true,
        render(value: string) {
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: "signature",
        key: "signature",
        title: "个性签名",
        ellipsis: true,
        render(value: string) {
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: "is_delete",
        key: "is_delete",
        title: "是否删除",
        render(value) {
          return (
            <span>
              {value ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>}
            </span>
          );
        },
      },
      {
        dataIndex: "is_login",
        key: "is_login",
        title: "是否登录",
        render(value) {
          return (
            <span>
              {value ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>}
            </span>
          );
        },
      },
      {
        dataIndex: "register_datetime",
        key: "register_datetime",
        title: "注册时间",
        render(value: Date) {
          return (
            <TimeFormatter
              time={value}
              format="YYYY-MM-DD HH:mm:ss"
            ></TimeFormatter>
          );
        },
      },
      {
        dataIndex: "roles",
        key: "roles",
        title: "角色",
        render: (value: RoleINFO[]) => {
          return (
            <>
              {value && value[0] ? (
                value.map((roleinfo) => {
                  return <Tag key={roleinfo?.roleId}>{roleinfo?.roleName}</Tag>;
                })
              ) : (
                <Tag>暂无</Tag>
              )}
            </>
          );
        },
      },
      {
        title: "操作",
        key: "action",
        render(value, record) {
          const confirmDelete: PopconfirmProps["onConfirm"] = () => {
            void deleteUser(record.user_id);
          };

          const cancelDelete: PopconfirmProps["onCancel"] = (e) => {
            console.log(e);
          };
          const confirmReset: PopconfirmProps["onConfirm"] = () => {
            void ResetUserPassword(record.user_id);
          };

          const cancelReset: PopconfirmProps["onCancel"] = (e) => {
            console.log(e);
          };

          return (
            <Space size="small">
              <Popconfirm
                title="删除用户"
                placement="topLeft"
                description="确定要删除该用户吗"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                okText="是的"
                cancelText="不了"
              >
                <Button
                  size="mini"
                  type="dashed"
                  styles={{ backgroundColor: "#f98181" }}
                >
                  删除
                </Button>
              </Popconfirm>
              <Popconfirm
                title="重置密码"
                placement="topLeft"
                description="确定要该用户的密码吗"
                onConfirm={confirmReset}
                onCancel={cancelReset}
                okText="是的"
                cancelText="不了"
              >
                <Button
                  size="mini"
                  type="dashed"
                  styles={{ backgroundColor: "#98eca1" }}
                >
                  重置
                </Button>
              </Popconfirm>

              <Button
                size="mini"
                type="dashed"
                onClick={() => assignUserRoles(record.user_id, record.roles)}
                styles={{ backgroundColor: "green", color: "#ccc" }}
              >
                分配角色
              </Button>
            </Space>
          );
        },
        width: 200,
        fixed: "left",
      },
    ],
    [deleteUser, ResetUserPassword, assignUserRoles],
  );

  /* 表格配置 */
  /* 是否显示边框 */
  const [bordered, setBordered] = useState(false);
  /* 是否加载中 */
  const [loading, setLoading] = useState(false);
  /* 切换大小 */
  const [size, setSize] = useState<SizeType>("large");
  /* 切换展开 */
  const [expandable, setExpandable] =
    useState<ExpandableConfig<UserList>>(defaultExpandable);
  /* 是否显示标题 */
  const [showTitle, setShowTitle] = useState(false);
  /* 是否设置表头 */
  const [showHeader, setShowHeader] = useState(true);
  /* 是否显示标注 */
  const [showFooter, setShowFooter] = useState(true);
  /* 是否可选行记录 */
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<UserList> | undefined
  >({});
  /* 表格的布局 */
  const [tableLayout, setTableLayout] = useState<string>("unset");

  /* 内容超过列宽自动省略 */
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>("unset");

  /* 是否启动边框 */
  const handleBorderChange = (enable: boolean) => {
    setBordered(enable);
  };

  /* 是否启动加载中 */
  const handleLoadingChange = (enable: boolean) => {
    setLoading(enable);
  };

  /* 改变表格大小 */
  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value as SizeType);
  };

  /* 改变表格的布局 */
  const handleTableLayoutChange = (e: RadioChangeEvent) => {
    setTableLayout(e.target.value as string);
  };

  /* 是否可展开 */
  const handleExpandChange = (enable: boolean) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };

  /* 是否内容超过列宽有省略号 */
  const handleEllipsisChange = (enable: boolean) => {
    setEllipsis(enable);
  };

  /* 是否显示标题 */
  const handleTitleChange = (enable: boolean) => {
    setShowTitle(enable);
  };
  /* 是否显示表头 */
  const handleHeaderChange = (enable: boolean) => {
    setShowHeader(enable);
  };

  /* 切换显示脚注 */
  const handleFooterChange = (enable: boolean) => {
    setShowFooter(enable);
  };

  /* 是否可以选择行并设置选择行后执行的函数 */
  const handleRowSelectionChange = (enable: boolean) => {
    setRowSelection(enable ? {} : undefined);
  };

  /* Y轴滚动 */
  const handleYScrollChange = (enable: boolean) => {
    setYScroll(enable);
  };
  /* x轴可滚动 */
  const handleXScrollChange = (e: RadioChangeEvent) => {
    setXScroll(e.target.value as string);
  };

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll !== "unset") {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  const tableProps: TableProps<UserList> = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showFooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout:
      tableLayout === "unset"
        ? undefined
        : (tableLayout as TableProps["tableLayout"]),
  };

  /* 添加新用户对话框 */
  const [modalpen, setModalopen] = useState(false);
  const [userForm] = Form.useForm();
  const toggleOpenModalHandler = useCallback(() => {
    setModalopen(!modalpen);
  }, [setModalopen, modalpen]);
  const handleClose = useCallback(() => {
    setModalopen(false);
    userForm.resetFields();
  }, [setModalopen, userForm]);

  /* 分配用户角色 */
  const [isShowUserRoleToToast, setShowUserRoleToToast] = useState(false);

  /* 提交分配权限 */
  const submitAssignUserRoles = (selectedValue: (string | number)[]) => {
    if (currentUserId && selectedValue.length > 0) {
      void AssignUserRolesReq({
        userId: currentUserId,
        roleIds: selectedValue as number[],
      });
    } else {
      showMessage({ type: "info", text: "必须选择一个角色" });
    }
  };
  const closeAssignUserRoles = useCallback(() => {
    setShowUserRoleToToast(false);
  }, []);
  return (
    <div className={UserStyle["User-Container"]}>
      <TableTop
        leftTopInfo={{ leftFiledName: "用户名", placeholder: "请输入用户名" }}
        filterInfo={{
          centerTitle: "是否删除",
          option: options,
          defaultValue: options[0].value,
        }}
        style={{ width: "1360px", marginTop: "20px" }}
        resetHandler={() => {
          console.log("重置");
        }}
        queryHandler={(keyword: string, selectKeyword: string) => {
          console.log(keyword);
          console.log(selectKeyword);
        }}
      ></TableTop>
      <Form layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item label="显示边框">
          <Switch checked={bordered} onChange={handleBorderChange} />
        </Form.Item>
        <Form.Item label="加载中">
          <Switch checked={loading} onChange={handleLoadingChange} />
        </Form.Item>
        <Form.Item label="显示标题">
          <Switch checked={showTitle} onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="显示列头">
          <Switch checked={showHeader} onChange={handleHeaderChange} />
        </Form.Item>
        <Form.Item label="显示页脚">
          <Switch checked={showFooter} onChange={handleFooterChange} />
        </Form.Item>
        <Form.Item label="可展开">
          <Switch checked={!!expandable} onChange={handleExpandChange} />
        </Form.Item>
        <Form.Item label="显示多选框">
          <Switch
            checked={!!rowSelection}
            onChange={handleRowSelectionChange}
          />
        </Form.Item>
        <Form.Item label="固定表头">
          <Switch checked={!!yScroll} onChange={handleYScrollChange} />
        </Form.Item>
        <Form.Item label="文本省略">
          <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
        </Form.Item>
        <Form.Item label="表格尺寸">
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="large">大</Radio.Button>
            <Radio.Button value="middle">中</Radio.Button>
            <Radio.Button value="small">小</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="表格滚动">
          <Radio.Group value={xScroll} onChange={handleXScrollChange}>
            <Radio.Button value="unset">默认</Radio.Button>
            <Radio.Button value="scroll">滚动</Radio.Button>
            <Radio.Button value="fixed">固定列</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="表格布局">
          <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
            <Radio.Button value="unset">默认</Radio.Button>
            <Radio.Button value="fixed">固定</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={toggleOpenModalHandler} size="small">
            新增用户
          </Button>
          <Modal
            title="添加用户"
            style={{ top: 80 }}
            open={modalpen}
            destroyOnClose={false} // 避免关闭时卸载 Form
            onCancel={handleClose} // 取消关闭
            footer={[
              <Button
                key="cancel"
                styles={{ backgroundColor: "#dfe566" }}
                onClick={handleClose}
              >
                取消
              </Button>,
              <Button
                key="submit"
                type="primary"
                styles={{ backgroundColor: "#8194ed" }}
                onClick={() => userForm.submit()}
              >
                提交
              </Button>,
            ]}
          >
            <Form
              name="adduser"
              autoComplete="on"
              form={userForm}
              onFinish={() => void handleSubmit()} // 成功提交数据
            >
              <Form.Item<FieldType>
                label="账号"
                name="account"
                rules={[{ required: true, message: "请输入账号" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input type="password" autoComplete="on" />
              </Form.Item>
            </Form>
          </Modal>
        </Form.Item>
      </Form>

      {/* 用户表 */}
      <div style={{ maxWidth: "97.5%", overflowX: "auto" }} className="clearfix">
        <Table<UserList>
          {...tableProps}
          columns={columns}
          dataSource={userList.map((user) => ({
            ...user,
            key: user.user_id || user.username, // 这里保证 key 的唯一性
          }))}
          pagination={{
            align: "center",
            current: pagination.page,
            pageSize: pagination.limit,
            showTotal: showTotal,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: [1, 10, 20, 50, 100],
            onChange: (page, pageSize) =>
              void getUserInfo({ page: page, limit: pageSize }),
            position: ["bottomCenter"],
          }}
          scroll={{ scrollToFirstRowOnChange: true, y: 400 }}
          rowKey="user_id"
        ></Table>
      </div>

      {/* 分配用户角色 */}
      <UserRoleModal
        visible={isShowUserRoleToToast}
        defaultValue={dafaultSelectedRolevalue}
        onSubmit={submitAssignUserRoles}
        onClose={closeAssignUserRoles}
      ></UserRoleModal>
    </div>
  );
};

export default User;
