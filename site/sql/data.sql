

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
    user_id VARCHAR(50), -- uuid_timestamp
    email VARCHAR(50),
    name VARCHAR
(20),
    password VARCHAR(100), -- hashed and salted
    review_count int,
    token VARCHAR(100) , -- uuid_random

    PRIMARY KEY
(user_id)
    );

ALTER TABLE users ADD email VARCHAR(50);
ALTER TABLE users ADD password VARCHAR(100);
ALTER TABLE users ADD token VARCHAR(200);

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

insert into restaurants values
(223, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(224, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(225, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(226, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(227, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(228, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(229, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(230, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(231, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(232, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(233, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(234, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(235, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(236, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(237, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(238, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(239, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(240, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(241, '111', '111', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111'),
(242, '222', '222', 'Las Vegas', '111', '111', '111', '111', '111', '111', '111', '111');

