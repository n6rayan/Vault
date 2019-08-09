const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.listen(port, () => console.log(`Server started: http://localhost:${port}/`));