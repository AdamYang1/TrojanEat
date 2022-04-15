const express = require('express');
const router = express.Router();
const db = require('../routes/db');
const types = require('../static/types');
// !!!!! first time using !!!!!!
// add new userinfo (first time using)
router.post('/newuser/openid/:openid',
    (req, res) => {
        const { openid } = req.params;
        let sql = `insert into userInfo (userOpenId) values ('${openid}');`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.end();
        })
    });


// update new user preference (first time using)
router.put('/newuser/openid/:openid',
    (req, res) => {
        const { openid } = req.params;
        for (let i = 0; i < 15; ++i) {
            let sql = `update userInfo set ${types[i]} = 0 where userOpenId = '${openid}';`;
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        }
        res.end();
    });

// ===================== after the first time :) ==========================
// like!!! dishes
router.put('/customer/openid/:openid/like/options/:options',
    (req, res) => {
        const { openid, options } = req.params;
        const optionsArr = options.split(',');
        for (let i = 0; i < 15; ++i) {
            let sql = `update userInfo set ${types[i]} = 0 where userOpenId = '${openid}' and ${types[i]} = 1;`
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        }
        for (let i = 0; i < optionsArr.length; ++i) {
            let sql = `update userInfo set ${optionsArr[i]} = 1 where userOpenId = '${openid}'`;
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        }
        // console.log(options.split(','));
        // let sql = `update userInfo set `
        res.end();
    });
// dislike!!! dishes
router.put('/customer/openid/:openid/dislike/options/:options',
    (req, res) => {
        const { openid, options } = req.params;
        const optionsArr = options.split(',');
        for (let i = 0; i < 15; ++i) {
            let sql = `update userInfo set ${types[i]} = 0 where userOpenId = '${openid}' and ${types[i]} = -1;`
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        }
        for (let i = 0; i < optionsArr.length; ++i) {
            let sql = `update userInfo set ${optionsArr[i]} = -1 where userOpenId = '${openid}'`;
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        }
        // console.log(options.split(','));
        // let sql = `update userInfo set `
        res.end();
    });
// dinning hall ranking
router.put('/customer/openid/:openid/dhranking/:dhranking',
    (req, res) => {
        const { openid, dhranking } = req.params;
        const dhArr = dhranking.split(',');
        for (let i = 0; i < 3; ++i) {
            let sql = `update userInfo set ${dhArr[i]} = ${i + 1} where userOpenId = '${openid}'`;
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        }
        res.end();
    })
module.exports = router;