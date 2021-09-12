const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();
const port = 5000;


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jvd1e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const newsCollection = client.db("berubariNews").collection("newsData");
  app.get('/allNews', (req, res) => {
     newsCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })
  app.post("/addNews", (req, res) => {
    const newsData = req.body;
    newsCollection.insertOne(newsData)
    .then(result => {
      res.redirect('https://berubari-sports.web.app/');
    })
  })
});

 app.get('/', (req, res) => {
     res.send("I am working, continue your work")
  })
app.listen(process.env.PORT || port)