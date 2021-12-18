import * as React from "react";
import {
  ChakraProvider,
  VStack,
  theme,
  Input,
  FormControl,
  Button,
} from "@chakra-ui/react";
import {
  Field,
  Form,
  FormikErrors,
  FormikProps,
  isString,
  withFormik,
} from "formik";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Header from "./components/Header";
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Router,
  Switch,
  withRouter,
} from "react-router-dom";
import Signin from "./components/session/Signin";
import Signup from "./components/session/Signup";
import { AuthGurad } from "./components/auth/AuthGurad";
import { signinRoute, signupRoute } from "./Routes";

// The type of props MyForm receives
interface SearchProps {
  initialCommand?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

interface FormValues {
  command: string;
}
interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form>
      <VStack spacing={8}>
        <h1>{message}</h1>
        <Field type="search" name="command">
          {({ field }: { field: any }) => (
            <FormControl>
              {/* <InputRightElement children={<SearchIcon color="gray.300" />} /> */}
              <Input {...field} id="command" placeholder="command" />
            </FormControl>
          )}
        </Field>
        {/* {touched.command && errors.command && <div>{errors.command}</div>} */}

        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Search
        </Button>
      </VStack>
    </Form>
  );
};

// Wrap our form with the withFormik HoC
const SearchForm = withFormik<SearchProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      command: props.initialCommand || "",
    };
  },
  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.command) {
      errors.command = "Required";
    } else if (!isString(values.command)) {
      errors.command = "Invalid email address";
    }
    return errors;
  },

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    // do submitting things
    console.log(values);
    setSubmitting(false);
    resetForm();
  },
})(InnerForm);
// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {
  pathname: string;
};

// Your component own properties
type SomeComponentProps = RouteComponentProps;

const App: React.FC<SomeComponentProps> = ({ history, location }) => {
  return (
    <>
      {console.log(process.env)}
      {location.pathname === signupRoute ||
      location.pathname === signinRoute ? (
        <div />
      ) : (
        <Header />
      )}
      <Switch>
        <Route exact path="/" component={AuthGurad(Home)} />
        <Route path="/session/signup" component={Signup} />
        <Route path="/session/signin" component={Signin} />
      </Switch>
      {/* <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <Logo h="40vmin" pointerEvents="none" />
              <SearchForm message="Search for Commands" />
            </VStack>
          </Grid>
        </Box> */}
    </>
  );
};

export default withRouter(App);
