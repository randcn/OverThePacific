const mariadb = require("mariadb");

// Add database login details below to connect to mariadb

const connection = mariadb.createConnection({
    host: 'database-2.cwiemsutuik3.ap-southeast-2.rds.amazonaws.com',
    database: 'otp',
    user: 'admin',
    password: 'Z9cQxiTZAr2TyXoErueIjgupN7Rq0O4D'
});


module.exports = connection;
