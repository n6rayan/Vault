const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started: http://localhost:${port}/`));
