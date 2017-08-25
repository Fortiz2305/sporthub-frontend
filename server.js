const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('static'));
app.use(express.static('dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(8080, () => console.log('You can access your app in http://localhost:8080'));
