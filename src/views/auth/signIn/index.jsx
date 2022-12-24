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
import { Redirect, Route, Switch } from "react-router-dom";
import DefaultAuth from "layouts/auth/Default";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
// Assets
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
function SignIn() {
  // Chakra color mode
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
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
  useEffect(() => {
    try {
      const userd = getAuth().currentUser.uid;
      if (userd.length > 8) {
        window.location = "https://genzlove.onrender.com/#/admin/home";
      }
    } catch (error) {
      window.location = "https://genzlove.onrender.com/#/admin/home";
    }
  });
  //LOGIN FIREBASE GENZLOVE
  const db = getDatabase();
  const LoginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Đăng nhập thành công");
        const user = getAuth().currentUser.uid;
        const reference = ref(db, "users/" + user);
        onValue(reference, (childSnapshot) => {
          const trangthai = childSnapshot.child("trangthai").val();
          if (trangthai == "Khóa") {
            alert("Đăng nhập thất bại, Tài khoản của bạn đã bị khóa");
          } else {
            console.log("UID - " + user);
            alert("Đăng nhập thành công");
            window.location = "https://genzlove.onrender.com/#/admin/home";
          }
        });
      })
      .catch((error) => {
        alert("Đăng nhập thất bại");
      });
  };
  function changeInputValue(event) {
    setemail(event.target.value);
  }
  function changeInputValueP(event) {
    setpassword(event.target.value);
  }
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px">
            Đăng nhập
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Nhập email và mật khẩu của bạn để đăng nhập!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          {/* <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              hoặc
            </Text>
            <HSeparator />
          </Flex> */}
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
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
              Mật khẩu<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                value={password}
                onChange={(event) => changeInputValueP(event)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
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
                  Giữ tôi luôn đăng nhập
                </FormLabel>
              </FormControl>
              <NavLink to="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  Quên mật khẩu?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={() => LoginUser(email, password)}
              //onClick={<Redirect to={"/admin"} />}
            >
              Đăng nhập
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Chưa có tài khoản?
              <NavLink to="/auth/sign-up">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Tạo một tài khoản
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
