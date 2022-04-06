const express = require('express')
const Fly = require('flyio/src/node')
const fly = new Fly;
const jwt = require('jsonwebtoken')
const app = express()

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