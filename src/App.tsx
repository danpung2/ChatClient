import React from 'react';
import './App.css';
import {BrowserRouter, Route, Router, Routes, useLocation} from 'react-router-dom';
import RoomList from "./page/RoomList";
import {JOIN_PATH, LOGIN_PATH, MY_ACCOUNT_PATH, ROOM_DETAIL_PATH, ROOT_PATH} from "./common/constants/path.const";
import RoomDetail from "./page/RoomDetail";
import {Provider, useSelector} from 'react-redux';
import store, {RootState} from "./redux/store";
import Login from "./page/Login";
import Join from "./page/Join";
import {WS_DEFAULT} from "./common/constants/ws.const";
import MyAccount from "./page/MyAccount";

function App() {
    const ws = new WebSocket(WS_DEFAULT);

    ws.onopen = () => {
        console.log("[Connected]");
    }

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROOT_PATH} element={<RoomList/>}/>
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
