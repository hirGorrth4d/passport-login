const express = require('express');

const router = express.Router()
const passport = require('passport');

const infoProcess = {
    args: process.argv.slice(2),
    platform: process.platform,
    node: process.version,
    memory: JSON.stringify(process.memoryUsage.rss()),
    exectPath: process.cwd(),
    processID: process.pid,
    path: process.argv[1]
}

router.get('/info', (req,res) => {
    const data = infoProcess;
    res.render('info', {data})
})



router.get('/', (req,res,next) => {
    res.render('index')
})
router.get('/signup', (req,res,next) => {
    res.render('signup')
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}) );

router.get('/signin', (req,res,next) => {
    res.render('signin')
})
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
} ))
router.get('/logout', (req,res,next) => {
    req.logout( (err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/');
    });
})
router.use((req,res,next)=> {
    isAuthenticated(req,res,next);
    next();
})


router.get('/profile', (req,res,next) => {
    res.render('profile')
})

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin')
}

module.exports = router