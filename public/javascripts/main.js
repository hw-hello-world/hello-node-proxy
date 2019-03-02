const t = document.createTextNode("Hello Okta Proxy");
document.body.appendChild(t);

/*
const btn = document.createElement("BUTTON");
const t = document.createTextNode("Login Okta");
btn.appendChild(t);
document.body.appendChild(btn);
btn.onclick = function(e) {
  console.log('button click');
  var authClient = new OktaAuth({
    url: '/',
    //issuer: 'default',
    clientId: '0oayafatecC77csNu0g3',
    redirectUri: 'http://localhost:4001',
  });

  authClient.token.getWithRedirect({
  });
};
*/
