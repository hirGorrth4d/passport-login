require('dotenv').config()
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const router = require('./src/routes/index');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const minimist = require('minimist');

//parametros
/*const argObjects = {
    alias : {
        p: 'puerto'
    },
    default: {
        p: 8080
    }
}
const args = minimist(process.argv.slice(2), argObjects)

const port = args.puerto
*/
const port = parseInt(process.argv[2]) || 8080
//init
const app = express()
require('./src/database');
require('./src/passport/local-auth');


//settings

app.set('views', path.join(__dirname,'src','views') );
app.engine('ejs', engine);
app.set('view engine', 'ejs')
//middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=> {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    next();
})

//routes
app.use('/', router);


app.get('/datos', (req,res) => {
    console.log(`port: ${port} -> fyh ${Date.now()}`)
    res.send(`Servidor express <span style="color:blueviolet;">(Nginx) </span> en ${port} - 
    <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
})



app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})