const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

/**
 * Global is used to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API route usage.
 */
let cached = global.mongoose;
let mongoClient = global.mongoClient;

if (!cached) cached = global.mongoose = { conn: null, promise: null };
if (!mongoClient)
  mongoClient = global.mongoClient = { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // other mongoose options can go here
    };
    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// For NextAuth.js MongoDB adapter
async function getMongoClient() {
  if (mongoClient.conn) return mongoClient.conn;

  if (!mongoClient.promise) {
    mongoClient.promise = MongoClient.connect(MONGO_URI, {
      useUnifiedTopology: true,
    });
  }
  mongoClient.conn = await mongoClient.promise;
  return mongoClient.conn;
}

module.exports = connectToDatabase;
module.exports.getMongoClient = getMongoClient;
