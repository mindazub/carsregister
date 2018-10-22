const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const cars = require('./routes/api/cars');

app.use('/api/cars', cars);

const port = process.env.PORT || 5555;

app.listen(port, () => console.log(`Server started on port ${port}`));