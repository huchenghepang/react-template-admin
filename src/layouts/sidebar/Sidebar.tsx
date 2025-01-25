import { FC } from "react";
import "./sidebar.scss";

export const Sidebar: FC = () => {
  return (
    <aside className="sidebar-container clearfix">
      <div className="dashboard-title clearfix">
        <h2>Hope UI</h2>
      </div>
      <div className="sidebar-itemlist">
        <div className="home-section sidebar-section">
          <h3 className="sidebar-title-3">Home</h3>
          <div className="section-detail">
            <div className="sidebar-nav-item sidebar-nav-active-item">
              <div className="left-info"></div>
              <div className="middle">
                <span className="iconfont">DashBoard</span>
              </div>
              <span className="right-info" />
            </div>
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Menu Style</span>
              </div>
              <div className="right-info"></div>
            </div>
          </div>
        </div>
        <div className="pages-section sidebar-section">
          <h3 className="sidebar-title-3">Pages</h3>
          <div className="section-detail">
            <div className="sidebar-nav-item">
              <div className="left-info"></div>
              <div className="middle">
                <span>Example</span>
              </div>
              <div className="right-info"></div>
            </div>
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
