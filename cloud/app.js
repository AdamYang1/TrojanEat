// import express, router
const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json())
// import wxlogin
const Fly = require('flyio/src/node');
const fly = new Fly;

// import db
const db = require('../cloud/routes/db');
// get data
// ======================== get menu ===============================================
// get all menu with specific time
const menu = require('../cloud/routes/menu');
app.use('/menu', menu);

// ======================== personal userinfo ==============================================
// add new userinfo
const personal = require('../cloud/routes/personal');
app.use('/personal', personal);

// ========================= get recommend =========================================
const recommend = require('../cloud/routes/recommend');
app.use('/recommend', recommend);




// ========================= verify identity =========================================
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
});
// ============================ create server =============================================
app.listen(5000, () => {
    console.log('listening.....');
});


// disconnect database
// connection.end();