const ObjectId = require('mongodb').ObjectId;
const userMessages = require('../utils/userMessages');
const Channel = require('../models/channel');
const User = require('../models/user');

exports.postAddChannel = (req, res, next) => {
  const name = req.body.name || undefined;
  const members = req.body.members || undefined;
  const user_id = new ObjectId(req.params.user_id);

  if (name && user_id) {
    const channel = new Channel(name, user_id);

    channel.save()
      .then(result => {
        User.updateUser(user_id, { channels: result.insertedId });
        return userMessages.postAddChannel.success;
      })
      .then(result => {
        res.status(201).json({ pageTitle: 'success', userInfo: result });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(201).json({ pageTitle: 'success', userInfo: err });
      });
  } else {
    return res.status(422).json('channel', { pageTitle, message: 'Error' });

  }
}

exports.getAddChannel = (req, res, next) => {
  res.render('channel', { pageTitle: 'Channel' });
}

exports.getAllChannels = (req, res, next) => {
  const user_id = req.params.userId;

  Channel.fetchAll(user_id)
    .then(channels => {
      res.status(200).json({
        channels: channels
      })
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      throw err;
    });
}

exports.putUpdateChannel = (req, res, next) => {
  const channel_id = req.body.channel_id;

  Channel.updateChannel(channel_id)
    .then(() => {
      res.render()
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      throw err;
    });
}

exports.deleteChannel = (req, res, next) => {
  const channel_id = req.body.channel_id;

  Channel.deleteChannel(channel_id)
    .then(() => {
      res.render()
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      throw err;
    });
}