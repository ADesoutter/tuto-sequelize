const express = require('express');
const router = express.Router();
const sequelize = require("../models");

router.post('/', (req, res) => {
    sequelize.models.Category.create(req.body)
    .then(categoryCreated => {
        res.send(categoryCreated);
    })
})

router.get('/', (req, res) => {
    sequelize.models.Category.findAll()
    .then(myCategories => {
        res.send(myCategories)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    sequelize.models.Category.findByPk(id)
    .then(myCategory => {
        res.send(myCategory)
    })
})

module.exports = router;