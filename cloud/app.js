// import express, router
const express = require('express');
const router = express.Router();
const app = express();
// import wxlogin
const Fly = require('flyio/src/node');
const fly = new Fly;
// import mysql
const mysql = require('mysql');

// import db
const db = require('../cloud/routes/db')

// get data
// get all menu with specific time
app.get('/dhall/:dhall/date/:date/mealtime/:mealtime',
    (req, res) => {
        const { dhall, date, mealtime } = req.params;
        let sql = `select time, meal_time, food from ${dhall} where time = '${date}' and meal_time = '${mealtime}'`;
        // console.log(sql);
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
            res.end();
        })
    })

// add new userinfo
app.post('/adduser/openid/:openid',
    (req, res) => {
        const { openid } = req.params;
        let sql = `insert into userInfo (userOpenId) values (${openid})`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.end();
        })
    })

// add new user !!!like!!! properties
app.put('/like/openid/:openid/options/:options',
    (req, res) => {
        const { openid, options } = req.params;
        const optionsArr = options.split(',');
        for (let i = 0; i < optionsArr.length; ++i) {
            let sql = `update userInfo set ${optionsArr[i]} = 1 where userOpenId = '${openid}'`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                res.end();
            })
        }
        // console.log(options.split(','));
        // let sql = `update userInfo set `
    })

// get user's unique openid to verify identity
app.use('/getOpenId', async (req, res, next) => {
    let code = req.query.code;
    let appId = 'wx38f2889c7ca5fd55';
    let appSecrete = 'afebca8e3c9e0cede2bdfed71cc3ef9f';
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecrete}&js_code=${code}&grant_type=authorization_code`;
    let result = await fly.get(url);
    let openId = JSON.parse(result.data).openid;
    res.send(openId);
    next();
})

app.listen(5000, () => {
    console.log('listening.....');
})


// disconnect database
// connection.end();