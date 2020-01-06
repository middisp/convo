const ObjectId = require('mongodb').ObjectId;

const getDb = require('../utils/database').getDb;
const { THREAD_COLLECTION } = require('../config');

let db;

class Thread {
  constructor(user_id, members) {
    const date = new Date();
    const membersArray = members.split(',');
    const membersId = membersArray.map((member) => new ObjectId(member));
    this.user_id = new ObjectId(user_id);
    this.members = membersId;
    this.meta = {
      createdAt: date,
      modifiedAt: date
    }
  }

  save() {
    db = getDb();

    return db.collection(THREAD_COLLECTION)
      .insertOne(this)
      .then(result => {
        return result.ops[0];
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static fetchAll(user_id) {
    db = getDb();

    return db.collection(THREAD_COLLECTION)
      .find({ user_id })
      .toArray()
      .then(result => {
        return result;
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static updateThread(id, thread) {
    const o_id = new ObjectId(id);
    const date = new Date();
    db = getDb();

    return db.collection(THREAD_COLLECTION)
      .updateOne({ _id: o_id }, { $set: { ...thread, meta: { modifiedAt: date } } })
      .then(result => {
        return result
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      })
  }

  static deleteThread(thread_id) {
    return true;
  }
}

module.exports = Thread;
