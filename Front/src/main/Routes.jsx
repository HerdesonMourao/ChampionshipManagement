import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { isAuthenticated } from "../services/auth";
import Home from "../components/home/Home";
import UserCrud from "../components/user/userCrud";
import TeamCrud from "../components/teams/teamCrud";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Championship from "../components/championship/championship";

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

export default (props) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/users" component={UserCrud} />
    <Route path="/teams" component={TeamCrud} />
    <Route path="/championship" component={Championship} />
    <PrivateRoute path="/signup" component={SignUp} />
    <PrivateRoute exact path="/signIn" component={SignIn} />
  </Switch>
);
