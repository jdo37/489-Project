const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user')

router.get('/login', function(req, res, next) {
    res.render("Login")
})

router.get('/register', function(req, res, next) {
    res.render("Register")
})

router.post('/login', async function(req, res, next) {
    const user = await User.findUser(req.body.username, req.body.password)
    if (user !== null) {
        req.session.user = user
        console.log(req.session.user)
        res.redirect("/")
    }
    else {
        res.redirect('/login?msg=fail')
    }
})

router.post('/register', function(req, res, next) {
    email = req.body.email
    username = req.body.username
    password = req.body.password
    gender = req.body.gender
    continent = req.body.continent
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        user = await User.create({email: email, username: username, password: hash, gender: gender, continent: continent })
        console.log(user)
    })
    res.redirect('/login')
})

router.get('/logout', function(req, res, next) {
    if(req.session.user) {
        req.session.destroy()
        res.redirect("/?msg=logout")
    } else {
        res.redirect("/")
    }
})
module.exports = router