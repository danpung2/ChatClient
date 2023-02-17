import React, {useEffect, useState} from "react";
import axios from "axios";
import {GET_ALL_CHAT_ROOM, CREATE_ROOM, ENTER_ROOM} from "../common/constants/api.const";
import {useNavigate} from "react-router-dom";
import {ROOT_PATH, ROOM_LIST_PATH, ROOM_DETAIL_PATH} from "../common/constants/path.const";

interface Room {
    roomId: string;
    roomName: string;
}

function RoomList() {
    const navigate = useNavigate();
    const [roomList, setRoomList] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        getAllRoomList()
    }, []);

    const getAllRoomList = async () => {
        const response = await axios.get(GET_ALL_CHAT_ROOM);
        console.log(response.data);
        setRoomList(response.data);
    }

    async function createRoom(roomName: string) {
        const response = await axios.post(CREATE_ROOM, null, {
            params: {roomName}
        });
        console.log(response.data);
    }

    async function enterRoom(roomId: number){
        const response = await axios.get(ENTER_ROOM, {
            params: {roomId}
        });
        console.log(response.data);
    }

    const onCreateRoomHandler = (event: any) => {
        event.preventDefault();
        createRoom(roomName).then((res) => {
            console.log(res);
            alert("채팅방이 생성되었습니다.");
        }).catch((err) => {
            alert("채팅방 생성에 실패하였습니다.");
        })
        window.location.replace(ROOT_PATH);
    };

    const onChangeRoomName = (event: any) => {
        setRoomName(event.target.value);
    }

    const onEnterRoomHandler = (event: any, roomId: number) => {
        console.log(event);
        enterRoom(roomId).then((res) => {
            console.log(res);
            alert("채팅방 입장에 성공하였습니다.");
            navigate(ROOM_DETAIL_PATH + `?roomId=${roomId}`);
        }).catch((err) => {
            alert("채팅방 입장에 실패하였습니다..");
        })
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
                        <input type="text" className="form-control" onChange={onChangeRoomName}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit" onClick={onCreateRoomHandler}>
                                채팅방 개설
                            </button>
                        </div>
                    </div>
                </div>
                <ul className="list-group">
                    {roomList && roomList.map(room => (
                        <li key={room.roomId} className="list-group-item list-group-item-action" onClick={event => {onEnterRoomHandler(event, parseInt(room.roomId))}}>
                            {room.roomName}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default RoomList;