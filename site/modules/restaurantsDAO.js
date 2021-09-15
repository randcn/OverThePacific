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
async function getSearchedRestaurants(query) {
    const db = await database;
    dbQuery = "select * from restaurants where name like \"%" + query + "%\""

    const restaurants = await db.query(dbQuery);

    return restaurants;
}

// Returns a list of restaurants based on a query
async function getSortedSearchedRestaurants(query, col, order) {
    const db = await database;
    dbQuery = "select * from restaurants where name like \"%" + query + "%\" " + "order by " + col + " " + order

    const restaurants = await db.query(dbQuery);

    return restaurants;
}


// Export functions.
module.exports = {
    getAllRestaurants,
    getSearchedRestaurants,
    getSortedSearchedRestaurants,
};
