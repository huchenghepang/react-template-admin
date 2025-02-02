import { Select } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Avator from "../../components/avator/avator";
import { showMessage } from "../../components/message/MessageManager";
import Search from "../../components/search/Search";
import { reqChangeRole } from "../../serices/api/user";
import { RootState } from "../../store";
import { changeRole, loginOut } from "../../store/slices/userSlice";
import { setLocalStorage } from "../../utils/localStorage";
import "./navtop.scss";


const TopNav = () => {
  const dispatch = useDispatch();
  const loginExit = useCallback(() => {
    dispatch(loginOut(null));
  }, [dispatch]);

  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
  const roleName = useSelector(
    (state: RootState) => state.user.currentRole?.role_name,
  );


  const rolesStore = useSelector((state: RootState) => state.user.roles);
  const roles = useMemo(() => {
    return rolesStore?.map((role) => {
      return {
        value: role.role_id,
        label: role.role_name,
      };
    });

  }, [rolesStore]);
  /*  切换用户角色 */
  const changeRoleHandler = useCallback(
    async (value: string) => {
      try {
        if (userId) {
          const { success, errorMessage, data } = await reqChangeRole({
            roleId: +value,
            userId,
          });
          if (!success)
            return showMessage({
              type: "error",
              text: errorMessage || "切换角色失败",
            });
          dispatch(
            changeRole({
              permissions: data.permissions,
              currentRole: {
                role_id: data.currentRole.roleId,
                role_name: data.currentRole.roleName,
              },
            }),
          );
          setLocalStorage("token", data.token);
          showMessage({ type: "success", text: "切换角色成功" });
          window.location.href = '/dashboard/home'
        }
      } catch (error) {
        showMessage({ type: "error", text: "切换角色失败" });
        console.log((error as Error).message);
      }
    },
    [userId, dispatch],
  );

  return useMemo(
    () => (
      <>
        {/* 顶部导航 */}
        <div className="topNavigation-container ">
          <Search onEnter={(value) => console.log(value)}></Search>
          <div className="navtop-center" />
          <div className="navtop-right-ctn ">
            {/* 通知 */}
            {/* 消息 */}
            {/* 头像 */}
            <Avator onClick={() => console.log("dianj")}></Avator>
            {/* 个人信息 */}
            <div className="person-info">
              <span className="username">{username}</span>
              <Select
                defaultValue={roleName}
                options={roles}
                onChange={(e)=>void changeRoleHandler(e)}
                style={{ width: "120px" }}
              ></Select>
            </div>

            <NavLink className="loginOut-btn" onClick={loginExit} to="/login">
              <span>退出登录</span>
            </NavLink>
          </div>
        </div>
      </>
    ),
    [loginExit, roleName, username, roles, changeRoleHandler],
  );
};

export default memo(TopNav);
