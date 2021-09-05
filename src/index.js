const { response } = require('express');
const express = require('express');
const app = express();

const { v4: uuidv4 } = require("uuid");

app.use(express.json());


const customers = [];

//Middleware

function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(404).json({ error: "Customer Not Found" })
    }

    request.customer = customer;
    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0)

    return balance;
}
/**
 * CPF - string
 * NAME - string
 * ID - uuid(universal unique identify)
 * STATEMENT - []
 */
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

    if (customerAlreadyExists) {
        return response.status(404).json({ error: "Customer Já existente" });
    }


    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    });

    return response.status(201).send();
});

app.use(verifyIfExistsAccountCPF)

app.get("/statement", (request, response) => {
    const { customer } = request;


    return response.json(customer.statement);

});

app.post("/deposit", (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }
    customer.statement.push(statementOperation);

    return response.status(201).send();
});

app.post("/withdraw", (request, response) => {

    const { amount } = request.body;

    const { customer } = request;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return response.status(400).json({ error: "Sem saldo" });
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debito"
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();


});


app.get("/statement/date", (request, response) => {
    const { customer } = request;

    const { date } = request.query;


    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString());



    return response.json(statement);

});

app.put("/account", (request, response) => {
    const { name } = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
});

app.get("/account", (request, response) => {
    const { customer } = request;
    return response.json(customer);
});

app.delete("/account", (request, response) => {
    const { customer } = request;

    //splice -- 
    customers.splice(customer, 1);

    return response.status(200).json({ customers });
});

app.get("statement", (request, responde) => {
    const { customer } = request;

    const balance = getBalance(customer.statement);

    return response.json({ balance });
});
app.listen(3333);