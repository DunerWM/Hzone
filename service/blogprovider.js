var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

BlogProvider = function(host, port) {
    this.db = new Db('zone', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
    this.db.open(function(){});
}

BlogProvider.prototype.getCollection = function(callback) {
    this.db.collection("blog", function(error, blog_collection){
        if(error) {
            callback(error);
        }else{
            callback(null, blog_collection);
        }
    })
}

BlogProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, blog_collectoon){
        if(error){
            callback(error);
        }else{
            blog_collectoon.find().toArray(function(error, results) {
                if(error) {
                    callback(error);
                }else{
                    callback(null, results);
                }
            })
        }
    })
}

BlogProvider.prototype.save = function(blogs, callback) {
    this.getCollection(function(error, blog_colection) {
        if(error){
            callback(error);
        }else{
            if(typeof(blogs.length) == "undefind") {
                blogs = [blogs];
            }
            for(var i = 0; i < blogs.length; i++) {
                blog = blogs[i];
                blog.create_at = new Date();
            }
            blog_colection.insert(blogs, function() {
                callback(null, blogs);
            })
        }
    })
}

exports.BlogProvider = BlogProvider;