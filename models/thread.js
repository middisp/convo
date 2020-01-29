const ObjectId = require('mongodb').ObjectId;

const getDb = require('../utils/database').getDb;
const { THREAD_COLLECTION } = require('../config');

let db;

class Thread {
  constructor(user_id, members = [], name, description = '') {
    const date = new Date();
    const o_id = new ObjectId(user_id);

    this.name = name;
    this.description = description;
    this.user_id = o_id;
    this.members = members;
    this.threadImage = '';
    this.meta = {
      creadtedBy: o_id,
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

    // Need to fetch all, then loop throgh results.members for matching user_id.
    // Spunk out on to page.
    return db.collection(THREAD_COLLECTION)
      .find({})
      .toArray()
      .then(result => {
        return result.map(res => {
          if (res.members.includes(new ObjectId(user_id))) {
            return res;
          }
        });
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static updateThread(id, thread) {
    const o_id = new ObjectId(id);
    const date = new Date();
    db = getDb();

    thread.meta.modifiedAt = date;

    return db.collection(THREAD_COLLECTION)
      .updateOne({ _id: o_id }, { $set: thread })
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
