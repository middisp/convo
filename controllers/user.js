const User = require('../models/user');

exports.postAddUser = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	const user = new User(name, email, password);
	user.save()
		.then(result => res.send(result))
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
};

exports.getUser = (req, res, next) => {
	const id = req.params.id;

	User.getUser(id)
		.then(user => {
			const data = { pageTitle: 'User', user: user }
			console.log(data);
			res.render('user', data);
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		})
};

exports.getAllUsers = (req, res, next) => {
	const channel_id = req.params.channel_id;

	User.fetchAll(channel_id)
		.then(users => {
			res.render({
				users: users
			})
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
};

exports.putUpdateUser = (req, res, next) => {
	const id = req.body.user_id;

	User.updateUser(id)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.deleteUser = (req, res, next) => {
	const id = req.body.user_id;

	User.deleteUser(id)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}