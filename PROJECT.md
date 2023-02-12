# PROJECT

## Notes

- .jsx
- import React
- Outlet au lieu de children
- mocke : module.exports data = export const p
- key={item.\_id} au lieu de {item.id}

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
  - [install-mongodb-on-ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
  - [mongosh commands](https://www.mongodb.com/docs/mongodb-shell/reference/access-mdb-shell-help/) : mongosh "mongodb://localhost:27017", show dbs, use blog, db.posts.insertOne( { "title":"First title (local)", "content":"First content" } );, db.posts.find()
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
  - Dans Postman, requête Post + Body + JSON avec { "title":"New title", "content":"New Content"}
- [x] Configurer le client
  - yarn create vite client --template react
  - cd client && yarn install && yarn dev
  - Extension React Dev Tools
- [x] Front : Créer la navigation
  - Installer react-router-dom : yarn add react-router-dom
  - Route Home page <BrowserRouter><Layout><Routes><Route path="/" element={<Home />} />
  - Utiliser Link pour ouvrir une page Post, son contenu en passant state ={{ id: item._id }} et useLocation
- [x] Module service Axios : ./service/index.jsx
  - Installer Axios : yarn add axios
  - Fonction getPosts() qui retourne une promesse avec axios.get("http://localhost:4000") : Error CORS policy: No 'Access-Control-Allow-Origin'
  - Installer Middleware Cors sur le backend
  - Récupérer les données avec useState, useEffect et la fonction getPosts
  - Ajouter des "?" pour éviter de bloquer l'application
- [x] Gérer le contexte : ./context/index.jsx
  - Export AppProvider et useAppContext
  - AppProvider : useState (posts), getPosts, value = useMemo, return Provide
  - useAppContext return useContext(AppContext)
  - MAIN : Englober App avec AppProvider
  - APP : Utiliser useAppContext pour récupérer fetchPosts et lancer cette fn via useEffect
  - LIST : récupère useAppContext pour récupérer la fonction getPosts et les posts
  - LAYOUT FORM : useState (post/setPost), handleChange (setPost), useAppContext pour récupérer addPost > handleSubmit(addPost)
  - SINGLE : useLocation, useAppContext, filtrage
- [x] Ajouter un proxy localhost:4000 au package.json du client
- [x] Servir le site static avec Express.static, etc.
  - Changer la route an ajoutant /posts/ au niveau serveur et client
  - Lancer le build côté client
  - Servir le site statique avec le dossier client/dist
  - Ajouter un script build aussi chez le backend client : npm i @babel/cli, "build" : babel src -d dist, "serve" : "node dist/index.js"

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
