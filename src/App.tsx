import React from 'react';
import './App.css';
import {BrowserRouter, Route, Router, Routes, useLocation} from 'react-router-dom';
import RoomList from "./page/RoomList";
import {JOIN_PATH, LOGIN_PATH, ROOM_DETAIL_PATH, ROOT_PATH} from "./common/constants/path.const";
import RoomDetail from "./page/RoomDetail";
import {Provider, useSelector} from 'react-redux';
import store, {RootState} from "./redux/store";
import Login from "./page/Login";
import Join from "./page/Join";


function App() {
    // const location = useLocation();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROOT_PATH} element={<RoomList/>}/>
                    <Route path={LOGIN_PATH} element={<Login/>}/>
                    <Route path={JOIN_PATH} element={<Join/>}/>
                    <Route path={ROOM_DETAIL_PATH} element={<RoomDetail/>}/>
                </Routes>
            </BrowserRouter>

        </Provider>

    )
}

export default App;
