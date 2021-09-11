const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 5000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jvd1e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const newsCollection = client.db("berubariNews").collection("newsData");
  // perform actions on the collection object
  app.get('/allNews', (req, res) => {
	newsCollection.find({})
	.toArray((err, documents) => {
		res.send(documents);
	})
  })
  app.post("/addNews", (req, res) => {
    const newsData = req.body;
    //console.log(newsData)
    newsCollection.insertOne(newsData)
    .then(result => {
      res.redirect('http://localhost:3000/');
    })
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port);