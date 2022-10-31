import React from "react";
// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import logo from "../../../assets/img/auth/icon.png";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex direction="column">
      <Flex
        bgImage={logo}
        bgSize="cover"
        h="50px"
        w="200px"
        marginLeft={10}
        marginBottom={5}
      ></Flex>
      <HSeparator />
    </Flex>
  );
}

export default SidebarBrand;
