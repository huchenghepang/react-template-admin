import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Avator from '../../components/avator/avator';
import Search from '../../components/search/Search';
import { RootState } from '../../store';
import { loginOut } from '../../store/slices/userSlice';
import './navtop.scss';

 const TopNav = () => {
  const dispatch = useDispatch();
  const loginExit = useCallback(() => {
    dispatch(loginOut(null));
  }, [dispatch]);

 const  username=  useSelector((state:RootState)=>state.user.username)
 const  roleName=  useSelector((state:RootState)=>state.user.currentRole?.role_name)


 return useMemo(
   () => (
     <>
       {/* 顶部导航 */}
       <div className="topNavigation-container ">
         <Search onEnter={(value)=>console.log(value)}></Search>
         <div className="navtop-center" />
         <div className="navtop-right-ctn ">
           {/* 通知 */}
           {/* 消息 */}
           {/* 头像 */}
           <Avator onClick={()=>console.log("dianj")}></Avator>
           {/* 个人信息 */}
           <div className="person-info">
             <span className="username">{username}</span>
             <span className="identity">{roleName}</span>
           </div>
           <NavLink className="loginOut-btn" onClick={loginExit} to="/login">
             退出登录
           </NavLink>
         </div>
       </div>
     </>
   ),
   [loginExit, roleName, username],
 );
}


export default memo(TopNav);