const proxyServer = process.env.OKTA_SERVER;
const hoxy = require('hoxy');
const proxy = hoxy.createServer({
  reverse: proxyServer,
});

proxy.intercept({
  phase: 'response',
  url: '/oauth2/*',
  mimeType: 'application/json',
  as: 'json'
}, function(req, resp, cycle) {
  console.log(req.url);
  if (req.url.indexOf('/v1/token') > 0) {
    console.log('remove id_token from token response');
    delete resp.json.id_token;
    console.log(resp.json);
  }
});

proxy.listen(process.env.PORT);
