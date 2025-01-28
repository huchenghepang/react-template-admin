import { FC } from "react";
import IconFont from "../../components/Iconfont/Iconfont";
import NavItem from "../../components/navitem/NavItem";
import "./sidebar.scss";
import MultiLevelNav, {
  MultiLevelNavProps,
} from "../../components/navitem/MultiLevelNav";

export const Sidebar: FC = () => {
  const children: MultiLevelNavProps[] = [
    {
      text: "你好",
      leftIcon: "icon-components",
      childrenInfo: [
        { text: "你好", leftIcon: "icon-components" },
        { text: "你好", leftIcon: "icon-components" },
        {
          text: "你好",
          leftIcon: "icon-components",
          childrenInfo: [
            { text: "你好", leftIcon: "icon-components" },
            { text: "你好", leftIcon: "icon-components" },
            { text: "你好", leftIcon: "icon-components" },
          ],
        },
      ],
    },
    { text: "你好", leftIcon: "icon-components" },
    { text: "你好", leftIcon: "icon-components" },
    { text: "你好", leftIcon: "icon-components" },
  ];

  return (
    <aside className="sidebar-container clearfix">
      <div className="dashboard-title clearfix">
        <h2>Hope UI</h2>
      </div>
      <div className="sidebar-itemlist">
        <div className="home-section sidebar-section">
          <h3 className="sidebar-title-3">Home</h3>
          <div className="section-detail">
            <NavItem
              text="主页"
              active={true}
              leftElement={<IconFont name="icon-github"></IconFont>}
              rightElement={<IconFont name="icon-github"></IconFont>}
            ></NavItem>
            <NavItem
              text="菜单样式"
              leftElement={<IconFont name="icon-github"></IconFont>}
              rightElement={<IconFont name="icon-right"></IconFont>}
            ></NavItem>
          </div>
        </div>
        <div className="pages-section sidebar-section">
          <h3 className="sidebar-title-3">Pages</h3>
          <div className="section-detail">
            <MultiLevelNav
              leftIcon="icon-menu"
              text="example"
              childrenInfo={children}
            ></MultiLevelNav>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Widgets</span>
              </div>
              <div className="right-info"></div>
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Maps</span>
              </div>
              <div className="right-info"></div>
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Authentication</span>
              </div>
              <div className="right-info" />
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Users</span>
              </div>
              <div className="right-info" />
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Error 404</span>
              </div>
              <div className="right-info" />
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Error 505</span>
              </div>
              <div className="right-info" />
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Maintence</span>
              </div>
              <div className="right-info" />
            </div>
          </div>
        </div>
        <div className="elements-section sidebar-section">
          <h3 className="sidebar-title-3">Elements</h3>
          <div className="section-detail">
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Component</span>
              </div>
              <div className="right-info"></div>
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Form</span>
              </div>
              <div className="right-info"></div>
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Table</span>
              </div>
              <div className="right-info"></div>
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Icons</span>
              </div>
              <div className="right-info"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
