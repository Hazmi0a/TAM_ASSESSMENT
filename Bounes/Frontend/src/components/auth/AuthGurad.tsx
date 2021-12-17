import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { JWT, RootState } from "../../types";
import { signinRoute } from "../../Routes";
import jwt_decode from "jwt-decode";
import { checkJWTexp } from "../../utils";

interface AuthenticatedUserOnlyProps {
  loggedIn: boolean;
  authToken: string;
}
function mapStateToProps(state: RootState) {
  return {
    loggedIn: state.User.loggedIn,
    authToken: state.User.authToken,
  };
}
export function AuthGurad<T>(WrappedComponent: React.ComponentType<T>) {
  class FinalComponent extends React.Component<AuthenticatedUserOnlyProps> {
    public render() {
      const { loggedIn, authToken, ...otherProps } = this.props;
      if (loggedIn === false || loggedIn === undefined) {
        return <Redirect to={signinRoute} />;
      } else if (authToken.length > 0) {
        const jwt: JWT = jwt_decode(authToken);
        // check if user is logged in
        const exp = checkJWTexp(jwt.exp);
        // if the token is not expried, return the component
        if (exp) {
          return <Redirect to={signinRoute} />;
        }
      }
      return <WrappedComponent {...(otherProps as T)} />;
    }
  }
  return connect(mapStateToProps, null)(FinalComponent);
}
