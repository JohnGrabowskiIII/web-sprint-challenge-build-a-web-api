// Write your "actions" router here!

const express = require('express');

const {insert, update, remove} = require('./actions-model');

const {findActions, checkBody} = require('./actions-middlware');

const {findProject} = require('../projects/projects-middleware');

const router = express.Router();

router.get('/', findActions, (req, res) => {

    const {actions} = req;

    if (actions) {
        res.status(200).json(actions);
    } else {
        res.status(200).json([])
    }

})

router.get('/:id', findActions, (req, res) => {

    const {actions} = req;

    res.status(200).json(actions)

})

router.post('/', checkBody, findProject, (req, res) => {

    const {body, project} = req;

        insert(body)
        .then(resolve => {
            res.status(201).json(resolve)
        })
        .catch(err => {
            res.status(500).json({message: "New action could not be submitted at this time"})
        })

})

router.put("/:id", findActions, checkBody, (req, res) => {

    const {id} = req.params;
    const {body} = req;

    update(id, body)
    .then(resolve => {
        res.status(200).json(resolve);
    })
    .catch(err => {
        res.status(500).json({message: "Action could not be updated at this time"})
    })

})

router.get('*', (req, res) => {
    res.status(200).json({message: 'actions router working'})
})

module.exports = router;
