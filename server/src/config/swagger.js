import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Org Finance Manager API",
      version: "1.0.0",
      description: "API documentation for Org Finance Manager",
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:3000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Records", description: "Financial Records APIs" },
      { name: "Users", description: "User Management APIs" },
      { name: "Dashboard", description: "Dashboard Summary APIs" },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
