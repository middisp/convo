const Message = require('../models/message');

exports.postAddMessage = (req, res, next) => {
	const content = req.body.content;
	const user_id = req.body.user_id;
	const channel_id = req.body.channel_id;

	const message = new Message(content, user_id, channel_id);
	message.save()
		.then(result => res.status(201).json({ result }))
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.getAllMessages = (req, res, next) => {
	const channel_id = req.params.channel_id;

	Message.fetchAll(channel_id)
		.then(messages => {
			res.status(200).json({
				messages: messages
			})
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.putUpdateMessage = (req, res, next) => {
	const message_id = req.body.message_id;

	Message.updateMessage(message_id)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}

exports.deleteMessage = (req, res, next) => {
	const message_id = req.body.message_id;

	Message.deleteMessage(message_id)
		.then(() => {
			res.render()
		})
		.catch(err => {
			console.log(`Error: ${err}`);
			throw err;
		});
}