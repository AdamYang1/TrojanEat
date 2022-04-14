// db import
const db = require('../cloud/db');
// 
const express = require('express');
const router = express.Router();

const selectVlg = 'select * from vlg';
const vlgResult = '';
router.get('/vlg', (req, res) => {
    res.writeHead(200, {
        'Content-Type': "text/html;charset=utf-8"
    });
    db.conn().query(selectVlg, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        vlgResult = JSON.stringify(rows);
        console.log(vlgResult);
        res.send(vlgResult);
        res.end();
    })
})

module.exports = router