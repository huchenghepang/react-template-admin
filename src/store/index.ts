import { configureStore } from "@reduxjs/toolkit";
import { errorMiddleware } from "./middleware";
import routerReducer from "./slices/routerSlice";
import userReducer from "./slices/userSlice";





export const store = configureStore({
    reducer: { user: userReducer, router: routerReducer},
    middleware(getDefaultMiddleware){
        return getDefaultMiddleware().concat(errorMiddleware)
    }
})


export type RootState = ReturnType<typeof store.getState> 
export type RootDispatch = typeof store.dispatch
