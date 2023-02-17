import React from 'react';
import './App.css';
import {BrowserRouter, Route, Router, Routes, useLocation} from 'react-router-dom';
import RoomList from "./page/RoomList";
import {ROOM_DETAIL_PATH, ROOM_LIST_PATH, ROOT_PATH} from "./common/constants/path.const";
import RoomDetail from "./page/RoomDetail";


function App() {
    // const location = useLocation();
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROOT_PATH} element={<RoomList/>}/>
                <Route path={ROOM_LIST_PATH} element={<RoomList/>}/>
                <Route path={ROOM_DETAIL_PATH} element={<RoomDetail/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default App;
