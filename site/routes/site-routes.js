// Setup express router
const express = require("express");
const router = express.Router();

// Access to DAO files


const path = require("path");
const fs = require("fs");

// Whenever we navigate to ANY page, make the "user" session object available to the
// Handlebars engine by adding it to res.locals.
router.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// Route handlers

module.exports = router;