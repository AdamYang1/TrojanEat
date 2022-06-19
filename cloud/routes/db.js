// import mysql
const mysql = require("mysql");
// import express, router
const express = require("express");
const router = express.Router();
// connect to the database
const db = mysql.createPool({
	host: "us-cdbr-east-05.cleardb.net",
	user: "b12f50cb8ad7c6",
	password: "89c03a83",
	database: "heroku_e1b49fc3ea33877",
	multipleStatements: true,
});
/* db.connect((err) => {
	if (err) {
		console.error("连接失败：" + err.stack);
		return;
	}
	console.log("连接成功");
}); */
module.exports = db;
