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