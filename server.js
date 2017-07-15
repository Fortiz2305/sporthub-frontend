const express = require('express');

const app = express();

app.use(express.static('static'));
app.use(express.static('dist'));

app.listen(8080, () => console.log('You can access your app in http://localhost:8080'));
