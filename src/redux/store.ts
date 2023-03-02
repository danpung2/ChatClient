import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import errorSlice from "./slice/errorSlice";
import dateSlice from "./slice/dateSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    user: userSlice,
});


const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: { persist: persistedReducer, error: errorSlice, date: dateSlice},
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>
export default store;
