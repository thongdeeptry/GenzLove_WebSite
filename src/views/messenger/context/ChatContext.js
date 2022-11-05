import { createContext, useContext, useReducer } from "react";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig, db } from "../../../config";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const uidsd = auth.currentUser.uid;
  let myRe = /chat.*/;
  const myArray = myRe.exec(window.location.href);
  console.log("The value of lastIndex is " + myArray);
  let rgid = /^chat.(.*)/;
  const idLocation = rgid.exec(myArray);
  let data = idLocation[1] + uidsd;
  // const res = getDoc(doc(db, "chats", idLocation[1]+uid));
  // console.log(res)
  console.log("id cua usser " + data);
  const INITIAL_STATE = {
    chatId: data,
    user: uidsd,
  };
  const chatReducer = (state, action) => {
    return {
      user: uidsd,
      chatId:
        uidsd > idLocation[1] ? uidsd + idLocation[1] : idLocation[1] + uidsd,
    };
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  console.log(state);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
