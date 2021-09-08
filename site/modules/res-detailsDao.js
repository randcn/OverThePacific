const database = require("./database.js");

async function getResDetails(business_id) {
    const db = await database;
    const name = await db.query( "select * from restaurants where business_id ="+business_id+"");
    return name;
}

async function getAllReviewsForRes(business_id) {
    const db = await database;
    const reviews = await db.query( "select a.name, b.text, b.business_id, b.date from users as a, reviews as b where a.user_id=b.user_id and b.business_id="+business_id+"");
    return reviews;
}


module.exports = {
    getAllReviewsForRes,
    getResDetails
};