import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PermissionRoute } from '../../router/DynamicRoutes';

// 定义状态的接口，包含一个数字类型的字段 value
interface RouterState {
    routers: PermissionRoute[]
}

// 定义初始状态
const initialState: RouterState = {
    routers:[]
};

// 创建一个 Slice，用于管理特定的 Redux 状态
const routerSlice = createSlice({
    name: 'router', // Slice 的名称，用于区分其他 Slice
    initialState,        // 初始状态
    reducers: {          // 定义操作状态的 Reducer 方法
        saveRouters: (state:RouterState,actions:PayloadAction<PermissionRoute[]>) => {
            state.routers = actions.payload
        },
        
    }
});

// 导出生成的 Action，用于触发状态更新
export const { saveRouters } = routerSlice.actions;
// 导出生成的 Reducer，用于配置 Redux Store
const routerReducer = routerSlice.reducer;
export default routerReducer;