import AgoraUIKit from "agora-react-uikit";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config";
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  push,
} from "firebase/database";
// Assets
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
function LiveStream() {
  // Chakra color mode
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
  const [videoCall, setVideoCall] = useState(true);
  //   const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
  //   const appId = 'e63496cfe00f42d8be5c498370e6fa27';
  //   const appCertificate = '<Your app certificate>';
  //   const channelName = '1-2';
  //   const uid = getAuth().currentUser.UI;
  //   const role = RtcRole.PUBLISHER;
  //   const expirationTimeInSeconds = 3600
  //   const currentTimestamp = Math.floor(Date.now() / 1000)
  //   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
  //   // Build token with uid
  //   const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
  //   console.log("Token with integer number Uid: " + tokenA);

  const rtcProps = {
    appId: "e63496cfe00f42d8be5c498370e6fa27",
    channel: "1",
    token:
      "007eJxTYLgW0j/jg+maEPYIratpbLv3/u3YvnwKT9VEiZv1vVIdUusVGFLNjE0szZLTUg0M0kyMUiySUk2TTSwtjM0NUs3SEo3Mz5o1JDcEMjIkbtFiZGSAQBCfkcGQgQEA94Mdvw==",
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [idd, setidd] = useState();
  const [namem, setnamem] = useState();

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  //REGISTER FIREBASE WEB

  return videoCall ? (
    <Box style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </Box>
  ) : (
    <Button onClick={() => setVideoCall(true)}>Join</Button>
  );
}

export default LiveStream;
