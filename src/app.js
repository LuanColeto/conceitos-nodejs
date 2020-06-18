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

app.put("/repositories/:id", validateRepositoryId, (request, response) => {
});

app.delete("/repositories/:id", validateRepositoryId, (request, response) => {
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const repository = repositories.find(repository => repository.id == id);

    if (!repository) {
        response.status(400).json({error: "Reposiotry not found"})
    }

    repository.likes ++;

    return response.json(repository)
});

module.exports = app;
