import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// const uri = process.env.STRING_URI;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function runDB() {
  try {
    await client.connect();
    await client.db('blog').command({ ping: 1 });
    console.log('Connected successfully to the Mongo database');
  } catch (err) {
    console.log(err);
  } finally {
    // await client.close();
  }
}
runDB().catch(console.error);