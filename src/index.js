import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import ManagerLayout from "layouts/manager";
import SupportLayout from "layouts/support";
import MessLayout from "layouts/messenger";
import CallLayout from "layouts/call";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import LiveStreamLayout from "layouts/livestream";
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Route path={`/rtl`} component={RTLLayout} />
            <Route path={`/manager`} component={ManagerLayout} />
            <Route path={`/support`} component={SupportLayout} />
            <Route path={`/messenger`} component={MessLayout} />
            <Route path={`/call`} component={CallLayout} />
            <Route path={`/livestream`} component={LiveStreamLayout} />
            <Redirect from="/" to="/admin" />
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
