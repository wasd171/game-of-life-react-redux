require("babel-core/register");

var server = require('./src/server.jsx').default;

const PORT = process.env.PORT || 3017;

server.listen(
	PORT,
	function () {
		console.log('Server is listening at port', PORT)
	}
);