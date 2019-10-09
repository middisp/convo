const User = require('../models/user');

exports.postAddUser = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	const user = new User(name, email, password);
	message.save()
		.then(result => res.send(result))
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.getAllUsers = (req, res, next) => {
	const channelId = req.params.channelId;

	user.fetchAll(channelId)
		.then(users => {
			res.render({
				users: users
			})
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.putUpdateUser = (req, res, next) => {
	const userId = req.body.userId;

	User.updateUser(userId)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.deleteUser = (req, res, next) => {
	const userId = req.body.userId;

	User.deleteUser(userId)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}