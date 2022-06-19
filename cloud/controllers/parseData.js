const { spawn } = require("child_process");

function parseData(year, month1, day1, month2, day2) {
	const childPython = spawn("python", [
		"menuSpider.py",
		`${year}`,
		`${month1}`,
		`${day1}`,
		`${month2}`,
		`${day2}`,
	]);
	childPython.stdout.on("data", (data) => {
		console.log(`${data}`);
	});
}

module.exports = parseData;
