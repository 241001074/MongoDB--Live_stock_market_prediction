//create a database 
use stockDB

//create collection
db.createCollection("stocks")
show collections

//Validation

db.runCommand({
 collMod: "stocks",
 validator: {
  $jsonSchema: {
   bsonType: "object",
   required: ["symbol","price","prediction"],
   properties: {
    symbol: {
     bsonType: "string"
    },
    price: {
     bsonType: ["int","double","long","decimal"]
    },
    prediction: {
     bsonType: "string"
    },
    date: {
     bsonType: "date"
    },
    model: {
     bsonType: "string"
    },
    status: {
     bsonType: "string"
    }
   }
  }
 }
})

//Insertion Queries
//Insert one
db.stocks.insertOne({
 symbol: "AAPL",
 price: 180,
 prediction: "UP",
 date: new Date(),
 model: "LSTM"
})

db.stocks.insertOne({
 symbol: "NIFTY",
 price: 22000,
 prediction: "UP",
 model: "AI",
 status: "BUY",
 date: new Date()
})
//insert many
db.stocks.insertMany([
 { symbol: "TSLA", price: 250, prediction: "DOWN", date: new Date() },
 { symbol: "GOOG", price: 2800, prediction: "UP", date: new Date() },
 { symbol: "MSFT", price: 320, prediction: "UP", date: new Date() }
])

db.stocks.insertMany([
 { symbol: "INFY", price: 1500, prediction: "UP" },
 { symbol: "TCS", price: 3600, prediction: "DOWN" },
 { symbol: "HDFC", price: 1700, prediction: "UP" }
])

//find queries

db.stocks.find()

db.stocks.find({symbol:"AAPL"})

db.stocks.find({prediction:"UP"})

db.stocks.find({price:{$gt:200}})

db.stocks.find().pretty()

//Update Queries
//updateOne
db.stocks.updateOne(
 {symbol:"AAPL"},
 {$set:{price:190}}
)

db.stocks.updateOne(
 {symbol:"TSLA"},
 {$set:{prediction:"UP"}}
)
//updateMany
db.stocks.updateMany(
 {prediction:"UP"},
 {$set:{status:"BUY"}}
)

//Delete Queries

db.stocks.deleteOne({symbol:"TCS"})

db.stocks.deleteMany({prediction:"DOWN"})

db.stocks.deleteMany({price:{$lt:200}})

//Sorting & Limit

db.stocks.find().sort({price:1})

db.stocks.find().sort({price:-1})

db.stocks.find().limit(3)

//count & verify 

db.stocks.countDocuments()

db.stats()

//Aggregation

//group by prediction

db.stocks.aggregate([
 {
  $group:{
   _id:"$prediction",
   total:{$sum:1}
  }
 }
])

//Average price 

db.stocks.aggregate([
 {
  $group:{
   _id:null,
   avgPrice:{$avg:"$price"}
  }
 }
])

//Max price

db.stocks.aggregate([
 {
  $group:{
   _id:null,
   maxPrice:{$max:"$price"}
  }
 }
])