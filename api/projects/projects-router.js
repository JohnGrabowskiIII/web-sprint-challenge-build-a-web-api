// Write your "projects" router here!

const {get, insert, update, remove, getProjectActions} = require('./projects-model')

const {findProject} = require('./projects-middleware')

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

router.post("/", (req, res) => {
    
    const {body} = req;

    if (!body.name ||
        !body.description ||
        typeof body.name !== 'string' ||
        typeof body.description !== 'string') {
            res.status(400).json({message: "Post does not meet requirements"})
        } else {
            insert(body)
            .then(resolve => {
                res.status(201).json(resolve)
            })
            .catch(err => {
                res.status(500).json({message: "New project could not be submitted at this time"})
            })
        }

})

router.put("/:id", findProject, (req, res) => {
    
})

router.get('*', (req, res) => {
    res.status(200).json({message: "projects router running"})
})

module.exports = router;
