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
  Flex,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { loginUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { Login, RootState } from "../../types";
import { passwordHasher } from "../../utils";
import { Link as ReactLink } from "react-router-dom";
import { signupRoute } from "../../Routes";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
type LoginForm = { email: string; password: string };
const Signin = () => {
  const initialFormValues: LoginForm = {
    email: "",
    password: "",
  };
  const { loading } = useSelector((state: RootState) => state.User);

  const dispatch = useDispatch();
  const handleSubmit = (values: LoginForm, actions: FormikHelpers<any>) => {
    console.log(values);
    let passHashed = passwordHasher(values.password);
    values = { ...values, password: passHashed };
    // Set the form isSubmiting value to false
    actions.setSubmitting(loading);
    dispatch(loginUser(values as Login));
  };
  return (
    <>
      <ColorModeSwitcher pos="absolute" right="0px" mt="1" />
      <Container pt="40">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
          <Heading textAlign="center"> Sign In</Heading>
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
                    Signin
                  </Button>
                  <Text>
                    New?{" "}
                    <Link color="teal.500" as={ReactLink} to={signupRoute}>
                      Create an account
                    </Link>
                  </Text>
                  {/* <Button size="md" height="48px" width="200px">
                Cancel
              </Button> */}
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
};
const basicFormSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("password is required"),
});
export default Signin;
