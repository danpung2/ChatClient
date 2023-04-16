import React, {useEffect, useState} from "react";
import axios from "axios";
import {GET_ALL_CHAT_ROOM, CREATE_ROOM, ENTER_ROOM} from "../common/constants/api.const";
import {useNavigate, useParams} from "react-router-dom";
import {ROOT_PATH, ROOM_DETAIL_PATH, LOGIN_PATH, JOIN_PATH, MY_ACCOUNT_PATH} from "../common/constants/path.const";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {Button} from "react-bootstrap";
import {userActions} from "../redux/slice/userSlice";
import {roomActions} from "../redux/slice/roomSlice";
import "../style/RoomList.css";

interface Room {
    roomId: string;
    roomName: string;
}

function RoomList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [roomList, setRoomList] = useState<Room[]>([]);
    const [roomName, setRoomName] = useState("");
    const [expiredDate, setExpiredDate] = useState("");
    const [expiredTime, setExpiredTime] = useState("");

    const isLogin = useSelector((state: RootState) => state.persist.user.isLogin);
    const nickname = useSelector((state: RootState) => state.persist.user.user.nickname);

    useEffect(() => {
        getAllRoomList();
    }, []);

    const getAllRoomList = async () => {
        const response = await axios.get(GET_ALL_CHAT_ROOM);
        setRoomList(response.data);
    }

    const onClickLogout = async () => {
        dispatch(userActions.logout());
    }

    async function createRoom(roomName: string, expiredDate: string, expiredTime: string) {
        await axios.post(CREATE_ROOM, {roomName, expiredDate, expiredTime});
    }

    async function enterRoom(roomId: number, nickname: string) {
        await axios.get(ENTER_ROOM, {
            params: {roomId, nickname}
        });
    }

    const onCreateRoomHandler = (event: any) => {
        event.preventDefault();

        if (!isLogin) {
            alert("채팅방을 생성하려면 로그인이 필요합니다.");
            navigate(LOGIN_PATH);
        } else {
            /*
            TODO: expiredDate, expiredTime 유저한테 입력받기
             */
            const date = new Date();

            const year = date.getFullYear().toString();
            const month = ('0' + (date.getMonth() + 1)).slice(-2).toString();
            const day = ('0' + date.getDate()).slice(-2).toString();

            setExpiredDate(year + '-' + month + '-' + day);

            const hours = ('0' + date.getHours()).slice(-2).toString();
            const minutes = ('0' + date.getMinutes()).slice(-2).toString();
            const seconds = ('0' + date.getSeconds()).slice(-2).toString();
            setExpiredTime(hours + ':' + minutes + ':' + seconds);

            console.log(expiredDate);
            console.log(expiredTime);

            createRoom(roomName, expiredDate, expiredTime).then((res) => {
                alert("채팅방이 생성되었습니다.");
                window.location.reload();
            }).catch((err) => {
                alert("채팅방 생성에 실패하였습니다.");
                console.log(expiredDate);
                console.log(expiredTime);
                // window.location.reload();
            })

        }
    };

    const onChangeRoomName = (event: any) => {
        setRoomName(event.target.value);
    }

    const onEnterRoomHandler = (event: any, roomId: number, roomName: string) => {
        enterRoom(roomId, nickname).then((res) => {
            alert("채팅방 입장에 성공하였습니다.");

            dispatch((
                roomActions.enter({
                    room: {
                        id: roomId,
                        roomName: roomName
                    }
                })
            ));

            navigate(ROOM_DETAIL_PATH);
        }).catch((err) => {
            alert("채팅방 입장에 실패하였습니다.");
        })
    }

    return (
        <>
            <div className="App">
                <div className="container" id="app">
                    <div className={"header room-list-header"}>
                        <div className={"title room-list-title"}>채팅방 리스트</div>
                        {/*{isLogin ? <Button className="room-list-btn logout-btn room-list-logout-btn" variant={"danger"}*/}
                        {/*                   onClick={onClickLogout}>로그아웃</Button>*/}
                        {/*    : <Button className="room-list-btn login-btn room-list-login-btn" variant={"primary"}*/}
                        {/*              onClick={() => navigate(LOGIN_PATH)}>로그인</Button>}*/}
                        {/*{isLogin ? <Button className="room-list-btn info-btn room-list-info-btn" variant={"secondary"}*/}
                        {/*                   onClick={() => navigate(MY_ACCOUNT_PATH)}>회원정보</Button>*/}
                        {/*    : <Button className="room-list-btn join-btn room-list-join-btn" variant={"secondary"}*/}
                        {/*              onClick={() => navigate(JOIN_PATH)}>회원가입</Button>}*/}
                    </div>

                    <div className="input-group room-list-main-area">
                        <div className="input-group-prepend room-list-main-area-header">
                            <label className="input-group-text room-name-label">방이름</label>
                        </div>
                        <input type="text" className="form-control" onChange={onChangeRoomName}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit" onClick={onCreateRoomHandler}>
                                채팅방 개설
                            </button>
                        </div>
                        <div className={"room-list-main-area-room-list"}>
                            <ul className="list-group">
                                {roomList && roomList.map(room => (
                                    <li key={room.roomId} className="list-group-item list-group-item-action room-list-item"
                                        onClick={event => {
                                            onEnterRoomHandler(event, parseInt(room.roomId), room.roomName)
                                        }}>
                                        {room.roomName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomList;