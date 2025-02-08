import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../'; // 根据项目实际调整路径
import { RolesInfoResponse } from '../../interface/response/role.r';
import { reqRolesInfo } from '../../serices/api/role';
import { ASYNC_FETCH_STATUS } from './../../interface/store/normal.d';

// 定义 Slice 状态类型
interface RoleState {
    status: ASYNC_FETCH_STATUS;
    roles?:  RolesInfoResponse[]
}

// 初始化状态
const initialState: RoleState = {
    status: 'idle'
};

export const getRolesInfo = createAction("/role/info")

// 异步操作 获取角色列表信息
export const fetchRolesInfoData = createAsyncThunk<RolesInfoResponse[], void, { state: RootState }>(getRolesInfo().type,async(_,thunkAPI)=>{
    try {
        const {data,success,errorMessage} = await reqRolesInfo();
        if(!success) return thunkAPI.rejectWithValue(errorMessage || "无法获取角色信息")
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue((error as Error).message)
    }
})

// 创建 Slice
const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {}, // 可选的同步 reducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchRolesInfoData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRolesInfoData.fulfilled, (state, action: PayloadAction<RolesInfoResponse[]>) => {
                state.status = 'succeeded';
                state.roles = action.payload;
            })
            .addCase(fetchRolesInfoData.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

const roleReducer = roleSlice.reducer;
export default roleReducer;