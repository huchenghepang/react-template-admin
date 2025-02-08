import { configureStore } from "@reduxjs/toolkit";
import { errorMiddleware } from "./middleware";
import routerReducer from "./slices/routerSlice";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";





export const store = configureStore({
    reducer: { user: userReducer, router: routerReducer, role: roleReducer},
    middleware(getDefaultMiddleware){
        return getDefaultMiddleware().concat(errorMiddleware)
    }
})


export type RootState = ReturnType<typeof store.getState> 
export type RootDispatch = typeof store.dispatch
