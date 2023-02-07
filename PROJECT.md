# PROJECT

## TASKS

- [x] Configurer le projet Node
  - Installer Node.js et npm, verifier avec npm -v et npm -v
  - Créer le projet Node (package.json) : npm init ou npm init -yes
  - Tester en ajoutant un console.log à index.js et node index.js
  - Ajouter Babel en dépendances de developpement : npm i --save-dev @babel/core @babel/node @babel/preset-env
  - Ajouter "babel.config.json" : {"presets" :["@babel/preset-env"]}
  - Ajouter le script "start" : "babel-node index.js" pour utiliser Modern Javascript
- [x] Créer le serveur
  - npm i express nodemon
  - Tester en ajoutant express et listen
  - Ajouter le routage simple app.get('/') + res.send("Hello")
  - Modifier le script "start" avec nodemon : "nodemon --exec babel-node index.js"
- [x] Configurer MongoDB Atlas ([tutorial](https://www.mongodb.com/docs/drivers/node/current/quick-start/))
  - Créer un compte
  - Choisir un cluster, renommer si besoin
  - Security Quickstart > Authentification avec un nom et mot de passe
  - Security > Network Access > Add IP addresses
  - Database > Collections > Ajouter un database "blog" + une collection "posts"
  - Database > Connect : Compass, installation Compass, copier le lien mongodb+srv (string URI)
  - Compass : ajouter des posts ou importer un fichier json
- [x] Autre option : MongoDB en localhost
  - (install-mongodb-on-ubuntu)[https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/]
  - (mongosh commands)[https://www.mongodb.com/docs/mongodb-shell/reference/access-mdb-shell-help/] : mongosh "mongodb://localhost:27017", show dbs, use blog, db.posts.insertOne( { "title":"First title (local)", "content":"First content" } );, db.posts.find()
- [x] Configurer MongoDB pour Node
  - Installer MongoDB driver : npm i mongoDB
  - Dans MongoDB Atlas : DataBase > Connect > Your Application
  - Tester (local ou mongo atlas)
  - Installer dotenv : npm i dotenv
  - Fichier .env une variable STRING_URI avec le user/pass/cluster (! ne marche pas en décomposant entre plusieurs varirables d'environnement)
- [x] API REST : Create/Read
  - Structure : app.get('/', async (req, res) => { /_try catch _/ })
  - R : '/' Lire les posts avec <db>.<collection>.find().toArray() et les afficher dans le navigateur avec res.status(200).send(posts)
  - Installer Postman pour les autres requêtes HTTP utiles : POST, PUT, DELETE
  - Préciser le format d'objet transmis à la base de données en JSON : app.use(express.json())
  - C : '/add' Ajouter un post avec <db>.<collection>.insertOne({title:"Hello", content:"Lorem"});
  - C : '/add' Ajouter un post avec le body .insertOne(req.body);
  - Dans Postman, requêtes Post + Body + JSON avec { "title":"New title", "content":"New Content"}
- [ ] Configurer le client
  - yarn create vite client --template react
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...

## MONGODB - snippets

```js
import { MongoClient } from 'mongodb';
// const uri = process.env.STRING_URI;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
async function runDB() {
  try {
    await client.connect();
    // Establish and verify connection
    await client.db('blog').command({ ping: 1 });
    console.log('Connected successfully to server');
    // List posts
    const posts = await client.db('blog').collection('posts').find().toArray();
    console.log('POSTS : ', posts);
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
runDB().catch(console.error);
```

### Lister databases

```js
const databasesList = await client.db().admin().listDatabases();
console.log('DATABASES');
databasesList.databases.forEach((db) => console.log(`- ${db.name}`));
```

### Lister collections

```js
const collections = await client.db('blog').listCollections().toArray();
console.log('COLLECTIONS : ', collections);
```

### Créer une ressource

```js
const newPost = {
  title: 'Title from node ',
  content: 'Lorem Ipsum',
};
const results = await client.db('blog').collection('posts').insertOne(newPost);
console.log(`The new post is created, see the new Id : ${results.insertedId}`);
```

### Créer une ressource avec body

```js
const results = await client.db('blog').collection('posts').insertOne(req.body);
res.status(200).send(results);
```

## STACK

### Back-end

- Node.js (+npm)
- Express.js
- Babel
- Nodemon
- Dotenv
- Cors
- MongoDB : NoSQL
- MongoDB Atlas : SaaS, Software as a Service

### Front-end

- React CLI
- Bootstrap v5
- Axios

### Tools

- Git / Github
- Compass
- Postman
- React Developer Tools
- Heroku

## NoSQL

**Not Only SQL**
SQL , langage de requête structuré pour stocker, manipuler et récupérer des données : (tableaux à 2D = table). Base de données non relationnelle sans schéma fixe pour stocker des données structurées ou non sous forme de documents clé/valeur

| SQL                      | NoSQL                         |
| ------------------------ | ----------------------------- |
| Relationnel              | Non relationnel et distribué  |
| Tableau lignes/colonnes  | Documents, clé/valeur         |
| Implémentation complexe  | Moins coûteux                 |
| Schéma prédéfini et fixe | Structure flexible            |
| Technologie vieille      | Récent                        |

## BABEL

Transcompilateur JS open source utilisé pour convertir ECMAScript 2015+ en un version rétrocompatible de JS (dernières fonctionnalités comme let ou import/export)