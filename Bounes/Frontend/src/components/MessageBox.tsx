import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";

// type ONE is with one action button (Information box)
// type TWO requires confirmation (Confirmation box)
enum Type {
  One = 1,
  Two = 2,
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  action: () => void;
  type: Type;
};
const MessageBox = ({
  isOpen,
  onClose,
  title,
  message,
  action,
  type,
}: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <ModalCloseButton />
            <ModalBody>{message}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                No
              </Button>
              {type === 2 ? (
                <Button variant="ghost" onClick={action}>
                  Yes
                </Button>
              ) : (
                <div />
              )}
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MessageBox;
