const mariadb = require("mariadb");

// Add database login details below to connect to mariadb

const connection = mariadb.createConnection({
    host: 'webdata.ce9isjxip7t6.ap-southeast-2.rds.amazonaws.com',
    database: 'webdata',
    user: 'admin',
    password: 'waikato2021'
});


module.exports = connection;
