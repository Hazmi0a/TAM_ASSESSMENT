import Signin from "./components/session/Signin";
import Signup from "./components/session/Signup";
import Home from "./pages/Home";

export const routes = [
  {
    path: "/signin",
    component: Signin,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/",
    component: Home,
    routes: [
      // {
      //   path: "/tacos/bus",
      //   component: Bus
      // },
      // {
      //   path: "/tacos/cart",
      //   component: Cart
      // }
    ],
  },
];

export const signinRoute = "/session/signin";
export const signupRoute = "/session/signup";
export const homeRoute = "/";
