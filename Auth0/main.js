const express = require('express');
const path = require('path');
const { auth } = require('express-openid-connect')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(
  auth({
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    secret: process.env.SESSION_SECRET,
    authRequired: false,
    auth0Logout: true,
  }),
);

app.get('/sign-up', (req, res) => {
  res.oidc.login({
    authorizationParams: {
      screen_hint: 'signup',
    },
  });
