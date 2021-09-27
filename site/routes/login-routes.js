// login routes

const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");
const bcrypt = require("bcrypt");
const {google} = require('googleapis');
const svgCaptcha = require('svg-captcha');
const { v1: uuidv1 } = require('uuid');
// process.env.http_proxy = 'http:// 18.167.19.20:7890';
// process.env.HTTPS_PROXY = 'http:// 18.167.19.20:7890';

// Whenever navigate to ANY page, make the "user" session object available to the
// Handlebars engine by adding it to res.locals.
router.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});


// generate verification code

router.get("/cap", function (req, res) {
    const captcha = svgCaptcha.create({
        size: 4,
        fontSize: 45,
        noise: 1,
        width: 120,
        height: 36,
        color: true,
        background: '#ccc'
    })

    req.session.verifyCode = captcha.text
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(String(captcha.data));

});

// / Whenever we navigate to /login, if we're already logged in, redirect to "/".
// // Otherwise, render the login view
router.get("/login", function (req, res) {
    res.locals.login= true;
    res.locals.title = "Login";
    res.locals.urlGoogle = url;

    if (req.session.user) {
            res.redirect("/");
    } else {
        res.locals.message = req.query.message;
        res.render("login");
    }

});



// Whenever POST to /register, login.
router.post("/login", async function (req, res) {
    res.locals.login = true;
    res.locals.title = "Site";
    // Get the email and password submitted in the form
    const email = req.body.email;
    const password = req.body.password;
    const verifyCode = req.body.verifyCode;
    console.log(verifyCode);
    console.log(req.session.verifyCode);

    // check verify code
    if (verifyCode.toLowerCase() === (req.session.verifyCode).toLowerCase()) {
        // check if email exists
        let emailAll = await userDao.retrieveAllEmail();
        let isExist = emailAll.some(function (value, index, array) {
            return (value.email === email);
        });

        if (isExist) {
            // Find a matching user in the database
            const user = await userDao.retrieveUserByEmail(email);

            // check if there is a matching user...
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                req.session.user = user;
                res.redirect("./?message=Successfully logged in!");
            } else {
                res.redirect("./login?message=Authentication failed!");
            }
        } else {
            res.redirect("./login?message=User does not exist!");
        }
    } else {
        res.redirect("./login?message=Verification code is wrong!");
    }

});



const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/plus.me'
];

const auth = new google.auth.OAuth2(
    '844916575638-54td6dbsjmf1afa2vbjf6oti3s3g8uom.apps.googleusercontent.com',
    'g6tX-Cdm0LS4hymsNV-IaFV7',
    'https://revrest.xyz/oauth2callback'
);


// generate an url to google
const url = auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scope
});

function getGoogleApi(auth) {
    return google.people({ version: 'v1', auth });
}

router.get("/oauth2callback",  async function (req, res) {

    // get code
    const code = req.query.code
    console.log(code);

    // get token
    const {tokens} = auth.getToken(code)
    auth.setCredentials(tokens);
    console.log(tokens);

    // const google = google.people('v1');
    const googleApi = google.people('v1');
    googleApi.people.get({
        resourceName: 'people/me',
        personFields: 'names,emailAddresses',
        auth: auth,
    }, (err, me) => {
        if (err) {
            console.log(err);
        } else {
            console.log(me.data);
            const userGoogleName = me.data.names[0].displayName;
            const userGoogleEmail = me.data.emailAddresses[0].value;
            const userID = uuidv1();
            let user = {
                user_id: userID,
                name: userGoogleName,
                email: userGoogleEmail,
                password: null,
                review_count: 0,
                token: tokens.access_token
            }
            console.log(user);

            userDao.createUser(user);
            req.session.user = user;
            res.redirect("./?message=Successfully logged in!");

        }
    })



});

module.exports = router;
