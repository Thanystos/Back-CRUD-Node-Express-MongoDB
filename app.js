const express = require('express');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

const app = express();

mongoose.connect('mongodb+srv://Thanystos:Devilplop0@coursocnodeexpressmongo.2cvjeus.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // Permet d'intercepter toute réponse json envoyée

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body  // copie tous les champs du corps de la requête pour créer noter Thing
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'objet enregistré' }))
      .catch(error => res.status(400).json( { error }));
});

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json( { error }));
  });

module.exports = app;