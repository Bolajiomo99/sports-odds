const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const favicon = require('serve-favicon');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const MongoDBStore = require("connect-mongo")(session);

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/gambitgames';

//'mongodb://localhost:27017/yelp-camp'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'),
    path.join(__dirname, 'views/users/'),
    path.join(__dirname, 'views/partials/'),
    path.join(__dirname, 'views/layouts/'),   
        ]);

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24*60*60
});


const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
store.on("error", function(e){
    console.log('session store error', e)
})


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    next();
})


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('login')
    }
    next();
}


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
//     const { username = 'Annaymous' } = req.query;
//     req.session.username = username;
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username, email } = req.body;
    // const hash = awa
    const user = new User({ 
        username, 
        password, 
        email,
        text:password
     })
    await user.save();
    console.log(user)
    req.session.user_id = user._id;
    res.redirect('/')
    
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/logout', (req,res) => {
    req.session.user_id = null;
    res.redirect('/login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // res.send(req.body)
    try{
    const foundUser = await User.findAndValidate(username, password);
        if (foundUser) {
            req.session.user_id = foundUser._id;
            res.redirect('/');
        }else{
            res.redirect('/login')
        }

    }catch (e){
        req.flash('error', e.message)
        res.redirect('/login')
    }
    
})

app.post('/logout', (req, res) => {
    // req.session.user_id = null;
    req.session.destroy();
    // req.session.destroy();
    res.redirect('/login');
})


app.get('/gamestoday', requireLogin, (req, res) => {
    if (!req.session.user_id){
        res.redirect('/login')
    }
    res.render('gameoutput')
})

app.get('/test', (req, res) => {
    res.send('nice, you found the testing page, but keep this a secret!  ;) ');
});

app.get('/donate', (req, res) => {
    res.render('donate')
});

app.get('/profit', (req, res) => {
    res.render('profit');
});



app.get('/city', (req,res) => {
    res.render('city')
})




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
