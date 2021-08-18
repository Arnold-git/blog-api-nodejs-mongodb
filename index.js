const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')


dotenv.config();


// database connection

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
     ()=>{
    console.log("Database connected");
});



// middleware

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);


app.get("/", (req, res) =>{
    return res.status(200).json({
        message:"Welcome social media API project"
    })
});


const port = process.env.PORT || 8080;
app.listen(8080, function () {
    console.log(`Backend server running on ${port}...`);
});
