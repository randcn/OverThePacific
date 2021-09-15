// logout routes
const express = require("express");
const router = express.Router();

// Whenever we navigate to /logout, delete any user object from the session. Then,
// redirect to "/login", supplying a "logged out successfully" message.
router.get("/logout", function (req, res) {
    res.locals.title = "Site";

    if (req.session.user) {
        delete req.session.user;
    }
    res.redirect("/login?message=Successfully logged out!");

});

module.exports = router;
