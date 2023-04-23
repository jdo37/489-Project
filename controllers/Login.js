const express = require('express');
const User = require('../models/user')
const sequelize = require('sequelize')
const router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/login', function(req, res, next) {
    if(req.query.msg){
        res.locals.msg = req.query.msg
      }
    res.render("Login")
})

router.get('/register', function(req, res, next) {
    if(req.query.msg){
        res.locals.msg = req.query.msg
      }
    res.render("Register")
})

router.post('/login', async function(req, res, next) {
    try {
        const user = await User.findByPk(req.body.username)
        const result = await bcrypt.compare(req.body.password, user.password)
         if (user !== null && result) {
             console.log("user: ")
             console.log(user)
             req.session.user = user
             res.redirect("/")
         }
         else {
             console.log(user)
             res.redirect('/login?msg=fail')
         }
    } catch (err) {
        res.redirect('/login?msg=fail')
    }
   
})

router.post('/register', function(req, res, next) {
    email = req.body.email
    username = req.body.username
    password = req.body.password
    gender = req.body.gender
    continent = req.body.continent
    var matched_users = User.findAll({
        where: sequelize.or(
            {username: username},
            {email: email}
        )
    })
    matched_users.then(function (users) {
        if(users.length == 0) {
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                user = await User.create({email: email, username: username, password: hash, gender: gender, continent: continent })
            })
            res.redirect('/login')
        } else {
            res.redirect('/register?msg=userexists')
        }
    })
    
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