import {Button} from "reactstrap";
import {useState} from "react";
import "../style/ChatTextBox.css";

function ChatTextBox(){
    const [text, setText] = useState("");

    const onChangeText = (e: any) => {
        e.preventDefault();
        setText(e.target.value);
    }

    const onClickSendChat = (e: any) => {
        e.preventDefault();

    }

    return (
        <>
            <div className={"text-box"}>
                <input className={"input-box"} placeholder={"하고 싶은 말을 입력하세요."} onChange={onChangeText}/>
                <Button className={"send-btn"} color={"light"} onClick={onClickSendChat}>전송</Button>
            </div>
        </>
    )
}

export default ChatTextBox;