// sns publish model
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'sns_profile'});
const sns = new AWS.SNS({credentials: credentials, region: 'ap-southeast-2'});
const userDao = require("../modules/users-dao.js");
const schedule = require('node-schedule');
const https = require('https');

function publishSchedule() {
    // send post request to /publish every Thursday 18:30:30
    schedule.scheduleJob('30 30 18 * * 4',()=>{
        // send subject to subscribers
        const data = JSON.stringify({
            todo: 'publish'
        });
        const options = {
            // hostname: 'localhost',
            // port: 5000,
            // path: '/publish',
            url: 'https://revrest.xyz/publish',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {
                process.stdout.write(d)
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(data)
        req.end()

        console.log('publishSchedule:' + new Date());
    });
}

publishSchedule();

router.post('/publish', async function (req, res) {

    const topTen = await userDao.retrieveTopTenRestaurants();
    const message = `This week top 5 restaurants: \n ${topTen[0].name} :  ${(topTen[0].stars).substring(0,4)}    ${topTen[0].city} \n ${topTen[1].name} :  ${(topTen[1].stars).substring(0,4)}    ${topTen[1].city} \n ${topTen[2].name} :  ${(topTen[2].stars).substring(0,4)}    ${topTen[2].city} \n ${topTen[3].name} :  ${(topTen[3].stars).substring(0,4)}    ${topTen[3].city} \n ${topTen[4].name} :  ${(topTen[4].stars).substring(0,4)}    ${topTen[4].city} \n`
    let params = {
        Message: message,
        Subject: "Look new top 5 restaurants!",
        TopicArn: 'arn:aws:sns:ap-southeast-2:655678810326:Over-The-Pacific'
    };

    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });

});

module.exports = router;
