import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trossets Material Tracker API',
      version: '1.0.0',
      description: 'API for managing 3D printing materials, projects, and inventory tracking',
      contact: {
        name: 'Trossets Material Tracker',
        url: 'https://github.com/trossets/material-tracker',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.trossets.com' 
          : `http://localhost:${process.env.PORT || 3001}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Error message',
                },
                details: {
                  type: 'object',
                  example: {},
                },
              },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clw123456789',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN'],
              example: 'USER',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Material: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clw123456789',
            },
            name: {
              type: 'string',
              example: 'PLA Red',
            },
            type: {
              type: 'string',
              enum: ['PLA', 'ABS', 'PETG', 'TPU', 'WOOD', 'METAL', 'OTHER'],
              example: 'PLA',
            },
            brand: {
              type: 'string',
              example: 'Hatchbox',
            },
            color: {
              type: 'string',
              example: 'Red',
            },
            diameter: {
              type: 'number',
              example: 1.75,
            },
            density: {
              type: 'number',
              example: 1.24,
            },
            costPerKg: {
              type: 'number',
              example: 25.99,
            },
            totalWeight: {
              type: 'number',
              example: 1000,
            },
            usedWeight: {
              type: 'number',
              example: 250,
            },
            remainingWeight: {
              type: 'number',
              example: 750,
            },
            minimumStock: {
              type: 'number',
              example: 200,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clw123456789',
            },
            name: {
              type: 'string',
              example: 'Custom Phone Case',
            },
            description: {
              type: 'string',
              example: 'A custom phone case with personalized design',
            },
            status: {
              type: 'string',
              enum: ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
              example: 'IN_PROGRESS',
            },
            estimatedCost: {
              type: 'number',
              example: 15.50,
            },
            actualCost: {
              type: 'number',
              example: 18.25,
            },
            startDate: {
              type: 'string',
              format: 'date-time',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Supplier: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clw123456789',
            },
            name: {
              type: 'string',
              example: 'Amazon',
            },
            contactEmail: {
              type: 'string',
              format: 'email',
              example: 'contact@amazon.com',
            },
            website: {
              type: 'string',
              format: 'url',
              example: 'https://amazon.com',
            },
            notes: {
              type: 'string',
              example: 'Fast shipping, good prices',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/routes/**/*.ts',
  ],
};
