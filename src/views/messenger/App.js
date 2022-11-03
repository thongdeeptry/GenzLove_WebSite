import React from "react";
import Messenger from "./mess";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
const messenger=()=>{
    <AuthContextProvider>
      <ChatContextProvider>
        <React.StrictMode>
          <Messenger />
        </React.StrictMode>
      </ChatContextProvider>
    </AuthContextProvider>

}
export default messenger
