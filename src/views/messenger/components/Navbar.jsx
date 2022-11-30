import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { ChatContext } from "../context/ChatContext";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig, db, auth } from "../../../config";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [id, setid] = useState();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase();
  const uidd = auth.currentUser.uid;
  console.log("id cua usser " + uidd);
  useEffect(() => {
    const reference = ref(db, "users/" + uidd);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const idr = childSnapshot.child("id").val();

      setname(namepr);
      setavt(avtpr);
      setid(idr);
    });
  }, []);
  
  return (
    <div className="navbar">
      <span className="logo">
        <div className="user">
          <img src={avt} alt="" />
          <span>{name}</span>
        </div>
      </span>
    </div>
  );
};

export default Navbar;
