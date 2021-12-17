import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Spacer,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ContactsTable from "../components/ContactsTable";
import { Contact, RootState } from "../types";
import { AddIcon } from "@chakra-ui/icons";
import AddModel from "../components/AddContactModel";
import { getContacts } from "../store/contacts";
const Home = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectContacts = useSelector(
    (state: RootState) => state.Contacts.contacts
  );
  const loaddingContacts = useSelector(
    (state: RootState) => state.Contacts.loading
  );
  const { loggedIn, user } = useSelector((state: RootState) => state.User);

  const [chosenContact, setChosenContact] = useState<Contact | undefined>();
  const [searched, setSearched] = useState("Do");
  const handleView = (contact: Contact) => {
    setChosenContact(contact);
    onOpen();
  };
  const handleOpen = () => {
    setChosenContact(undefined);
    onOpen();
  };
  const contactsData = [{id: 1, firstname: "Test", lastname: "test", phoneNumbers: ["050606597678"]}]
  useEffect(() => {
    dispatch(getContacts());
    return () => {
      // cleanup
    };
  }, []);

  return (
    <>
      <Stack isInline align="center">
        <Heading m="5">My Contacts</Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={handleOpen}>
          New Contact
        </Button>
        <AddModel isOpen={isOpen} onClose={onClose} contact={chosenContact}/>
      </Stack>
      <Divider />
      <ContactsTable contacts={contactsData} handleView={handleView}/>
      {selectContacts && selectContacts.length > 0 ? (
        <ContactsTable contacts={contactsData} handleView={handleView}/>
      ) : (
        <Box mt="40">
          {loaddingContacts ? (
            <Spinner />
          ) : (
            <>
              <Heading color="gray" textAlign="center">
                No Contacts Yet
              </Heading>
              <Heading size="xs" color="gray" textAlign="center">
                Start by adding some
              </Heading>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Home;
