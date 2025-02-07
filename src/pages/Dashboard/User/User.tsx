import {
  Form,
  Radio,
  RadioChangeEvent,
  Switch,
  Table,
  TableProps
} from "antd";

import { PaginationProps } from "antd/lib";
import React, { useCallback, useEffect, useState } from "react";
import { showMessage } from "../../../components/message/MessageManager";
import TableTop from "../../../components/Table/tabletop";
import { UserList } from "../../../interface/response/admin.r";
import { reqUsersInfo } from "../../../serices/api/admin";
import UserStyle from "./User.module.scss";

// 定义组件的 Props 类型
interface UserProps {
  // 这里是组件的属性
}

const options: { value: string; label: string }[] = [
  { value: "你好", label: "hao " },
  { value: "你好1", label: "haoa " },
  { value: "你好2", label: "haoaa " },
];

/* 展示的表格列 */
const columns: TableProps<UserList>["columns"] = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "账号",
    dataIndex: "account",
    key: "account",
  },
  {
    dataIndex: "avatar",
    title: "头像",
    key: "avatar",
  },
  {
    dataIndex: "email",
    title: "邮箱",
    key: "email",
  },
  {
    dataIndex: "is_delete",
    key: "is_delete",
    title: "是否删除",
  },
  {
    dataIndex: "is_login",
    key: "is_login",
    title: "是否登录",
  },
  {
    dataIndex: "register_datetime",
    key: "register_datetime",
    title: "注册时间",
  },
  {
    dataIndex: "role",
    key: "role",
    title: "角色",
  },
  {
    dataIndex: "signature",
    key: "signature",
    title: "个性签名",
  },
  {
    dataIndex: "user_id",
    key: "user_id",
    title: "用户ID",
  },
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
const User: React.FC<UserProps> = (props) => {
  const [userList, setUserList] = useState<UserList[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 0,
  });
  const getUserInfo = useCallback(
    async (pagination: { page: number; limit: number }) => {
      try {
        const { success, data, errorMessage } = await reqUsersInfo(pagination);
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
    [setUserList],
  );
  useEffect(() => {
    void getUserInfo({ page: pagination.page, limit: pagination.limit });
  }, [getUserInfo]);

  /* 表格配置 */
  /* 是否显示边框 */
  const [bordered, setBordered] = useState(false);
  /* 是否加载中 */
  const [loading, setLoading] = useState(false);
  /* 切换大小 */
  const [size, setSize] = useState<SizeType>("large");
  /* 切换展开 */
  const [expandable, setExpandable] =useState<ExpandableConfig<UserList>>(defaultExpandable);
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
    setXScroll(e.target.value as string );
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
      <Form
        layout="inline"
        className="table-demo-control-bar"
        style={{ marginBottom: 16 }}
      >
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
      </Form>

      {/* 用户表 */}
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
        rowKey="user_id"
      ></Table>
    </div>
  );
};

export default User;
