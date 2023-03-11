import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {WS_DEFAULT, WS_ENTER, WS_SEND, WS_SUBSCRIBE} from "../common/constants/ws.const";

interface Message {
    messageId: number,
    sender: string,
    content: string
}

function RoomDetail() {
    const client = useRef<CompatClient>();
    const userId = useSelector((state: RootState) => state.persist.user.user.id);
    const isLogin = useSelector((state: RootState) => state.persist.user.isLogin);
    const nickname = useSelector((state: RootState) => state.persist.user.user.nickname);

    const roomId = useSelector((state: RootState) => state.persist.room.room.id);
    const roomName = useSelector((state: RootState) => state.persist.room.room.roomName);

    const [content, setContent] = useState("");
    const [message, setMessage] = useState<Message>();
    const [messageList, setMessageList] = useState<Message[]>([]);

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        if (message) {
            setMessageList([...messageList, message]);
        }
    }, [message]);

    const preventClose = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = ""; //Chrome에서 동작하도록; deprecated
    };

    useEffect(() => {
        (() => {
            window.addEventListener("beforeunload", preventClose);
        })();

        return () => {
            window.removeEventListener("beforeunload", preventClose);
        };
    }, []);


    const sendMessage = () => {
        client.current?.send(WS_SEND, {}, JSON.stringify({
            roomId, roomName, nickname, content
        }));
        setContent("");
        client.current?.subscribe(WS_SUBSCRIBE + roomId, message => {
            console.log(message.body);
            console.log(JSON.parse(message.body));
            // receivedMessage(JSON.parse(message.body));
        });
    }

    const receivedMessage = (receive: any) => {
        const newMessage: Message = {
            messageId: receive.messageId, sender: receive.sender, content: receive.content
        }
        setMessageList([newMessage, ...messageList]);
    }

    const connect = () => {
        client.current = Stomp.over(() => {
            const sock = new SockJS(WS_DEFAULT);
            return sock;
        });
        client.current?.connect({}, () => {
            client.current?.subscribe(WS_SUBSCRIBE + roomId, message => {
                // receivedMessage(JSON.parse(message.body));
                setMessage(JSON.parse(message.body));
            });
            client.current?.send(WS_ENTER, {}, JSON.stringify({
                roomId, roomName, nickname
            }));
        })
    }

    const onChangeContent = (e: any) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const onClickSendMessage = (e: any) => {
        e.preventDefault();
        if (!isLogin) {
            alert("비회원은 채팅이 불가능합니다. 로그인을 해주세요.");
        } else {
            sendMessage();
        }
    }

    return (
        <>
            <div className="container" id="app">
                <div>
                    <h2>{roomName}</h2>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text">내용</label>
                    </div>
                    <input type="text" className="form-control" value={content} onChange={onChangeContent}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={onClickSendMessage}>
                            보내기
                        </button>
                    </div>
                </div>
                <ul className="list-group">
                    {messageList && messageList.map(msg => (
                        <li key={msg.messageId} className="list-group-item list-group-item-action">
                            {msg.sender}: {msg.content}
                        </li>
                    ))}
                </ul>
                <div></div>
            </div>


        </>
    )
}

export default RoomDetail;