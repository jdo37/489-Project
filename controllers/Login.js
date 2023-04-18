const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/login', function(req, res, next) {
    res.render("Login")
})

router.get('/register', function(req, res, next) {
    res.render("Register")
})

router.post('/login', async function(req, res, next) {
    const user = await User.findUser(req.body.username, req.body.password)
    if (user !== null) {
        console.log("logged in")
        res.redirect("/")
    }
    else {
        res.redirect('/login?msg=fail')
    }
})

router.post('/register', async function(req, res, next) {
    email = req.body.email
    username = req.body.username
    password = req.body.password
    gender = req.body.gender
    continent = req.body.continent
    user = await User.create({email: email, username: username, password: password, gender: gender, continent: continent })
    res.redirect('/')
})

module.exports = router