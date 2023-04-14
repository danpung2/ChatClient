import React from "react";
import "../style/UserSay.css";

function UserSay(props: any){
    return (
        <>
            <div className={"user-say"}>
                <p className={"user-say-prompt"}>{props.prompt}</p>
            </div>
        </>
    )
}
export default UserSay;