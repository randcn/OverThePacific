// login routes

const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");
const bcrypt = require("bcrypt");
const {people} = require("googleapis/build/src/apis/people");
const {google} = require('googleapis');


// process.env.http_proxy = 'http://18.167.37.172:448';
// process.env.HTTPS_PROXY = 'http://18.167.37.172:448';

// Whenever navigate to ANY page, make the "user" session object available to the
// Handlebars engine by adding it to res.locals.
router.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
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
});


const scope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

const auth = new google.auth.OAuth2(
    '844916575638-54td6dbsjmf1afa2vbjf6oti3s3g8uom.apps.googleusercontent.com',
    'g6tX-Cdm0LS4hymsNV-IaFV7',
    'http://localhost:5000/oauth2callback'
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

router.get("/oauth2callback",   async function (req, res) {

    // get code
    const code = req.query.code
    console.log(code);

    // get token
    const {tokens} = auth.getToken(code)
    auth.setCredentials(tokens);
    console.log(tokens);

    // get details

    const google = await getGoogleApi(auth);

    const me = google.people.get({
        resourceName: 'people/me',
        personFields: 'names,emailAddresses',
    });
    console.log(me);

    const userGoogleName = me.data.displayName;
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    let user = {
        user_id: userGoogleId,
        name: userGoogleName,
        email: userGoogleEmail,
        password: null,
        review_count: 0,
        token: tokens
    }
    console.log(user);

    await userDao.createUser(user);
    req.session.user = user;
    res.redirect("./?message=Successfully logged in!");

    // const actoken = tokens.access_token;
    // const reftoken = tokens.refresh_token;
    //
    // await plus.people.get({
    //     userId: 'me',
    //     auth: auth
    // }, function (err, userInfo) {
    //
    //     console.log(userInfo);
    //     const userGoogleName = "" + userInfo.displayName;
    //     const userGoogleId = "" + userInfo.id;
    //     const userGoogleEmail = "" + userInfo.emails;
    //     if (err) console.log(err);
    //     let user = {
    //             user_id: userGoogleId,
    //             name: userGoogleName,
    //             email: userGoogleEmail,
    //             password: null,
    //             review_count: 0,
    //             token: tokens
    //         }
    //     console.log(user);


    // });
    //
    // await userDao.createUser(user);
    // req.session.user = user;
    // res.redirect("./?message=Successfully logged in!");


    // async function main() {
    //     const client = new JWT({
    //         email: keys.client_email,
    //         key: keys.private_key,
    //         scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    //     });
    //     const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
    //     const res = await client.request({url});
    //     console.log(res.data);
    // }
    //
    // main().catch(console.error);

});

module.exports = router;
