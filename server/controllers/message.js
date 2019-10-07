const Message = require('../models/message');

exports.postAddMessage = (req, res, next) => {
	const content = req.body.content;
	const senderId = req.body.userId;
	const recipiantId = req.body.recipiantId;

	const message = new Message(content, senderId, recipiantId);
	message.save()
		.then()
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.getAllMessages = (req, res, next) => {
	Message.fetchAll(req.body.senderId)
		.then(messages => {
			res.render({
				messages: messages
			})
				.catch(err => {
					console.log(`Error: ${err}`);
					throw err;
				});
		});
}