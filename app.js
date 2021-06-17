// Simplification possible
// Quand le chemin est un dossier, il va directement prendre
// l'index.js
// const sequelize = require("./models/index.js");
const sequelize = require("./models");

// Récupère le paquet d'express
const express = require('express');
// Initialiser un serveur dans la variable app
const app = express();

// Configurer notre serveur pour utiliser ces routeurs
const categoriesRouter = require('./routers/categoriesRouter');
app.use('/categories', categoriesRouter);

const messagesRouter = require('./routers/messagesRouter');
app.use('/messages', messagesRouter);

// Je veux accepter du JSON en envoi d'informations
app.use(express.json());

// Crée une variable pour mon port
const PORT = process.env.PORT || 5000;

console.log('Checking Database connection...');




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