const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const { MONGO_CONNECTION } = require('../config');

let _db;

const mongoConnect = (callback) => {
	mongoClient.connect(
		MONGO_CONNECTION,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	).then((client) => {
		console.log('Connected');
		_db = client.db();
		callback();
	}).catch(err => {
		console.log(`Error: ${err}`);
		return new Error(err);
	});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
