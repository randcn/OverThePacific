const database = require("./database.js");

// get all restaurants 
async function getAllRestaurants() {
    const db = await database;
    const restaurants = await db.query(
        "select * from restaurants"
    );
    //console.log(restaurants)
    return restaurants;
}

   
// Export functions.
module.exports = {
    getAllRestaurants,
};
