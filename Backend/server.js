const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const authRoute = require('./routes/route.auth');
const adminRoute = require('./routes/route.admin');
const articleRoute = require('./routes/route.article');
const userRoute = require('./routes/route.user');
const commentRoute = require('./routes/route.comment')
const likeRoute = require('./routes/route.like')
const cors = require('cors');

app.use(express.json());

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connected to db!'))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:50970'
}))

app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/article', articleRoute);
app.use('/user', userRoute);
app.use('/comment', commentRoute);
app.use('/likes', likeRoute)


app.listen(3000, () => console.log("Server up and running"));