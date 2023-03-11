// TODO - 채팅방 웹소켓 설정

import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import SockJs from "sockjs-client";
import StompJs, {CompatClient, Stomp} from "@stomp/stompjs";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import SockJS from "sockjs-client";

function RoomDetail() {
    const userId = useSelector((state: RootState) => state.persist.user.user.id);
    const isLogin = useSelector((state: RootState) => state.persist.user.isLogin);
    const nickname = useSelector((state: RootState) => state.persist.user.user.nickname);

    const roomId = useSelector((state: RootState) => state.persist.room.room.id);
    const roomName = useSelector((state: RootState) => state.persist.room.room.roomName);

    // const ROOM_ID = 1;
    // const client = useRef<CompatClient>();
    // const [chatMessageList, setChatMessageList] = useState<IChatDetail[]>([]);
    // const [chatName, setChatName] = useState("");
    // const [open, setOpen] = useState(false);
    // const [isChat, setIsChat] = useState(false);
    // const [chatMessage, setChatMessage] = useState<IChatDetail>();

    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    //
    // useEffect(() => {
    //     if (chatMessage) {
    //         setChatMessageList([...chatMessageList, chatMessage]);
    //     }
    // }, [chatMessage]);
    //
    // const sendHandler = () => {
    //     client.current!.send(
    //         "/pub/chat/message",
    //         {},
    //         JSON.stringify({
    //             roomId: ROOM_ID,
    //             sender: nickname,
    //             message: chatMessage,
    //         })
    //     );
    // };
    //
    // const connectHandler = (mockId: string, mockName: string) => {
    //     client.current = Stomp.over(() => {
    //         const sock = new SockJS("http://localhost:8080/ws");
    //         return sock;
    //     });
    //     setChatMessageList([]);
    //     client.current.connect(
    //         {
    //
    //         },
    //         () => {
    //             // (messageList: IChatDetail[]) => {
    //
    //             client.current!.subscribe(
    //                 `/sub/chat/room/${mockId}`,
    //                 (message) => {
    //                     setChatMessage(JSON.parse(message.body));
    //                 },
    //                 { simpDestination: mockId }
    //             );
    //         }
    //     );
    //
    //     setIsChat(true);
    // };

    const sock = new SockJS("/ws/chat");
    const ws = Stomp.over(sock);
    let reconnect = 0;

    const sendMessage = () => {
        ws.send("/app/chat/message");
    }

    const onClickSendMessage = (e:any) => {
        e.preventDefault();
        if(!isLogin){
            alert("비회원은 채팅이 불가능합니다. 로그인을 해주세요.");
        } else {
            console.log("userId: " + userId);
            console.log("nickname: " + nickname);
            console.log("roomId: " + roomId);
            console.log("roomName: " + roomName);
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
                        <button className="btn btn-primary" type="button" onClick={onClickSendMessage}>
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