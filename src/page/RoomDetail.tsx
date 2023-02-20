// TODO - 채팅방 웹소켓 설정

import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import StompJs from "@stomp/stompjs";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

function RoomDetail() {
    const [sender, setSender] = useState("");

    const userId = useSelector((state: RootState) => state.persist.user.user.id);

    useEffect(() => {
        checkNickname()
    }, []);

    const checkNickname = () => {
        const nickname = localStorage.getItem("nickname");
        if(nickname === null)
            alert("비회원은 채팅이 불가능합니다.");
        else {
            setSender(nickname);
            localStorage.setItem("sender", sender);
        }
    }



    return (
        <>
            <div className="container" id="app">
                <div>
                    {/*<h2>{{room.name}}</h2>*/}
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text">내용</label>
                    </div>
                    <input type="text" className="form-control"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            보내기
                        </button>
                    </div>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        {/*{{message.sender}} - {{message.message}}*/}
                    </li>
                </ul>
                <div></div>
            </div>


        </>
    )
}

export default RoomDetail;