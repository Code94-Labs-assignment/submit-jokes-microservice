import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "../configs/config";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "SE Consultant APIs",
    version: "1.0.0",
    description: "SE Consultant APIs",
  },
  servers: [
    {
      url: `https://submit-jokes-microservice-production-5d7b.up.railway.app/api`, // Change to your server URL
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
