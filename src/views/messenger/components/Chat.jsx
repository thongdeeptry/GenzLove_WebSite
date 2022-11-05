import React, { useContext, useEffect, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { ChatContext } from "../context/ChatContext";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig, db } from "../../../config";
const Chat = () => {
  const { data } = useContext(ChatContext);
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [id, setid] = useState();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase();
  let myRe = /chat.*/;
  const myArray = myRe.exec(window.location.href);
  console.log("The value of lastIndex is " + myArray);
  let rgid = /^chat.(.*)/;
  const idLocation = rgid.exec(myArray);

  useEffect(() => {
    const reference = ref(db, "users/" + idLocation[1]);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const idr = childSnapshot.child("id").val();

      setname(namepr);
      setavt(avtpr);
      setid(idr);
    });
  }, []);
  console.log("=======SDFGÙYDHGFHKFỲGEKUH====> " + name);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{name}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
