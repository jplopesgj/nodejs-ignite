const express = require("express");

const app = express();

//localhots:3333/ignite


app.get("/", (request, response) => {
    return response.json({ message: "Receba um Olá" });
});


//Porta onde o node vai ser executado
app.listen(3333);