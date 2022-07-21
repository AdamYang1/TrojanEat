// import express, router
const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
//!!! import wxlogin
const Fly = require("flyio/src/node");
const fly = new Fly();

// import db
const db = require("../cloud/routes/db");

const port = process.env.PORT || 5000;

//!!! get data
// ======================== get menu ===============================================
const menu = require("../cloud/routes/menu");
app.use("/menu", menu);

// // ======================== get dh ranking ===============================================
// const drank = require("../cloud/routes/drank");
// app.use("/drank", drank);

// ======================== personal userinfo ==============================================
const personal = require("../cloud/routes/personal");
app.use("/personal", personal);

// ========================= get recommend =========================================
const recommend = require("../cloud/routes/recommend");
app.use("/recommend", recommend);

// ========================= get allergen =========================================
const allergen = require("../cloud/routes/allergen");
app.use("/allergen", allergen);

// ========================= process data =========================================
const procdata = require("./routes/procdata");
app.use("/procdata", procdata);

// ========================= process data =========================================
const vegan = require("./routes/vegan");
app.use("/vegan", vegan);

// ========================= verify identity =========================================
// get user's unique openid to verify identity
app.use("/getOpenId", async (req, res, next) => {
	let code = req.query.code;
	// console.log(code);
	let appId = "wx38f2889c7ca5fd55";
	let appSecrete = "afebca8e3c9e0cede2bdfed71cc3ef9f";
	let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecrete}&js_code=${code}&grant_type=authorization_code`;
	let result = await fly.get(url);
	// console.log(result);
	let openId = JSON.parse(result.data).openid;
	// console.log(openId);
	res.send(openId);
	next();
});
// ============================ create server =============================================
app.listen(port, () => {
	console.log("listening.....");
});

// disconnect database
// connection.end();
