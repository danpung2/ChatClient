import React from 'react';
import './App.css';
import {BrowserRouter, Route, Router, Routes, useLocation} from 'react-router-dom';
import RoomList from "./page/RoomList";
import {
    JOIN_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    MY_ACCOUNT_PATH,
    ROOM_DETAIL_PATH, ROOM_LIST_PATH,
    ROOT_PATH
} from "./common/constants/path.const";
import RoomDetail from "./page/RoomDetail";
import {Provider} from 'react-redux';
import store from "./redux/store";
import Login from "./page/Login";
import Join from "./page/Join";
import MyAccount from "./page/MyAccount";
import Root from "./page/Root";

function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROOT_PATH} element={<Root/>}/>
                    <Route path={ROOM_LIST_PATH} element={<RoomList/>}/>
                    <Route path={LOGIN_PATH} element={<Login/>}/>
                    <Route path={JOIN_PATH} element={<Join/>}/>
                    <Route path={MY_ACCOUNT_PATH} element={<MyAccount/>}/>
                    <Route path={ROOM_DETAIL_PATH} element={<RoomDetail/>}/>
                </Routes>
            </BrowserRouter>

        </Provider>

    )
}

export default App;
