const Joi = require('joi');

/**
 * Validation schemas using Joi
 */

const signupSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    full_name: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Full name must be at least 2 characters long',
        'string.max': 'Full name must not exceed 100 characters',
        'any.required': 'Full name is required'
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
});

const updateProfileSchema = Joi.object({
    full_name: Joi.string().min(2).max(100).messages({
        'string.min': 'Full name must be at least 2 characters long',
        'string.max': 'Full name must not exceed 100 characters'
    }),
    email: Joi.string().email().messages({
        'string.email': 'Please provide a valid email address'
    })
}).min(1).messages({
    'object.min': 'At least one field must be provided for update'
});

const updatePasswordSchema = Joi.object({
    current_password: Joi.string().required().messages({
        'any.required': 'Current password is required'
    }),
    new_password: Joi.string().min(6).required().messages({
        'string.min': 'New password must be at least 6 characters long',
        'any.required': 'New password is required'
    })
});

const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
});

/**
 * Validation middleware factory
 */
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            error.isJoi = true;
            return next(error);
        }

        req[property] = value;
        next();
    };
};

module.exports = {
    signupSchema,
    loginSchema,
    updateProfileSchema,
    updatePasswordSchema,
    paginationSchema,
    validate
};
