import React from "react";

// import React from "react";
import illustration from "../../assets/illustration2.png";
import "./Message.css"

const Message = () => {
    return (
        <div className="msg">
            <img
                src={illustration}
                alt="Nothing Found"
                className="dock-img"
            />
            <div className="message">
                <h1>Nothing Found</h1>
                <p>
                    You don&apos;t have any transactions yet!
                </p>
            </div>
        </div>
    );
};

export default Message;
