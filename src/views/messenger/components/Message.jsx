import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { getDatabase, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [id, setid] = useState();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase();
  const uidd = auth.currentUser.uid;
  console.log("id cua usser " + uidd);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img src={avt} alt="" />
        <span>Ngay bây giờ</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
