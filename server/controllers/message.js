const Message = require('../models/message');

exports.postAddMessage = (req, res, next) => {
	const content = req.body.content;
	const senderId = req.body.senderId;
	const channelId = req.body.channelId;

	const message = new Message(content, senderId, channelId);
	message.save()
		.then(result => res.send(result))
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.getAllMessages = (req, res, next) => {
	const channelId = req.params.channelId;

	Message.fetchAll(channelId)
		.then(messages => {
			res.render({
				messages: messages
			})
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.putUpdateMessage = (req, res, next) => {
	const messageId = req.body.messageId;

	Message.updateMessage(messageId)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.deleteMessage = (req, res, next) => {
	const messageId = req.body.messageId;

	Message.deleteMessage(messageId)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}