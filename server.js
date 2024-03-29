// IMPORT ENV VARIABLE 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


// IMPORTS
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


    // routers
    const indexRouter = require('./routes/index');
    const authorRouter = require('./routes/authors');   
    const bookRouter = require('./routes/books');



// CONFIGURATION
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride('_method'));

    // use routers
    app.use('/', indexRouter);
    app.use('/authors', authorRouter);
    app.use('/books', bookRouter);



//DATABASE CONNECTION
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,
    useUnifiedTopology: true }
 );

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));




// WEB/SERVER CONNECTION
app.listen(process.env.PORT || 3000);

