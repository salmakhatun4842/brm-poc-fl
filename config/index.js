require('dotenv').config();
module.exports = {
	server: {
		host: process.env.HOST,
		port: process.env.PORT,
	},
	database: {
		uri: process.env.MONGODB_URI,
	}
};
