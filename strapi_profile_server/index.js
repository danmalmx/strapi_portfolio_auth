const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'portfolio_frontend/build')));
app.use(bodyParser.json());

app.post('/api/auth/local', (req, res) => {
  console.log('POST /api/auth/local', req.body);
})
app.post('/api/auth/local/register', (req, res) => {
  console.log('POST /api/auth/local/register req.body', req.body);
})

app.get('/api/hi', (req, res) => {
  res.send('Hello World!')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/portfolio_frontend/build/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
