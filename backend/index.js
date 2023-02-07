import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

const app = express();
const port = 4000;
app.use(express.json());

dotenv.config();

// const uri = process.env.STRING_URI;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function runDB() {
  try {
    await client.connect();
    await client.db('blog').command({ ping: 1 });
    console.log('Connected successfully to server');
  } catch (err) {
    console.log(err);
  } finally {
    // await client.close();
  }
}
runDB().catch(console.error);

app.get('/', async (req, res) => {
  const posts = await client.db('blog').collection('posts').find().toArray();
  res.status(200).send(posts);
});

app.post('/add', async (req, res) => {
  const results = await client
    .db('blog')
    .collection('posts')
    .insertOne(req.body);
  res.status(200).send(results);
});

app.listen(port, () => {
  console.log('Serveur démarré avec succès sur le port 4000');
});
