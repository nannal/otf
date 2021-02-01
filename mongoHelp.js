var MongoClient = require('mongodb').MongoClient
config = require("./config")

var url = config.mongoUrl
var options= {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  promiseLibrary: global.Promise}

function put(db,collection, object){
  const client = new MongoClient(url, options)
  client.connect()
  client.db(db).collection(collection).insertOne(object).then((value) =>{client.close();return value})
}

exports.put = put

function get(db, collection, object){
  const client = new MongoClient(url, options)
  client.connect()
  return client.db(db).collection(collection).find(object).toArray().then((value) =>{client.close();return value})
}

exports.get = get

function getUnique(db, collection, field,object){
  const client = new MongoClient(url, options)
  client.connect()
  return client.db(db).collection(collection).distinct(field,object).then((value) =>{client.close();return value})
}


exports.getUnique = getUnique

function aggregate(db,collection,agg){
    const client = new MongoClient(url, options)
    client.connect()
    return client.db(db).collection(collection).aggregate(agg).toArray().then((value) =>{client.close();return value})
}

exports.aggregate = aggregate

function deleteOne(db, collection, object) {
  const client = new MongoClient(url, options)
  client.connect()
  client.db(db).collection(collection).deleteOne(object).then((value) =>{client.close();return value})
}

exports.deleteOne = deleteOne

function update(db, collection, search,update) {
    const client = new MongoClient(url, options)
    client.connect()
    client.db(db).collection(collection).updateOne(search,{$set:update}).then((value) =>{client.close();return value})
  }

  exports.update = update

