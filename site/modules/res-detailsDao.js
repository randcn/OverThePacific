const database = require("./database.js");

async function getResDetails(business_id) {
    const db = await database;
    const name = await db.query( "select * from restaurants where business_id ="+business_id+"");
    return name;
}

async function getAllReviewsForRes(business_id) {
    const db = await database;
    const reviews = await db.query( "select a.name, a.user_id, b.text, b.business_id, b.date from users as a, reviews as b where a.user_id=b.user_id and b.business_id="+business_id+"");
    return reviews;
}

async function insertReview(user_id, business_id, stars, text) {
    const db = await database;
    let result;
    result = await db.query( "insert into reviews (user_id, business_id, stars, text) VALUES ("+user_id+","+business_id+", "+stars+", "+text+")");
    return result;
}


module.exports = {
    getAllReviewsForRes,
    getResDetails,
    insertReview
};