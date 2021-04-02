const express = require('express');
const path = require('path');
const axios = require('axios');
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000;
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337'


app.use(express.static(path.join(__dirname, 'portfolio_frontend/build')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({name: 'jwt', keys: ['hgt']}));

app.post('/api/auth/local', async (req, res) => {

  const loginRes = await axios({
    method: 'POST',
    url: `${API_URL}/auth/local`,
    data: req.body,

  })
  const { jwt, user } = loginRes.data;
  req.session.jwt = jwt;
  console.log('req.session.jwt', req.session.jwt);
  const data = {user};
  res.send(data);
});
app.post('/api/auth/local/register', async (req, res) => {

  const signupRes = await axios({
    method: 'POST',
    url: `${API_URL}/auth/local/register`,
    data: req.body,
  });

  const { jwt, user} = signupRes.data;
  req.session.jwt = jwt;

  const data = { user };
  res.send(data);
});

app.get('/api/hi', (req, res) => {
  console.log('req.session.jwt', req.session.jwt);
});

app.put('/users/:userId', async (req, res) => {
  const jwtToken = req.session.jwt;
  const data = req.body;
  const { userId } = req.params;

  console.log('PUT /users/:userId');
  console.log('jwtToken', jwtToken);
  console.log('data', data);
  console.log('userId', userId);

  const updateUserRes = await axios({
    method: 'PUT',
    url: `${API_URL}/users/${userId}`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  })
});

app.get('/users/me', async (req, res) => {
  const { jwt } = req.session;
  const meRes = await axios({
    method: 'GET',
    url: `${API_URL}/users/me`,
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  res.send(meRes.data);
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/portfolio_frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
