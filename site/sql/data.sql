

DROP TABLE IF EXISTS restaurants;
CREATE TABLE
IF NOT EXISTS restaurants
(
    business_id int auto_increment,
    name VARCHAR
(20),
    address VARCHAR
(200),
    city VARCHAR
(50),
    state VARCHAR
(50),
    review_count int,
    stars VARCHAR
(10),
    country VARCHAR
(50),
    latitude VARCHAR
(100),
    longitude VARCHAR
(100),
    categories VARCHAR
(200),
    time VARCHAR
(200),
    
    PRIMARY KEY
(business_id)
    );

DROP TABLE IF EXISTS users;
CREATE TABLE
IF NOT EXISTS users
(
    user_id int auto_increment,
    name VARCHAR
(20),
    review_count int,

    PRIMARY KEY
(user_id)
    );

DROP TABLE IF EXISTS reviews;
CREATE TABLE
IF NOT EXISTS reviews
(
    review_id int auto_increment,
    user_id VARCHAR
(20),
    business_id VARCHAR
(20),
    stars VARCHAR
(20),
    text VARCHAR
(1000),
    data VARCHAR
(50),

    PRIMARY KEY
(review_id)
    );
