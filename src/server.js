import routes from "./routes";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { matchRoutes, renderRoutes } from "react-router-config";
import { getStore } from "./store/index";
import React from "react";
import { Helmet } from 'react-helmet'

const store = getStore();

export const render = req => {
  let context = { css: [] }
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store));
    }
  });
  return Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          {/* {routes.map(route => (
            <Route key={route.key} {...route} />
          ))} */}
          {
            renderRoutes(routes)
          }
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic()
    const cssStr = context.css.length ? context.css.join('\n') : '';
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>universal</title>
      <style>${cssStr}</style>
      ${helmet.title.toString()}
      ${helmet.title.toString()}
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.context = {
          state: ${JSON.stringify(store.getState())}
        }
      </script>
      <script src="./dist/browser.js"></script>
    </body>
    </html>
    `;
    return html;
  });
};
