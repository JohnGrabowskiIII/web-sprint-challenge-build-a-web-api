// add middlewares here related to projects

const {get} = require('./projects-model')

const findProject = (req, res, next) => {

    const {id} = req.params;

    if (!id) {
        get()
        .then(resolve => {
            req.projectsArray = resolve;
            next();
        })
        .catch(err => {
            res.status(500).json({message: "Unable to retrieve projects array"});
        });
    } else {
        get(id)
        .then(resolve => {
            req.project = resolve;
            next();
        })
        .catch(err => {
            res.status(404).json({message: "project not found"})
            next();
        })
    }

}

module.exports = {
    findProject
}