const database = require("./database.js");

/**
 * Inserts the given user into the database.
 *
 * @param user the user to insert
 */
async function createUser(user) {
    const db = await database;

    const result = await db.query(
        `insert into users (user_id, email, name, password, review_count, token) 
            values(?, ?, ?, ?, ?, ?)`,
        [user.user_id, user.email, user.name, user.password, user.review_count, user.token]);

}

/**
 * Gets the user with the given email from the database.
 * If there is no such user, undefined will be returned.
 *
 * @param {string} email the email of the user to get.
 */
async function retrieveUserByEmail(email) {
    const db = await database;

    const user = await db.query(
        "select * from users where email = ?",
        [email]);

    return user[0];
}

/**
 * Gets all emails.
 */
async function retrieveAllEmail() {
    const db = await database;

    return await db.query(
        "select * from users ");
}

module.exports = {
    createUser,
    retrieveUserByEmail,
    retrieveAllEmail

};
