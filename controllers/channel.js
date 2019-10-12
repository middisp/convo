const Channel = require('../models/channel');
const User = require('../models/user');

exports.postAddChannel = (req, res, next) => {
  const name = req.body.name;
  const user_id = req.body.user_id;

  const message = new Channel(name, user_id);
  message.save()
    .then(result => User.updateUser(user_id, { channel_id: result._id }))
    .then(result => result)
    .catch(err => {
      console.log(`Error: ${err}`);
      throw err;
    });
}

exports.getAllChannels = (req, res, next) => {
  const user_id = req.params.userId;

  Channel.fetchAll(user_id)
    .then(channels => {
      res.render({
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