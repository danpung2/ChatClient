import React from "react";
import "../style/OtherSay.css";

function OtherSay(props: any){
    return (
        <>
            <div className={"other-say"}>
                <p className={"other-say-prompt"}>{props.prompt}</p>
            </div>
        </>
    )
}
export default OtherSay;