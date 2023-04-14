import {ReactComponent as LeftArrow} from "../../../../code/chat_project_react/src/assets/left-arrow.svg";
import "../style/ChatHeader.css"
import {useNavigate} from "react-router-dom";

function ChatHeader() {

    const navigate = useNavigate();

    const onClickBackward = (e:any) => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <>
            <div className={"header-container"}>
                <LeftArrow width={"24px"} height={"24px"} className={"left-arrow"} onClick={onClickBackward}/>
            </div>
        </>
    )
}

export default ChatHeader;