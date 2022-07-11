import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { isAuthenticated } from "../services/auth";
import Home from "../components/home/Home";
import UserCrud from "../components/user/userCrud";
import TeamCrud from "../components/teams/teamCrud";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signIn", state: { from: props.location } }}
        />
      )
    }
  />
);

const Route = () => (
  <Switch>
    <PrivateRoute path="/signup" component={SignUp} />
    <PrivateRoute exact path="/signIn" component={SignIn} />
  </Switch>
);
export default Routes;
