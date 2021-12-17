import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    IconButton
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
// import { Contact } from "../types";
interface Contact {
    id: number;
    firstname: string;
    lastname: string;
    phoneNumbers: Array<string>;
  }
  

type IProps = {
    contacts: Array<Contact>;
    handleView: (Contact: Contact) => void;
  };

  const printPhoneNumbers = (arr: Array<string>) => {
    var temp="";
    if (arr.length > 1) {
        arr.forEach((phone, index)=> {
          if (index == arr.length -1) {
            temp+=phone
          } else {
  
            temp+=phone+", "
          }
        })
      return temp;
    } else {
      return arr[0];
    }
    }
const ContactsTable = ({contacts, handleView}: IProps) => {
    if(contacts) console.log(contacts);
    
    return (
        <Table variant='simple'>
            <TableCaption>Contact List</TableCaption>
            <Thead>
                <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Phone Numbers</Th>
                <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {contacts.map(contact => {
                    console.log(contact);
                <Tr key={contact.id}>
                    <Td>{contact.firstname}</Td>
                    <Td>{contact.lastname}</Td>
                    <Td>{printPhoneNumbers(contact.phoneNumbers)}</Td>
                    <Td><IconButton
                        colorScheme='teal'
                        aria-label='Search database'
                        onClick={() => handleView(contact)}
                        icon={<ViewIcon />}
                        />
                    </Td>
                </Tr>
                })
                }
                <Tr>
                    <Td>{contacts[0].firstname}</Td>
                    <Td>{contacts[0].lastname}</Td>
                    <Td>{contacts[0].phoneNumbers[0]}</Td>
                    <Td><IconButton
                        colorScheme='teal'
                        aria-label='Search database'
                        onClick={() => handleView(contacts[0])}
                        icon={<ViewIcon />}
                        />
                    </Td>
                </Tr>
            </Tbody>
            </Table>
    )
}

export default ContactsTable
