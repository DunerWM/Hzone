var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

BlogProvider = function (host, port) {
    this.db = new Db('zone', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
    this.db.open(function () {
    });
}

BlogProvider.prototype.getCollectionBlog = function (callback) {
    this.db.collection("blog", function (error, blog_collection) {
        if (error) {
            callback(error);
        } else {
            callback(null, blog_collection);
        }
        this.db.close();
    })
}

BlogProvider.prototype.getCollectionUser = function (callback) {
    this.db.collection('user', function (error, user_collection) {
        if (error) {
            callback(error);
        } else {
            callback(null, user_collection);
        }
        this.db.close();
    })
}


BlogProvider.prototype.save = function (blogs, callback) {
    this.getCollectionBlog(function (error, blog_colection) {
        if (error) {
            callback(error);
        } else {
            if (typeof(blogs.length) == "undefind") {
                blogs = [blogs];
            }
            for (var i = 0; i < blogs.length; i++) {
                blog = blogs[i];
                blog.create_at = new Date();
            }
            blog_colection.insert(blogs, function () {
                callback(null, blogs);
            })
        }
    })
}

BlogProvider.prototype.findAllBlogs = function (callback) {
    var db = this.db;
    db.collection("blog", function (error, blog_collection) {
        if (error) {
            callback(error);
        } else {
            blog_collection.find().toArray(function (error, results) {
                if (error) {
                    callback(error);
                } else {
                    if (typeof(results.length) == "undefind") {
                        results = [results];
                    }
                    var docs = [];
                    for (var i = 0; i < results.length; i++) {
                        (function (resultObj, i) {
                            db.collection("user", function (error, user_collection) {
                                if (error) {
                                    callback(error);
                                } else {
                                    user_collection.find({'id': resultObj.userId}).toArray(function (error, doc) {
                                        if (error) {
                                            callback(error);
                                        } else {
                                            docs.push({"doc": doc, "blog": resultObj});
                                            if (i == results.length - 1) {
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

exports.BlogProvider = BlogProvider;
var str = "1234567890123456789012345abcdefg";
var strs = [];
for(var i = 0; i < str.length; i+=20) {
    var _str = str.substr(i, 20);
    strs.push(_str);
}