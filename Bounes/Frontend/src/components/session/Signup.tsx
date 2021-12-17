import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Text,
  VStack,
  Link,
  Container,
  Heading,
  Box,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { registerUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { Registration, RootState } from "../../types";
import { passwordHasher } from "../../utils";
import { Link as ReactLink } from "react-router-dom";
import { signinRoute } from "../../Routes";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
type RegForm = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  matchPass: string;
};
const Signup = () => {
  const initialFormValues: RegForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    matchPass: "",
  };
  const { loading } = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch();
  const handleSubmit = (values: RegForm, actions: FormikHelpers<any>) => {
    console.log(values);
    console.log(values.password === values.matchPass);

    if (values.password === values.matchPass) {
      let submitValues: Registration = {
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password,
        email: values.email,
      };
      let passHashed = passwordHasher(values.password);
      submitValues = { ...submitValues, password: passHashed };
      // Set the form isSubmitting value to false
      actions.setSubmitting(loading);
      dispatch(registerUser(submitValues));
    } else {
      actions.setFieldError("matchPass", "Password doesn't match");
      actions.setSubmitting(false);
    }
  };
  return (
    <>
      <ColorModeSwitcher pos="absolute" right="0px" mt="1" />
      <Container pt="40">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
          <Heading textAlign="center">Sign Up</Heading>
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
                  mt="5"
                  mb="5"
                  isRequired
                  isInvalid={(errors.firstname && touched.firstname) as boolean}
                >
                  <FormLabel>Firstname</FormLabel>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="firstname"
                    value={values.firstname}
                    placeholder="Firstname"
                  />
                  <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt="5"
                  mb="5"
                  isRequired
                  isInvalid={(errors.lastname && touched.lastname) as boolean}
                >
                  <FormLabel>Lastname</FormLabel>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="lastname"
                    value={values.lastname}
                    placeholder="Lastname"
                  />
                  <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt="5"
                  mb="5"
                  isRequired
                  isInvalid={(errors.email && touched.email) as boolean}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    value={values.email}
                    placeholder="Email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt="5"
                  mb="5"
                  isRequired
                  isInvalid={(errors.password && touched.password) as boolean}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    value={values.password}
                    type="password"
                    placeholder="Password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                  <FormControl
                    mt="5"
                    mb="5"
                    isRequired
                    isInvalid={
                      (errors.matchPass && touched.matchPass) as boolean
                    }
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="matchPass"
                      value={values.matchPass}
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <FormErrorMessage>{errors.matchPass}</FormErrorMessage>
                  </FormControl>
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
                    Signup
                  </Button>
                  <Text>
                    Already have an account?{" "}
                    <Link color="teal.500" as={ReactLink} to={signinRoute}>
                      Signin
                    </Link>
                  </Text>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
};
var passRegex = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))"
);
const emailRegex = new RegExp("");

const basicFormSchema = yup.object().shape({
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  email: yup
    .string()
    // .matches(emailRegex)
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(
    //   passRegex,
    //   "The Password must contain at least 1 lowercase, 1 Uppercase, 1 special character and 1 number "
    // )
    .required("Password is required"),
  matchPass: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(
    //   passRegex,
    //   "The Password must contain at least 1 lowercase, 1 Uppercase, 1 special character and 1 number "
    // )
    .required("Password is required"),
});

export default Signup;
