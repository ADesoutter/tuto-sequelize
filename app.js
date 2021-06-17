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

app.get('/messages/:id',(req, res) => {
    const id = req.params.id;
    sequelize.models.Message.findByPk(id)
    .then(myMessage => {
        res.send(myMessage);
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

// Modifier un élément (Update du CRUD)
app.patch('/messages/:id', (req, res) => {
    // Met à jour un élément dans une BDD
    // Avec les infos envoyé en body de la requête
    sequelize.models.Message.update(req.body, 
        {where: {id : req.params.id} })
    .then(successUpdated => {
        res.send(successUpdated);
    })

})

// Supprimer un élément (Delete du CRUD)
app.delete('/messages/:id', (req, res) => {
    // Supprimer un élément d'une BDD
    sequelize.models.Message.destroy({
        where:{id: req.params.id}
    }).then(() => {
        res.send({info: "Message deleted"})
    })
})

app.post('/categories', (req, res) => {
    sequelize.models.Category.create(req.body)
    .then(categoryCreated => {
        res.send(categoryCreated);
    })
})

app.get('/categories', (req, res) => {
    sequelize.models.Category.findAll()
    .then(myCategories => {
        res.send(myCategories)
    })
})

app.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    sequelize.models.Category.findByPk(id)
    .then(myCategory => {
        res.send(myCategory)
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