import React, {useEffect, useState} from 'react';
import './App.css';
import {getAllRoomList, createRoom} from "./common/api/chat";
import {forEach} from "react-bootstrap/ElementChildren";


function App() {

    const roomList = getAllRoomList();

    const [loading, setLoading] = useState(false);
    const [roomName, setRoomName] = useState("");

    const onChangeRoomName = (event: any) => {
        setRoomName(event.target.value);
    }

    return (
        <>
            <div className="App">
                <div className="container" id="app">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>채팅방 리스트</h3>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text">방제목</label>
                        </div>
                        <input type="text" className="form-control"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit" onClick={onChangeRoomName}>
                                채팅방 개설
                            </button>
                        </div>
                    </div>
                </div>
                <ul className="list-group">
                    {roomList.then((res) => {
                        res.forEach(function (){
                            return (
                                <li className="list-group-item list-group-item-action">
                                    {roomName}
                                </li>
                            )
                        })
                    })}
                    {/*{roomList.then((res) => {*/}
                    {/*    */}
                    {/*    res.map(room => {*/}
                    {/*        return (*/}
                    {/*            <li className="list-group-item list-group-item-action">*/}
                    {/*                {room.roomName}*/}
                    {/*            </li>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*})}*/}
                </ul>
            </div>
        </>
    )
}

export default App;
