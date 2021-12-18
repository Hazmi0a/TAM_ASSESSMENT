import React from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption as MenuItem,
  MenuDivider,
  Button,
  Spacer,
  Link,
  MenuGroup,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { signinRoute, signupRoute } from "../Routes";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import { removeItem } from "../localService";
type MenuItemsProps = { children: React.FC | string };
const MenuItems = ({ children }: MenuItemsProps) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = (props: FlexProps) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const location = useLocation();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          PHONEBOOK
        </Heading>
      </Flex>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      ></Box>
      <Spacer />
      <ColorModeSwitcher />

      {location.pathname === signinRoute ||
      location.pathname === signupRoute ? (
        <div />
      ) : (
        <Account />
      )}
    </Flex>
  );
};

export default Header;

const Account = () => {
  const { user } = useSelector((state: RootState) => state.User);

  const userInitials = () => {
    return user.firstName.slice(0, 1) + user.lastName.slice(0, 1);
  };
  const handleLogout = () => {
    removeItem("user");
    removeItem("authToken");
    window.location.reload();
  };
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        colorScheme="blue"
        borderRadius="50%"
        h="50px"
        w="50px"
      >
        {Object.keys(user).length > 0 ? userInitials() : ""}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuGroup title="Account">
          <MenuItem>{user.firstName + " " + user.lastName}</MenuItem>
          <MenuItem>{user.email}</MenuItem>
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
