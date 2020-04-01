import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import { Route } from "react-router-dom";
import { renderRoutes } from 'react-router-config'
import { getClientStore } from "./store/index";
import routes from "./routes";
// import { renderToString } from 'react-dom/server'
// import App from './App'

const App = () => (
  <Provider store={getClientStore()}>
    <BrowserRouter>
      {
        renderRoutes(routes)
      }
    </BrowserRouter>
  </Provider>
);

// const str = renderToString(<App name="tucchun" />)
// console.log('str', str)

hydrate(<App />, window.document.getElementById("root"));
