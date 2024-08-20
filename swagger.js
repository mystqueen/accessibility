const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API with Swagger', // Title of the documentation
        version: '1.0.0', // Version of the API
        description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000', // URL of your API
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs (adjust as needed)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
