/** @format */

import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import TopCreatorLike from "./components/TableTopLike";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, query, startAt } from "firebase/database";
import { firebaseConfig } from "../../../config";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import { follow as petsFollow } from "views/admin/marketplace/variables/topFollow";
import { like as petsLike } from "views/admin/marketplace/variables/topLike";
import { congchung as petsCongChung } from "views/admin/marketplace/variables/dataCongChung";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import { tableColumnsTopLike } from "./variables/tableColumnsTopCreators";

export default function Marketplace() {
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const [like, setlike] = useState(petsLike);
  const [follow, setFollow] = useState(petsFollow);
  const [congchung, setCongChung] = useState(petsCongChung);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const dataa = [];
  useEffect(() => {
    try {
      const userd = getAuth().currentUser.uid;
      if (userd.length < 8) {
        window.location = "https://genzlove.onrender.com/";
      }
    } catch (error) {}
    if (!follow.length) {
      setFollow(petsFollow);
    }
    if (!congchung.length) {
      setCongChung(petsCongChung);
    }
    if (!like.length) {
      setlike(petsLike);
    }
  });
  const buttonMove = (idk) => {
    window.location = "https://genzlove.onrender.com/#/admin/profile/" + idk;
  };
  console.log("likelike pets: ", like);
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Người Của Công Chúng
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              ></Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {congchung.map((item, index) => (
                <NFT
                  key={index}
                  name={item.name}
                  tick={item.tick}
                  author={"Có " + item.follow + " người theo dõi"}
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                  ]}
                  image={item.avt}
                  currentbid={item.nghenghiep}
                  download="#"
                  xemthem={() => buttonMove(item.id)}
                />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card px="0px" mb="20px">
            <TableTopCreators
              tableData={follow}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
        </Flex>
      </Grid>
      <Flex
        flexDirection="column"
        gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
      >
        <Card px="0px" mb="20px">
          <TopCreatorLike tableData={like} columnsData={tableColumnsTopLike} />
        </Card>
      </Flex>
      {/* Delete Product */}
    </Box>
  );
}
