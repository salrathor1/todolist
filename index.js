const express = require ('express');
const hbs = require ('express-handlebars');
const path = require ('path');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config(); 
const mongoose = require('mongoose');
const Item = require('./models/item');
const indexRouter = require('./routes/indexRouter');

mongoose.connect(`${process.env.databaseURL}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', '.hbs');          //adds hbs to filenames
app.use('/', indexRouter);



app.listen(3005, () => {
    console.log("server is running on port 3005")
})