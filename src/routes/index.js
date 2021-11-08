import { Switch, Route } from "react-router-dom";
import Create from "../containers/Create";
import Update from "../containers/Update";
import Detail from "../containers/Detail";
import { GetCVById } from "../containers/GetCVById";
import GetListCV from "../containers/ListCV";
import React from "react";
import Login from "../containers/Login";
import Register from "../containers/Register";
import AuthencationRoute from "./authencationRoute";
import UnAuthencationRoute from "./unAuthencationRoute";
import CreateCoverLetter from "../containers/CoverLetter/Create";
import DetailCoverLetter from "../containers/CoverLetter/Detail";
import Letter from "../containers/CoverLetter/Letter";
export default ({ sessionLogin }) => (
  <Switch>
    <AuthencationRoute
      exact
      path="/"
      component={GetListCV}
      props={sessionLogin}
    />
    <UnAuthencationRoute path="/Login" component={Login} props={sessionLogin} />
    <UnAuthencationRoute
      path="/Register"
      component={Register}
      props={sessionLogin}
    />
    <UnAuthencationRoute
      path="/GetCVById/:Id"
      component={GetCVById}
      props={sessionLogin}
    />

    <AuthencationRoute path="/Create" component={Create} props={sessionLogin} />
    <AuthencationRoute path="/Update" component={Update} props={sessionLogin} />
    <AuthencationRoute
      path="/Detail/:Id"
      component={Detail}
      props={sessionLogin}
    />

    <AuthencationRoute
      path="/CoverLetter/Create"
      component={CreateCoverLetter}
      props={sessionLogin}
    />
    <AuthencationRoute
      path="/CoverLetter/Detail/:Id"
      component={DetailCoverLetter}
      props={sessionLogin}
    />
    <UnAuthencationRoute
      path="/CoverLetter/Letter/:Id"
      component={Letter}
      props={sessionLogin}
    />
  </Switch>
);
