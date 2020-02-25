// import React from "react";

import Home from "./container/Home";
import Login from "./container/Login";
import App from './container/App'



// export default function Routes() {
//   return (
//     <Switch>
//       <Route path="/" exact>
//         <Home />
//       </Route>
//       <Route path="/login">
//         <Login />
//       </Route>
//     </Switch>
//   );
// }


export default [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: 'home'
      },
      {
        path: '/login',
        component: Login,
        exact: true,
        key: 'login'
      }
    ]
  },

]
