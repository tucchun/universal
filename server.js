const express = require("express");
const { render } = require("./dist/server.js");
const app = express();
// const template = req => `
//  <!DOCTYPE html>
//  <html lang="en">
//  <head>
//    <meta charset="UTF-8">
//    <meta name="viewport" content="width=device-width, initial-scale=1.0">
//    <meta http-equiv="X-UA-Compatible" content="ie=edge">
//    <title>universal</title>
//  </head>
//  <body>
//    <div id="root">${render({ req })}</div>
//    <script src="./dist/browser.js"></script>
//    <script>
//      window.context = {
//        state: ${JSON.stringify(store.getState())}
//      }
//    </script>
//  </body>
//  </html>
//  `;
app.use(express.static("."));
app.get("*", function(req, res) {
  console.log("req", req.path);
  render(req).then(html => {
    console.log(html)
    res.send(html);
  }).catch(err => console.log(err))
  
});
//  app.use(express.static('dist'));

app.listen(3000, function() {
  console.log("app listening on port 3000!");
});
