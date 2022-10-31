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
import { firebaseConfig } from "../../../config";
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  push,
} from "firebase/database";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
function TickBlue() {
  // Chakra color mode
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
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
  const handleClick = () => setShow(!show);
  //REGISTER FIREBASE WEB

  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, "users/1");
    onValue(reference, (childSnapshot) => {
      const id = childSnapshot.child("id").exportVal();
      const name = childSnapshot.child("name").exportVal();
      setidd(id);
      setnamem(name);
    });
  }, []);

  const createUser = (email, password) => {
    const db = getDatabase();
    const reference = ref(db, "support/");
    push(reference, {
      id: idd,
      name: namem,
      noidung: email,
      lydokhac: password,
      trangthai: "Chờ duyệt",
    });
    alert("Gửi đơn thành công, vui lòng chờ phê duyệt");
    setemail("");
    setpassword("");
  };
  function changeInputValue(event) {
    setemail(event.target.value);
  }
  function changeInputValueP(event) {
    setpassword(event.target.value);
  }
  return (
    <Flex
      w="100%"
      h="100%"
      alignItems="flex-start"
      justifyContent="center"
      mb={{ base: "30px", md: "60px" }}
      px={{ base: "25px", md: "0px" }}
      mt={{ base: "40px", md: "14vh" }}
      flexDirection="column"
      borderRadius={20}
    >
      <Box me="auto" marginLeft={100}>
        <Heading color={textColor} fontSize="36px">
          Đơn xác nhận danh tính
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Hãy nhập các thông tin đầy đủ để xác nhận danh tính của bạn!
        </Text>
      </Box>
      <Flex
        direction="column"
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        marginLeft={100}
      >
        <Flex
          align="center"
          mb="25px"
          alignItems={"center"}
          alignSelf={"center"}
        >
          <Text color="blue.600" mx="25px">
            {namem}
          </Text>
        </Flex>
        <FormControl>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Nội dung yêu cầu xác thực<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            w="100%"
            maxW="100%"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Nhập nội dung để xét duyệt"
            mb="24px"
            fontWeight="500"
            alignItems={"flex-start"}
            alignSelf={"flex-start"}
            justifyContent={"flex-start"}
            size="lg"
            h={150}
            value={email}
            onChange={(event) => changeInputValue(event)}
          />
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Lý do khác
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              w="100%"
              maxW="100%"
              placeholder="Vui lòng nhập lý do khác"
              mb="24px"
              size="lg"
              h={20}
              type={"text"}
              variant="auth"
              value={password}
              onChange={(event) => changeInputValueP(event)}
            />
          </InputGroup>
          <Flex justifyContent="space-between" align="center" mb="24px">
            <FormControl display="flex" alignItems="center">
              <Checkbox
                id="remember-login"
                colorScheme="brandScheme"
                me="10px"
              />
              <FormLabel
                htmlFor="remember-login"
                mb="0"
                fontWeight="normal"
                color={textColor}
                fontSize="sm"
              >
                Bạn đã chắc chắn nhập thông tin chính xác
              </FormLabel>
            </FormControl>
          </Flex>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            onClick={() => createUser(email, password)}
          >
            Gửi đơn
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default TickBlue;
