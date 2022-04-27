const express = require("express");
const router = express.Router();
const types = require("../static/types");
const db = require("../routes/db");

let output;
function getPreference(openid, types) {
  return new Promise((resolve, reject) => {
    const sql = `select ${types} from userInfo where userOpenId = '${openid}' and ${types} != 1 and ${types} != -1;`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // console.log(result);
        resolve(result);
      }
    });
  });
  console.log(output);
}

module.exports = getPreference;
// db.query(sql, (err, result) => {
//     if (err) throw err;
//     if (result.length > 0) {
//         let preference = Object.values(JSON.parse(JSON.stringify(result)));
//         preference.forEach((p) => {
//             Object.keys(p).forEach((pname) => {
//                 output = pname;
//             })
//         })
//     }
// })
