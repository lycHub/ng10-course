const express = require('express');
const history = require('connect-history-api-fallback');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 8080;
app.use(history());
app.use(express.static('dist/xmly'));
app.use('/xmly', createProxyMiddleware({
  target: "http://localhost:3333",
  changeOrigin: true
}));
app.listen(PORT, function(err) {
  if (err) {
    console.log('err :', err);
  } else {
    console.log('Listen at http://localhost:' + PORT);
  }
});
