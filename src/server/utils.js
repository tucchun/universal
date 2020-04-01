import routes from "../routes";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-config";
import { getStore } from "./store/index";
import React from "react";

export const store = getStore();
let context = { css: [] }

export const render = req => {
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store));
    }
  });
  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          {routes.map(route => (
            <Route key={route.key} {...route} />
          ))}
        </StaticRouter>
      </Provider>
    );
    const html =  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>universal</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="./dist/browser.js"></script>
      <script>
        window.context = {
          state: ${JSON.stringify(store.getState())}
        }
      </script>
    </body>
    </html>
    `;
    return html;
  });
};
