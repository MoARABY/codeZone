const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
    title: 'CodeZone Platform APIs',
    version: '1.0.0',
    description: 'API documentation for my Node.js project',
    },
    servers: [
    {
        url: 'http://localhost:5000',
        description: 'Development server',
    },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Adjust the path according to your project structure
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };