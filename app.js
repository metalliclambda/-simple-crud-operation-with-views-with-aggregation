const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const queryRoutes = require('./routes/query');
const rootRout = require('./routes/root');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use('/query' , queryRoutes);

app.get('/' , rootRout);

mongoose.connect('mongodb://localhost:27017/RaikaTask-1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to DB');
        app.listen(3000, (req, res) => {
            console.log('Server started');
        });
    })
    .catch(err => {
        console.log(err);
    });
