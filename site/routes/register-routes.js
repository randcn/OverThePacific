// register routes

const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");
const { v1: uuidv1 } = require('uuid');
const bcrypt = require("bcrypt");
const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'sns_profile'});
const sns = new AWS.SNS({credentials: credentials, region: 'us-east-2'});

// sns status
router.get('/status', function (req, res) {
    res.json({status: "ok", sns: sns})
});

// Whenever navigate to /register, render the register view.
router.get("/register", function (req, res) {
    if (req.session.user) {
        res.locals.login = false;
    } else {
        res.locals.login = true;
    }
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

        // Email subscribe
        const emailSubscribe = req.body.emailSubscribe;
        if (emailSubscribe === "on") {
            let params = {
                Protocol: 'EMAIL',
                TopicArn: 'arn:aws:sns:us-east-2:864672954474:Over-The-Pacific',
                Endpoint: email
            };

            sns.subscribe(params, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    res.send(data);
                }
            });
        }


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
