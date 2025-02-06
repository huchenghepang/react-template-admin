import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconFont from "../../components/Iconfont/Iconfont";

import { showMessage } from "../../components/message/MessageManager";
import Turnstile from "../../components/Turnstile/Turnstile";
import { useFormReducer } from "../../hooks/useFormReducer";
import { registerAddSchema } from "../../schema/user";
import { validate } from "../../schema/validate";
import { reqLogin } from "../../serices/api/auth";
import { RootState } from "../../store";
import { loginIn, updateUserInfo } from "../../store/slices/userSlice";
import { setLocalStorage } from "../../utils/localStorage";
import loginStyle from "./Login.module.scss";

// 定义组件的 Props 类型
interface LoginProps {
  // 这里是组件的属性
}

interface FormType {
  account?: string;
  password?: string;
}

// 根据文件名生成组件
const Login: React.FC<LoginProps> = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    // 如果用户已经登录，跳转到 Dashboard 页面
    if (isLogin) {
      void navigate("/dashboard");
    }
  }, [isLogin, navigate]);

  const [isGithubLogin, setIsGithubLogin] = useState(false);
  const [isHuman, setHunman] = useState(false);
  const [errors, setErrors] = useState<FormType>({});

  const toggleLoginMethod = () => {
    setIsGithubLogin(!isGithubLogin);
  };
  const dispatch = useDispatch();
  // 账号和密码
  const { formState, handleChange, resetForm } = useFormReducer({
    account: "",
    password: "",
  });

  /* 提交表单 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isHuman) return showMessage({ type: "tip", text: "请先进行人机验证" });
    validate(registerAddSchema, formState)
      .then(({ valid, errors }) => {
        if (!valid) {
          errors.forEach((error) => {
            setErrors((prev) => ({
              ...prev,
              [error.errorName]: error.message,
            }));
          });
          resetForm();
          return Promise.reject(new Error("字段验证失败"));
        }
        resetForm();
        // 发起登录请求
        return reqLogin(formState);
      })
      .then(({ success, errorMessage, data }) => {
        if (!success) {
          return showMessage({
            type: "tip",
            text: "登录失败," + errorMessage,
          });
        }

        /* 登录成功处理数据 */
        showMessage({
          type: "success",
          text: "登录成功,欢迎您，" + data.userData.username,
        });

        /* 保存token */
        setLocalStorage("token", data.token);
        /* 保存用户信息 */
        dispatch(updateUserInfo(data.userData));
        dispatch(loginIn(null));
        /* 跳转管理面板 */
        void navigate("/dashboard");
      })
      .catch((error: Error) => {
        console.error(error);
        showMessage({ type: "error", text: error.message });
      });
  };

  /* 重置表单 */
  const resetError = () => {
    setErrors({});
  };

  const verifiedResultHandler = useCallback((success: boolean) => {
    setHunman(success);
  }, []);

  return (
    <div className={loginStyle["Login-Container"]}>
      {isGithubLogin ? (
        <div className={loginStyle["Github-Login"]}>
          <h2 className={loginStyle["Login-Title"]}>GitHub 登录</h2>
          <button className={loginStyle["Github-Button"]}>
            使用 GitHub 登录
          </button>
          <button
            onClick={toggleLoginMethod}
            type="button"
            className={loginStyle["Toggle-Button"]}
          >
            <IconFont name="icon-fanhui"></IconFont>
          </button>
        </div>
      ) : (
        <form
          action="/login"
          method="POST"
          className={loginStyle["Login-Form"]}
          onSubmit={handleSubmit}
        >
          <h2 className={loginStyle["Login-Title"]}>登录</h2>
          <input
            type="text"
            name="account"
            value={formState.account}
            placeholder="手机号或邮箱"
            onFocus={resetError}
            onChange={handleChange}
            autoComplete="account"
            required
            className={loginStyle["Login-Input"]}
          />

          <p className={loginStyle["Login-Error"]}>{errors.account}</p>

          <input
            type="password"
            value={formState.password}
            autoComplete="password"
            onChange={handleChange}
            onFocus={resetError}
            className={loginStyle["Login-Input"]}
            name="password"
            placeholder="密码"
            required
          />

          <p className={loginStyle["Login-Error"]}>{errors.password}</p>
          <Turnstile verifiedResultHandler={verifiedResultHandler}></Turnstile>
          <button type="submit" className={loginStyle["Login-Button"]}>
            登录
          </button>
          <div className={loginStyle["Login-Bottom"]}>
            <a>忘记密码？</a>
            <button
              onClick={toggleLoginMethod}
              type="button"
              className={loginStyle["Toggle-Button"]}
            >
              <IconFont name="icon-github" height="15px"></IconFont>
              <span>github登录</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
