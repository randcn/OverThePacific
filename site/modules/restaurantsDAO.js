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


// Returns a list of restaurants based on a query
async function getSearchedRestaurants(city, query) {
    const db = await database;
    dbQuery = "select * from restaurants where city = ? and name like \"%" + query + "%\""

    const restaurants = await db.query(dbQuery,[city]);

    return restaurants;
}

// Returns a list of restaurants based on a query
async function getSortedSearchedRestaurants(city, query, col, order) {
    const db = await database;
    dbQuery = "select * from restaurants where city = ? and name like \"%" + query + "%\" " + "order by " + col + " " + order

    const restaurants = await db.query(dbQuery,[city]);

    return restaurants;
}


// Export functions.
module.exports = {
    getAllRestaurants,
    getSearchedRestaurants,
    getSortedSearchedRestaurants,

};
