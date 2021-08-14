const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router')

server.use(express.json());

server.use("/api/projects", projectsRouter);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('*', (req, res) => {
    res.status(200).json({message: "Server online"})
})

module.exports = server;
