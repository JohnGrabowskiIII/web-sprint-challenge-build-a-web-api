// Write your "projects" router here!

const {insert, update, remove, getProjectActions} = require('./projects-model')

const {findProject, checkBody} = require('./projects-middleware')

const express = require('express');

const router = express.Router();

router.get("/", findProject, (req, res) => {

    const {projectsArray} = req;

    if (projectsArray) {
        res.status(200).json(projectsArray);
    } else {
        res.status(200).json([])
    }

})

router.get("/:id", findProject, (req, res) => {

    const {project} = req;

    res.status(200).json(project)

})

router.post("/", checkBody, (req, res) => {
    
    const {body} = req;

    insert(body)
    .then(resolve => {
        res.status(201).json(resolve)
    })
    .catch(err => {
        res.status(500).json({message: "New project could not be submitted at this time"})
    })

})

router.put("/:id", checkBody, findProject, (req, res) => {
    
    const {body, id} = req;
    console.log(id, body)

    update(id, body)
    .then(resolve => {
        res.status(200).json(resolve)
    })
    .catch(err => {
        res.status(500).json({message: "Project could not be updated at this time"})
    })

})

router.delete("/:id", findProject, (req, res) => {

    const {id} = req;

    remove(id)
    .then(resolve => {
        res.status(200).json()
    })
    .catch(err => {
        res.status(500).json({message: "Project could not be deleted at this time"})
    })

})

router.get("/:id/actions", findProject, (req, res) => {

    const {id} = req;

    getProjectActions(id)
    .then(resolve => {
        res.status(200).json(resolve)
    })
    .catch(err => {
        res.status(500).json({message: "Actions could not be retrieved at this time"})
    })

})

router.get('*', (req, res) => {
    res.status(200).json({message: "projects router running"})
})

module.exports = router;
