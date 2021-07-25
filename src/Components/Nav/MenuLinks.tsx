import { Stack } from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";

export default function MenuLinks() {
    return (
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/how">How It Works</MenuItem>
      </Stack>
    );
}
