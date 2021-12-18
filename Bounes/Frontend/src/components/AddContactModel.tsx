import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { createContact, deleteContact, updateContact } from "../store/contacts";
import { useDispatch, useSelector } from "react-redux";
import { Contact, CreateContact, RootState } from "../types";
import { compareValues, patchObj } from "../utils";
import MessageBox from "./MessageBox";
type Props = { isOpen: boolean; onClose: () => void; contact?: Contact };
const AddModel = ({ isOpen, onClose, contact }: Props) => {
  const initialFormValues = {
    firstName: contact?.firstName ?? "",
    lastname: contact?.lastname ?? "",
    phoneNumbers: contact?.phoneNumbers ?? [],
  };
  const addNew = () => {
    return contact === undefined ? true : false;
  };
  const [openMegBox, setOpenMegBox] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.User);
  const initialRef = React.useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = (values: FormikValues, actions: FormikHelpers<any>) => {
    console.log(values);

    if (addNew()) {
      values = {
        userid: user.id,
        firstName: values.firstName,
        lastname: values.lastname,
        phoneNumbers: [values.phoneNumbers],
      };
      dispatch(createContact(values as CreateContact));
    } else {
      const updatedValues = compareValues(initialFormValues, values);
      const patchData = patchObj(updatedValues);
      if (patchData.length > 0) dispatch(updateContact(contact!.id, patchData));
    }

    // Set the form isSubmiting value to false
    actions.setSubmitting(false);
    onClose();
  };
  const handleContactDelete = (contactId: number | undefined) => {
    if (contactId !== undefined) {
      console.log(contactId);
      dispatch(deleteContact(contactId));
      setOpenMegBox(!openMegBox);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{addNew() ? "Add New" : "Edit"} Contact</ModalHeader>
          <ModalBody>
            <ModalCloseButton />
            <Formik
              initialValues={initialFormValues}
              onSubmit={(values, actions) => handleSubmit(values, actions)}
              validationSchema={basicFormSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form>
                  <FormControl
                    isRequired
                    isInvalid={
                      (errors.firstName && touched.firstName) as boolean
                    }
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      ref={initialRef}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstName"
                      value={values.firstName}
                      placeholder="First Name"
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={(errors.lastname && touched.lastname) as boolean}
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastname"
                      value={values.lastname}
                      placeholder="Last Name"
                    />
                    <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={
                      (errors.phoneNumbers && touched.phoneNumbers) as boolean
                    }
                  >
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="phoneNumbers"
                      value={values.phoneNumbers}
                      placeholder="Phone Numbers"
                    />
                    <FormErrorMessage>{errors.phoneNumbers}</FormErrorMessage>
                  </FormControl>
                  <ModalFooter>
                    <Button
                      mr={3}
                      colorScheme="teal"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      {addNew() ? "Add" : "Update"}
                    </Button>
                    {addNew() ? (
                      <Button onClick={onClose}>Cancel</Button>
                    ) : (
                      <Button
                        onClick={() => setOpenMegBox(!openMegBox)}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    )}
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <MessageBox
        isOpen={openMegBox}
        onClose={() => setOpenMegBox(!openMegBox)}
        title="Confirmation"
        message="Are you sure you want to delete ?"
        action={() => handleContactDelete(contact?.id)}
        type={2}
      />
    </>
  );
};
const basicFormSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  phoneNumbers: yup.string().required("Phone number is required"),
});

export default AddModel;
