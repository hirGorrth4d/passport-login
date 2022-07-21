const express = require('express');

const router = express.Router()
const passport = require('passport');


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

router.get('/login', (req,res,next) => {
    
})
router.post('/login', (req,res,next) => {
    
})
router.get('/profile', (req,res,next) => {
    res.render('profile')
})



module.exports = router