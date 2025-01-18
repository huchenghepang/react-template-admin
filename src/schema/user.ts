import * as Yup from 'yup';

export const registerAddSchema = Yup.object().shape({
    // 账号，可以是邮箱或手机号
    account: Yup.string()
        .matches(
            /^((1[3-9]\d{9})|([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+))$/,
            '账号必须是有效的邮箱或手机号'
        )
        .required('账号不能为空'),
    // 密码，包含字母和数字，长度在6到20之间
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
            '密码必须包含字母和数字，并且长度在6到20之间'
        )
        .required('密码不能为空'),
});
