const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');


const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/test', (req, res) => {
    res.send('nice, you found the testing page, but keep this a secret!  ;) ');
});

app.get('/donate', (req, res) => {
    res.render('donate')
});

app.get('/profit', (req, res) => {
    res.render('profit');
});




app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Serving on port 4000')
})
