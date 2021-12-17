import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { loginUser, registerUser } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { User, RootState, Registration, Login } from "../types";
import { passwordHasher } from "../utils";

type props = { newUser: boolean };
const UserForm = ({ newUser }: props) => {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const handleSubmit = (values: FormikValues, actions: FormikHelpers<any>) => {
    console.log(values);
    let passHashed = passwordHasher(values.password);
    values = { ...values, password: passHashed };
    if (newUser) dispatch(registerUser(values as Registration));
    else dispatch(loginUser(values as Login));
    // // Set the form isSubmiting value to false
    actions.setSubmitting(false);
  };
  return (
    <div>
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
            <FormControl mt="5" mb="5">
              <FormLabel>Email</FormLabel>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                isInvalid={(errors.email && touched.email) as boolean}
                value={values.email}
                placeholder="Email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl mt="5" mb="5">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                isInvalid={(errors.password && touched.password) as boolean}
                value={values.password}
                placeholder="Password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <VStack>
              <Button
                size="md"
                height="48px"
                width="200px"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                {newUser ? "Signup" : "Signin"}
              </Button>
              <Text>
                {newUser
                  ? "Already have an account? Signin"
                  : "New? Create an account"}
              </Text>
              {/* <Button size="md" height="48px" width="200px">
                Cancel
              </Button> */}
            </VStack>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const basicFormSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("password is required"),
});

export default UserForm;
