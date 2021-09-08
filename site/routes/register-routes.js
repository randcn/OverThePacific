// register routes

const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");
const { v1: uuidv1 } = require('uuid');
const bcrypt = require("bcrypt");


// Whenever navigate to /register, render the register view.
router.get("/register", function (req, res) {
    res.locals.title = "Register";
    res.locals.message = req.query.message;
    res.render("register");
});

// Whenever POST to /register, create a new account.
router.post("/register", function(req, res) {

        // get parameter from form
        const name = req.body.username;
        const email = req.body.email;
        const password1 = req.body.password1;
        const password2 = req.body.password2;


        // check password
        if (password1 !== password2){
            res.redirect('./register?message=Password does not match!');

        } else {
            const userID = uuidv1();
            // hash and salt password
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const password = bcrypt.hashSync(password1, salt);

            let user = {
                user_id: userID,
                name: name,
                email: email,
                password: password,
                review_count: 0,
                token: null
            }

            userDao.createUser(user);

            res.redirect('./login?message=Account created successfully!');
        }

});

module.exports = router;
