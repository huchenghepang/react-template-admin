import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import MultiLevelNav, {
  MultiLevelNavProps,
} from "../../components/navitem/MultiLevelNav";
import { PermissionRoute } from "../../router/DynamicRoutes";
import { RootState } from "../../store";
import "./sidebar.scss";

function transformRoutesToNav(routes: PermissionRoute[]): MultiLevelNavProps[] {
  return routes.map((route) => {
    const { icon, routeName, path, children } = route;
    const navItem: MultiLevelNavProps = {
      text: routeName || "",
      leftIcon: icon,
      to:path
    };
    // 如果存在子路由，则递归调用转换函数
    if (children && children.length > 0) {
      navItem.childrenInfo = transformRoutesToNav(children);
    }
    return navItem;
  });
}

export const Sidebar: FC = () => {
  const routers = useSelector((state: RootState) => state.router.routers);
  const children: MultiLevelNavProps[] = useMemo(
    () => transformRoutesToNav(routers),
    [routers],
  );


  return useMemo(
    () => (
      <aside className="sidebar-container clearfix">
        <div className="dashboard-title clearfix">
          <h2>天空后台</h2>
        </div>
        <div className="sidebar-itemlist">
          <div className="home-section sidebar-section">
            <h3 className="sidebar-title-3">Home</h3>
            <div className="section-detail">
              <MultiLevelNav text="主页" leftIcon="icon-zhuye" to={"/dashboard/home"}></MultiLevelNav>
            </div>
          </div>
          <div className="pages-section sidebar-section">
            <h3 className="sidebar-title-3">Pages</h3>
            <div className="section-detail">
              {children.map((navItem,index)=>{
                return <MultiLevelNav key={index} {...navItem}></MultiLevelNav>;
              })}
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
    ),
    [children],
  );
};
