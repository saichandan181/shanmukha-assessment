const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management System API',
            version: '1.0.0',
            description: 'Complete API documentation for User Management System with Authentication and Role-Based Access Control',
            contact: {
                name: 'API Support',
                email: 'support@usermanagement.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'https://shanmukha-assessment-api.vercel.app/api',
                description: 'Production server'
            },
            {
                url: 'http://localhost:5000/api',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token from login response'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'User unique identifier'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        full_name: {
                            type: 'string',
                            description: 'User full name'
                        },
                        role: {
                            type: 'string',
                            enum: ['admin', 'user'],
                            description: 'User role'
                        },
                        status: {
                            type: 'string',
                            enum: ['active', 'inactive'],
                            description: 'User account status'
                        },
                        last_login: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                            description: 'Last login timestamp'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Account creation timestamp'
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Error message'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object'
                            },
                            description: 'Validation errors (if any)'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Authentication',
                description: 'User authentication endpoints (signup, login, logout)'
            },
            {
                name: 'User',
                description: 'User profile management endpoints'
            },
            {
                name: 'Admin',
                description: 'Admin-only endpoints for user management (requires admin role)'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
