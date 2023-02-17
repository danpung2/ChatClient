
// TODO - 채팅방 입장 시 대화명 없으면 받아서 대화명, roomId localStorage 에 저장
// TODO - 채팅방 웹소켓 설정

function RoomDetail() {
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