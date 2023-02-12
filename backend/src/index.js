import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/dist'))); // Front-end

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

app.get('/posts', async (req, res) => {
  const posts = await client.db('blog').collection('posts').find().toArray();
  res.status(200).send(posts);
});

app.post('/posts/add', async (req, res) => {
  const results = await client
    .db('blog')
    .collection('posts')
    .insertOne(req.body);
  const posts = await client.db('blog').collection('posts').find().toArray();
  res.status(201).send(posts);
});

// Serve front end page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log('Serveur démarré avec succès sur le port 4000');
});
