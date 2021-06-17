// Simplification possible
// Quand le chemin est un dossier, il va directement prendre
// l'index.js
// const sequelize = require("./models/index.js");
const sequelize = require("./models");

// Récupère le paquet d'express
const express = require('express');
// Initialiser un serveur dans la variable app
const app = express();

// Je veux accepter du JSON en envoi d'informations
app.use(express.json());

// Crée une variable pour mon port
const PORT = process.env.PORT || 5000;

console.log('Checking Database connection...');

app.get('/messages', (req, res) => {
    sequelize.models.Message.findAll()
    .then(myMessages => {
        res.send(myMessages);
    })
})

// POST -> Méthode HTTP qu'on emploie par convention
// pour envoyer des infos
app.post('/messages', (req, res ) => {
    // Recevoir ce qu'il y a dans le body 
    // de la requête
    console.log(req.body);
    sequelize.models.Message.create(req.body)
    .then(messageCreated => {
        res.send(messageCreated);
    })

})

app.get('/messages/:id',(req, res) => {
    const id = req.params.id;
    sequelize.models.Message.findByPk(id)
    .then(myMessage => {
        res.send(myMessage);
    })
})

sequelize.authenticate()
// Si il arrive à s'authentifier à la BDD
.then(() => {
    console.log("Database connection OK!");

    app.listen(PORT, () => {
        console.log(`Web server running at localhost:${PORT}`);
    });
})
// Si il n'arrive pas à se co à la BDD
.catch((err) => {
    console.log(err);
})