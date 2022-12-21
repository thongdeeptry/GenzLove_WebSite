// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import verify from "assets/img/profile/verify.png";
export default function NFT(props) {
  const { image, name, author, bidders, download, currentbid, xemthem, tick } =
    props;
  const [like, setLike] = useState(false);
  const [hovered, setHovered] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  console.log("tickkkkkkkkkk " + tick);
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
          <Image
            src={image}
            w={{ base: "100%", "3xl": "100%" }}
            h={150}
            borderRadius="20px"
          />
          <Button
            position="absolute"
            bg="white"
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p="0px !important"
            top="14px"
            right="14px"
            borderRadius="50%"
            minW="36px"
            h="36px"
            onClick={() => {
              setLike(!like);
            }}
          >
            <Icon
              transition="0.2s linear"
              w="20px"
              h="20px"
              as={like ? IoHeart : IoHeartOutline}
              color="brand.500"
            />
          </Button>
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb="auto"
          >
            <Flex direction="column">
              <Flex flexDirection={"row"} w={"100%"}>
                <Text
                  color={textColor}
                  fontSize={15}
                  mb="5px"
                  fontWeight="bold"
                  me="14px"
                >
                  {name}
                </Text>
                <Image
                  src={verify}
                  w="25px"
                  h="25px"
                  marginBottom={1}
                  marginRight={2}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  display={["none", tick === "true" ? "inline-block" : null]}
                />
                <Text
                  display={["none", hovered === true ? "inline-block" : null]}
                  position={"absolute"}
                  marginTop={5}
                  color={"black"}
                  backgroundColor={"white"}
                  borderRadius={10}
                  padding={2}
                  borderColor={"green"}
                  borderWidth={2}
                >
                  Trang này đã được xác minh
                </Text>
              </Flex>
              <Text
                color="secondaryGray.600"
                fontSize={{
                  base: "sm",
                }}
                fontWeight="400"
                me="14px"
              >
                {author}
              </Text>
            </Flex>
            <AvatarGroup
              max={3}
              color={textColorBid}
              size="sm"
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              fontSize="12px"
            >
              {bidders.map((avt, key) => (
                <Avatar key={key} src={avt} />
              ))}
            </AvatarGroup>
          </Flex>
          <Flex
            align="start"
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt="25px"
          >
            <Text fontWeight="700" fontSize="sm" color={textColorBid}>
              {currentbid}
            </Text>
            <Link
              href={xemthem}
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
            >
              <Button
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                px="24px"
                py="5px"
                onClick={xemthem}
              >
                Xem Thêm
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
