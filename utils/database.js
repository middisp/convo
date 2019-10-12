const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	mongoClient.connect(
		'mongodb+srv://admin:YR05kIhsojs2Q010@convo-xiryh.azure.mongodb.net/test?retryWrites=true&w=majority',
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
		return _db;
	}
	throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
