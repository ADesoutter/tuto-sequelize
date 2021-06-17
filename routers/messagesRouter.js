const express = require('express');
const router = express.Router();
const sequelize = require("../models");

router.get('/', (req, res) => {
    sequelize.models.Message.findAll()
    .then(myMessages => {
        res.send(myMessages);
    })
})

router.get('/:id',(req, res) => {
    const id = req.params.id;
    sequelize.models.Message.findByPk(id)
    .then(myMessage => {
        res.send(myMessage);
    })
})

// POST -> Méthode HTTP qu'on emploie par convention
// pour envoyer des infos
router.post('/', (req, res ) => {
    // Recevoir ce qu'il y a dans le body 
    // de la requête
    console.log(req.body);
    sequelize.models.Message.create(req.body)
    .then(messageCreated => {
        res.send(messageCreated);
    })
})

// Modifier un élément (Update du CRUD)
router.patch('/:id', (req, res) => {
    // Met à jour un élément dans une BDD
    // Avec les infos envoyé en body de la requête
    sequelize.models.Message.update(req.body, 
        {where: {id : req.params.id} })
    .then(nbRowsUpdated => {
        res.send(nbRowsUpdated);
    })

})

// Supprimer un élément (Delete du CRUD)
router.delete('/:id', (req, res) => {
    // Supprimer un élément d'une BDD
    sequelize.models.Message.destroy({
        where:{id: req.params.id}
    }).then(() => {
        res.send({info: "Message deleted"})
    })
})

module.exports = router;