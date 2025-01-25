import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getComplexLocalStorage, getLocalStorage, setComplexLocalStorage } from "../../utils/localStorage";
import type { UserData } from './../../interface/response/login.r.d';
import { reqUserInfo } from './../../serices/api/user';
import { RootState } from './../index';

// 定义状态的接口，包含一个数字类型的字段 value

type LoginState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    isLogin: boolean;
}


export type UserState = Partial<UserData> & LoginState

// 定义初始状态
const initialState: UserState = {
    ...getComplexLocalStorage("user"),
    ...{
        isLogin: Boolean(getLocalStorage("token")),
        status: "idle"
    }
};

export const loginIn = createAction<null>("loginIn")
export const loginOut = createAction<null>("loginOut")
export const getUserInfo = createAction<null>("getUserInfo")
/* 获取用户信息 */

export const fetchUserInfoData = createAsyncThunk<
    UserData, // 成功返回的数据类型
    void, // 参数类型，表示没有参数
    {
        state: RootState; // 可选的额外配置，可以提供 state 的类型
        rejectValue: string; // 自定义的 reject 值类型
    }
>(
    'user/info',
    async (_, thunkAPI) => {
        try {
            const { data, success, errorMessage } = await reqUserInfo();
            if (!success) return thunkAPI.rejectWithValue(errorMessage || '无法获取用户信息')
            return data.userData
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
    }
);



// 创建一个 Slice，用于管理特定的 Redux 状态
const userSlice = createSlice({
    name: 'user', // Slice 的名称，用于区分其他 Slice
    initialState,        // 初始状态
    reducers: {          // 定义操作状态的 Reducer 方法
        updateUserInfo(state, action: PayloadAction<UserData>) {
            const status = "succeeded";
            return { ...state, status, ...action.payload }
        },
    },
    extraReducers: (builder) => {
        // 处理 createAction 定义的 action
        builder
            .addCase(loginIn, (state) => {
                state.isLogin = true;
                setComplexLocalStorage("user",state)
            })
            .addCase(loginOut, (state) => {
                state.isLogin = false;
                localStorage.clear()
            })
            .addCase(fetchUserInfoData.pending, (state) => {
                state.status = "loading";
                
            })
            .addCase(fetchUserInfoData.fulfilled, (state, action: PayloadAction<UserData>) => {
                const status = 'succeeded';
                setComplexLocalStorage("user", state)
                return { ...state, status, ...action.payload };
            })
            .addCase(fetchUserInfoData.rejected, (state) => {
                state.status = 'failed';
                state.isLogin = false;
            })
    }
});



export const { updateUserInfo } = userSlice.actions
const userReducer = userSlice.reducer;
export default userReducer

