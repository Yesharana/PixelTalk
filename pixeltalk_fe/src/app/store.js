import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/userSlice";
import {persistReducer,persistStore} from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import chatSlice from "../features/chatSlice";


//saveUserOnlyFilter
const saveUserOnlyFilter=createFilter("user",["user"]);

//persist config

//There are two types of storage - 1) storage storage -When you refresh it is going to save after adding persistent and after closing your and after restarting your comp, whatever is there it will stay
//session storage - If you refresh, it's going to be there but if you close the browser or restart then it is gone.
const persistConfig={
    key:"user",
    storage,
    whitelist:["user"],
    transforms:[saveUserOnlyFilter], // install - redux persistent transform filter,
};
// only user info will be saved after doing refresh
// root reducer is used to combine reducer


const rootReducer=combineReducers({
    user:userSlice,
    chat:chatSlice,
});

const persistedReducer=persistReducer(persistConfig,rootReducer);

// To create store we need function configureStore inside it drfine reducer
export const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        }),
     
    devTools:true,

});

export const persistor=persistStore(store);