import { Button, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <Flex justifyContent="space-between" direction="row" align="center" p={6}>
      <Logo />
      <Stack direction="row">
        <Button variant="ghost">Products</Button>
        <Button variant="ghost">Customers</Button>
        <Button variant="ghost">Dispatch</Button>
      </Stack>
    </Flex>
  );
}
