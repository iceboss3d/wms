import { useState } from "react";
import {
  Flex,
  Button,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "./Logo";

const NavBar = () => {
  const [display, changeDisplay] = useState("none");
  return (
    <Flex align="center" justifyContent="space-between" p={6}>
      <Logo />
      <Flex justifyContent="space-between" align="center">
        {/* Desktop */}
        <Flex display={["none", "none", "flex", "flex"]}>
          <Link href="/">
            <Button variant="ghost" aria-label="Home" my={5} w="100%">
              Products
            </Button>
          </Link>

          <Link href="/customers">
            <Button variant="ghost" aria-label="About" my={5} w="100%">
              Customers
            </Button>
          </Link>

          <Link href="/dispatch">
            <Button variant="ghost" aria-label="Contact" my={5} w="100%">
              Dispatch
            </Button>
          </Link>
        </Flex>

        {/* Mobile */}
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
        />
        {/* <Switch color="green" isChecked={isDark} onChange={toggleColorMode} /> */}
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <Link href="/dashboard" >
            <Button variant="ghost" aria-label="Home" my={5} w="100%">
              Products
            </Button>
          </Link>

          <Link href="/customers" >
            <Button variant="ghost" aria-label="About" my={5} w="100%">
              Customers
            </Button>
          </Link>

          <Link href="/dispatch" >
            <Button variant="ghost" aria-label="Contact" my={5} w="100%">
              Dispatch
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
