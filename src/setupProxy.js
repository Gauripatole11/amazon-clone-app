const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // Your API endpoint
    createProxyMiddleware({
      target: 'http://localhost:3000/payment',  // Your API server address
      changeOrigin: true,
    })
  );
};
