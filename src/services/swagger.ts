import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Nana's Website API Documentation",
            version: "1.0.0",
            description: "API documentation Nana's website.",},
        contact: {
            name: "John Fofie Junior",
            title: "Project Maintainer: Aspiring Backend Engineer",
            url: "https://new-portfolio-liart-two.vercel.app/",
            email: "johnfofie31@gmail.com",
        },
        // license: {
        //     name: "MIT License",
        //     url: "",
        // },
        servers: [
           
            {
                url: "https://nana-n4a9.onrender.com/",
                description: "development server",
            },
             {
                url: "http://localhost:5000/",
                description: "live server",
            }
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
    },
    apis: ["src/routes/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;