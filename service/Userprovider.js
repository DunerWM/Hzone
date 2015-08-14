var mongodb = require('./db');

User = function (user) {
    if (user) {
        this.nick = user.nick;
        this.psw = user.psw;
    }
}

module.exports = User;

User.prototype.get = function (nick, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        } else {
            db.collection('user', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                } else {
                    collection.findOne({nick: nick}, function (err, user) {
                        mongodb.close();
                        if (err) {
                            return callback(err);
                        }
                        callback(null, user);
                    });
                }
            })
        }
    })
}

User.prototype.set = function (callback) {
    var user = {
        nick: this.nick,
        psw: this.psw
    }
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        } else {
            db.collection('user', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                } else {
                    collection.insert(user, {safe: true}, function (err, user) {
                        mongodb.close();
                        if (err) {
                            return callback(err);
                        }
                        callback(null, user);
                    })
                }
            })
        }
    });
}