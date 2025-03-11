require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {contestNotifier,start}=require('./jobs/contestNotifier')

const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/contests', require('./routes/contest.routes'));


// start();

app.listen(5000, () => console.log(' Server running on port 5000'));


