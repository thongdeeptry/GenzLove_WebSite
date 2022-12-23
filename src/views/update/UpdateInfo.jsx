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
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
function UpdateInfo() {
  // Chakra color mode
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth().currentUser.uid;
  const [name, setname] = useState();
  const [diachi, setdiachi] = useState();
  const [nghenghiep, setnghenghiep] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [tick, settick] = useState();
  const [phanquyen, setphanquyen] = useState();
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
  let myRe = /info.*/;
  const myArray = myRe.exec(window.location.href);
  console.log("The value of lastIndex is " + myArray);
  let rgid = /^info.(.*)/;
  const idLocation = rgid.exec(myArray);
  console.log("id cua usser " + idLocation[1]);
  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, "users/" + idLocation[1]);
    onValue(reference, (childSnapshot) => {
      const id = childSnapshot.child("id").exportVal();
      const name = childSnapshot.child("name").exportVal();

      setname(name);
      setdiachi(childSnapshot.child("diachi").exportVal());
      setgioitinh(childSnapshot.child("gioitinh").exportVal());
      setnghenghiep(childSnapshot.child("nghenghiep").exportVal());
      setphanquyen(childSnapshot.child("phanquyen").exportVal());
      settick(childSnapshot.child("tick").exportVal());
    });
  }, []);

  const createUser = () => {
    const db = getDatabase();
    const reference = ref(db, "user/" + idLocation[1]);
    update(reference, {
      name: name,
      gioitinh: gioitinh,
      nghenghiep: nghenghiep,
      phanquyen: phanquyen,
      tick: tick,
      diachi: diachi,
    });
    alert("Cập nhật thông tin người dùng thành công");
  };

  return (
    <Flex
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      borderRadius={20}
      backgroundColor="white"
    >
      <Box marginTop={5} alignItems="center" justifyContent="center">
        <Heading
          color={textColor}
          fontSize="36px"
          alignItems="center"
          justifyContent="center"
          textAlign={"center"}
        >
          Đổi thông tin người dùng
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
          textAlign={"center"}
        >
          Hãy nhập các thông tin đầy đủ!
        </Text>
      </Box>
      <Flex
        direction="column"
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
      >
        <Flex
          align="center"
          mb="25px"
          alignItems={"center"}
          alignSelf={"center"}
        >
          <Text color="blue.600" mx="25px"></Text>
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
            Nhập tên<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            w="100%"
            maxW="100%"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Nhập tên mới"
            mb="24px"
            fontWeight="500"
            alignItems={"flex-start"}
            alignSelf={"flex-start"}
            justifyContent={"flex-start"}
            size="lg"
            h={20}
            value={name}
            onChange={(event) => setname(event.target.value)}
          />
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Nhập địa chỉ
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              w="100%"
              maxW="100%"
              placeholder="Vui nhập địa chỉ"
              mb="24px"
              size="lg"
              h={20}
              type={"text"}
              variant="auth"
              value={diachi}
              onChange={(event) => setdiachi(event.target.value)}
            />
          </InputGroup>
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Nhập nghề nghiệp
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              w="100%"
              maxW="100%"
              placeholder="Vui lòng nhập nghề nghiệp"
              mb="24px"
              size="lg"
              h={20}
              type={"text"}
              variant="auth"
              value={nghenghiep}
              onChange={(event) => setnghenghiep(event.target.value)}
            />
          </InputGroup>
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Nhập giới tính
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              w="100%"
              maxW="100%"
              placeholder="Vui lòng nhập giới tính"
              mb="24px"
              size="lg"
              h={20}
              type={"text"}
              variant="auth"
              value={gioitinh}
              onChange={(event) => setgioitinh(event.target.value)}
            />
          </InputGroup>
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Nhập trạng thái xác minh
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              w="100%"
              maxW="100%"
              placeholder="Vui lòng nhập trạng thái xác minh"
              mb="24px"
              size="lg"
              h={20}
              type={"text"}
              variant="auth"
              value={tick}
              onChange={(event) => settick(event.target.value)}
            />
          </InputGroup>
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Nhập phân quyền 0 là người dùng 1 là admin
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              w="100%"
              maxW="100%"
              placeholder="Vui lòng nhập phân quyền"
              mb="24px"
              size="lg"
              h={20}
              type={"text"}
              variant="auth"
              value={phanquyen}
              onChange={(event) => setphanquyen(event.target.value)}
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
            onClick={createUser}
          >
            Gửi đơn
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default UpdateInfo;
