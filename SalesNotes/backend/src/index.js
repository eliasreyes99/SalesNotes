const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());
app.use(routes);

app.listen(3000)
console.log('port 3000')