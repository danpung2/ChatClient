import React from 'react';
import './App.css';
import {BrowserRouter, Route, Router, Routes, useLocation} from 'react-router-dom';
import Main from "./page/Main";
import {ROOT_PATH} from "./common/constants/path.const";


function App() {
    // const location = useLocation();
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROOT_PATH} element={<Main/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default App;
