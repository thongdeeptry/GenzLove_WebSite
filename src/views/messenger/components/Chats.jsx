import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig, db } from "../../../config";
const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [id, setid] = useState();
  initializeApp(firebaseConfig);
  const dbd = getDatabase();
  let myRe = /chat.*/;
  const myArray = myRe.exec(window.location.href);
  console.log("The value of lastIndex is " + myArray);
  let rgid = /^chat.(.*)/;
  const idLocation = rgid.exec(myArray);
  console.log("id cua usser " + idLocation[1]);
  useEffect(() => {
    const reference = ref(dbd, "users/" + idLocation[1]);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const idr = childSnapshot.child("id").val();

      setname(namepr);
      setavt(avtpr);
      setid(idr);
    });
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(currentUser.uid);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={avt} alt="" />
            <div className="userChatInfo">
              <span>{name}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
