const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/login', function(req, res, next) {
    res.render("Login")
})

router.get('/register', function(req, res, next) {
    res.render("Register")
})

router.post('/login', function(req, res, next) {
    username = req.body.username
    password = req.body.password
    if (username == "jason" && password == "1234") {
        console.log("logged in")
        res.redirect("/")
    }
    else {

    }
})

router.post('/register', function(req, res, next) {
    email = req.body.email
    username = req.body.username
    password = req.body.password
    user = new User(email, username, password)
    console.log(user)
    res.redirect('/')
})

module.exports = router