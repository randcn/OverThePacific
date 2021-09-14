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

// get some restaurants 
async function getSearchedRestaurants(query) {
    const db = await database;
    dbQuery = "select * from restaurants where name like \"%" + query + "%\""
    console.log(dbQuery)
    const restaurants = await db.query(dbQuery);
    console.log(restaurants)
    return restaurants;
}


// Export functions.
module.exports = {
    getAllRestaurants,
    getSearchedRestaurants,
};
