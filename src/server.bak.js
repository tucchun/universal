import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Provider } from 'react-redux'
import {getStore} from './store/index'
import routes from "./routes";

export const store = getStore()

const App = ({ req }) => (
  <Provider store={store}>
    <StaticRouter location={req.path}>
      {
        routes.map(route => <Route key={route.key} {...route} />)
      }
    </StaticRouter>
  </Provider>
);

export function render(props) {
  return renderToString(<App {...props} />);
}
