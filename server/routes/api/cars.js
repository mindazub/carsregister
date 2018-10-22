const express = require('express');

const mongodb = require('mongod');

const router = express.Router();

// get cars
router.get('/', async (req, res) => {
    const cars = await loadCarCollection();
    res.send(await cars.find({}).toArray());
});

// add post
router.post('/', async (req, res) => {
    const cars = await loadCarCollection();
    await cars.insertOne({
        // more parameters to add
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// delete post
router.delete('/:id', async (req, res) => {
    const cars = await loadCarCollection();
    await cars.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadCarCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://abc123:abc123@ds052978.mlab.com:52978/vue-express-bradtraversy', {
            useNewUrlParser: true
        });
    return client.db('carsdb').collection('cars');
}

module.exports = router;