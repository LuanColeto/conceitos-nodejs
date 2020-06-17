const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId (request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        response.status(400).json({message: "ID is not valid"})
    }

    return next;
}

app.use('/repositories/:id', validateRepositoryId);

app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    const repository = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0
    };

    repositories.push(repository);

    return response.json(repository)
});

// app.put("/repositories/:id", (request, response) => {
//     const { id } = request.params;
//
//     const { url, title, techs } = request.body;
//
//     const repositoryIndex = repositories.findIndex(repository => repository.id = id);
//
//     const repository = {
//         title,
//         url,
//         techs,
//         likes: 0
//     };
//
//     repositories[repositoryIndex] = repository;
//
//     response.json(repository);
// });

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
