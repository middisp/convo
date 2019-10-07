const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	mongoClient.connect(
		'mongodb+srv://admin:LdIH8UGOB55XIkPP@convo-xiryh.azure.mongodb.net/test?retryWrites=true&w=majority',
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
		throw err;
	});
};

const getDb = () => {
	if (_db) {
		return db;
	}
	throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
