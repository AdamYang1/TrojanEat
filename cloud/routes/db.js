// import mysql
const mysql = require("mysql");
// import express, router
const express = require("express");
const router = express.Router();
// connect to the database
const db = mysql.createConnection({
	host: "35.224.73.150",
	user: "root",
	password: "Adam20030808!",
	database: "TrojanEatDB",
	multipleStatements: true,
});
db.connect((err) => {
	if (err) {
		console.error("连接失败：" + err.stack);
		return;
	}
	console.log("连接成功");
});
module.exports = db;
