const express = require("express");

const app = express();

app.use(express.json());

/**
 * GET - Buscas uma informação dentro do servidor.
 * POST - Inserir uma informação no servidor.
 * PUT - Alterar uma informação no servidor.
 * PATCH - Alterar uma informação especifica no servidor. Ex: avatar,email e etc.
 * DELETE - Deltar uma informação no servidor.
 */

/**
 * 
 * Tipos de parametros 
 * 
 * Route Params => Identificar um recurso -> editar/deletar
 * Query Params => Paginaçao / Filtro
 * Body Params  => Os objetos para Inserção/Alteração de alguns recursos (JSON)
 */

app.get("/courses", (request, response) => {
    const query = request.query;
    console.log(query);
    return response.json(["Cursos 1", "Cursos 2", "Cursos 3"]);
});

app.post("/courses", (request, response) => {
    const body = resquest.body;
    console.log(body);
    return response.json(["Cursos 1", "Cursos 2", "Cursos 3", "Cursos 4"]);
});

app.put("/courses/:id", (request, response) => {
    const { id } = request.params;
    console.log(id);
    return response.json(["Cursos 6", "Cursos 2", "Cursos 3", "Cursos 4"]);
});

app.patch("/courses/:id", (request, response) => {
    return response.json(["Cursos 6", "Cursos 8", "Cursos 3", "Cursos 4"]);
});

app.delete("/courses/:id", (request, response) => {
    return response.json(["Cursos 6", "Cursos 8", "Cursos 4"]);
});


//Porta onde o node vai ser executado
app.listen(3333);