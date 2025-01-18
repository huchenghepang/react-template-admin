import React, { useState } from "react";
import IconFont from "../../components/Iconfont/Iconfont";
import { useFormReducer } from "../../hooks/useFormReducer";
import { registerAddSchema } from "../../schema/user";
import { validate } from "../../schema/validate";
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
  const [isGithubLogin, setIsGithubLogin] = useState(false);

  const [errors, setErrors] = useState<FormType>({});

  const toggleLoginMethod = () => {
    setIsGithubLogin(!isGithubLogin);
  };

  // 账号和密码
  const { formState, handleChange, resetForm } = useFormReducer({
    account: "",
    password: "",
  });

  /* 提交表单 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate(registerAddSchema, formState)
      .then(({ valid, errors }) => {
        if (!valid) {
          errors.forEach((error) => {
            setErrors((prev) => ({
              ...prev,
              [error.errorName]: error.message,
            }));
          });
          return;
        }
        resetForm();
        alert("登录成功");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* 重置表单 */
  const resetError = () => {
    setErrors({});
  };

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
            required
            className={loginStyle["Login-Input"]}
          />

          <p className={loginStyle["Login-Error"]}>{errors.account}</p>

          <input
            type="password"
            value={formState.password}
            onChange={handleChange}
            onFocus={resetError}
            className={loginStyle["Login-Input"]}
            name="password"
            placeholder="密码"
            required
          />

          <p className={loginStyle["Login-Error"]}>{errors.password}</p>
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
