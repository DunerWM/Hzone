var mongodb = require('./db');

State = function(state) {
    if(state) {
        this.content = state.content;
        this.userId = state.userId;
    }
}


State.prototype.getAllStates = function(callback) {
    mongodb.open(function(err, db) {
        if(err) {
            mongodb.close();
            return callback(err);
        }else{
            db.collection('state', function(err, collection) {
                if(err) {
                    mongodb.close();
                    return callback(err);
                }else{
                    collection.find().toArray(function (err, results) {
                        if (err) {
                            mongodb.close();
                            return callback(err);
                        } else {
                            if (typeof(results.length) == "undefind") {
                                results = [results];
                            }
                            var docs = [];
                            for (var i = 0; i < results.length; i++) {
                                (function (resultObj, i) {
                                    db.collection("user", function (err, user_collection) {
                                        if (err) {
                                            mongodb.close();
                                            return  callback(err);
                                        } else {
                                            user_collection.find({'id': resultObj.userId}).toArray(function (err, doc) {
                                                if (err) {
                                                    mongodb.close();
                                                    return callback(err);
                                                } else {
                                                    docs.push({"doc": doc, "blog": resultObj});
                                                    if (i == results.length - 1) {
                                                        mongodb.close();
                                                        callback(null, docs);
                                                    }
                                                }
                                            });
                                        }
                                    })
                                })(results[i], i)
                            }
                        }
                    })
                }
            })
        }
    })
}

State.prototype.save = function(state, callback) {
    var state = {
        userId : this.userId,
        content : this.content
    };
    mongodb.open(function(err, db) {
        if(error) {
            mongodb.close();
            return callback(err);
        }
        db.collection('state', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            state.create_at = new Date();
            collection.insert(state, function(err, state) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null, state[0]);
            })
        })
    })
}


module.exports = State;