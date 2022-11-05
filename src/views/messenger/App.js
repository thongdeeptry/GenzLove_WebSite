import React from "react";
import Messenger from "./mess";
import "./style.scss";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
const messenger = () => {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <React.StrictMode>
          <Messenger />
        </React.StrictMode>
      </ChatContextProvider>
    </AuthContextProvider>
  );
};
export default messenger;
