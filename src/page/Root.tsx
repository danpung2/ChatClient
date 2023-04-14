import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useEffect} from "react";
import "../style/Root.css";
import {Button} from "reactstrap";
import {JOIN_PATH, LOGIN_PATH, MAIN_PATH, ROOM_LIST_PATH} from "../common/constants/path.const";

function Root(){
    const navigate = useNavigate();

    const isLogin = useSelector((state: RootState) => state.persist.user.isLogin);

    useEffect(() => {
        if(isLogin){
            navigate(MAIN_PATH);
        }
    }, []);

    const onClickToLogin = (e:any) => {
        e.preventDefault();
        navigate(LOGIN_PATH);
    }

    const onClickToJoin = (e:any) => {
        e.preventDefault();
        navigate(JOIN_PATH);
    }

    const onClickToRoomList = (e: any) => {
        e.preventDefault();
        navigate(ROOM_LIST_PATH);
    }

    return (
        <>
            <div className={"container"}>
                <div className={"info"}>
                    <p className={"info-text"}>채팅 내역 유출을 걱정하는 당신을 위한</p>
                    <p className={"info-text"}>어디에도 저장되지 않는 프라이빗 채팅 앱</p>
                    <p className={"info-text"}>닉네임만으로 다른 사람들과 마음놓고</p>
                    <p className={"info-text"}>채팅을 즐기세요</p>
                </div>
            </div>
            <div className={"button-section"}>
                <Button className={"login-btn"} color={"info"} onClick={onClickToLogin}>로그인</Button>
                <Button className={"join-btn"} color={"warning"} onClick={onClickToJoin}>회원가입</Button>
                <Button className={"preview-btn"} color={"light"} onClick={onClickToRoomList}>미리보기</Button>
            </div>
        </>
    )
}

export default Root;