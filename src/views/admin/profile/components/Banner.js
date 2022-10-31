// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import verify from "assets/img/profile/verify.png";
export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  const [hovered, setHovered] = useState(false);
  const [tick, setTick] = useState(false);
  const [name4, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [followw, setfolloww] = useState();
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  let myRe = /profile.*/;
  const myArray = myRe.exec(window.location.href);
  console.log("The value of lastIndex is " + myArray);
  let rgid = /[0-9]{1,11111}/;
  const idLocation = rgid.exec(myArray);

  const auth = getAuth(app);
  const user = idLocation;
  const db = getDatabase();

  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const tick = childSnapshot.child("tick").val();
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const tuoipr = childSnapshot.child("tuoi").val();
      const diachipr = childSnapshot.child("diachi").val();
      const ngaysinhpr = childSnapshot.child("ngaysinh").val();
      const gioitinhpr = childSnapshot.child("gioitinh").val();
      const fl = childSnapshot.child("follow").val();
      const nghe = childSnapshot.child("nghenghiep").val();
      const id = childSnapshot.child("id").val();
      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      settuoi(tuoipr);
      setfolloww(fl);
      setTick(tick);
    });
  }, []);
  console.log("tickkkkkkkkkk " + tick);
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="201px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatar}
        h="120px"
        w="120px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        alignSelf={"center"}
      >
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
        >
          {name}
        </Text>
        <Image
          src={verify}
          w="30px"
          h="30px"
          marginLeft={1}
          marginTop={2}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          display={["none", tick === "true" ? "inline-block" : null]}
        />
        <Text
          display={["none", hovered === true ? "inline-block" : null]}
          position={"absolute"}
          marginBottom={20}
          color={"black"}
          marginLeft={200}
          backgroundColor={"white"}
          borderRadius={10}
          padding={2}
          borderColor={"green"}
          borderWidth={2}
        >
          Trang này đã được xác minh
        </Text>
      </Flex>
      <Text color={textColorSecondary} fontSize="sm">
        {job}
      </Text>
      <Flex w="max-content" mx="auto" mt="26px">
        <Flex mx="auto" me="60px" align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {posts}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Bài viết
          </Text>
        </Flex>
        <Flex mx="auto" me="60px" align="center" direction="column">
          <Text color={textColorPrimary} fontSize="xl" fontWeight="700">
            {followw}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Theo dõi
          </Text>
        </Flex>
        <Flex mx="auto" align="center" direction="column">
          <Text color={textColorPrimary} fontSize="xl" fontWeight="700">
            {following}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Đang theo dõi
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
