/**
 * Centralized error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || null;

    // Joi validation errors
    if (err.isJoi) {
        statusCode = 400;
        message = 'Validation Error';
        errors = err.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
        }));
    }

    // Supabase errors
    if (err.code) {
        switch (err.code) {
            case '23505': // Unique violation
                statusCode = 409;
                message = 'Resource already exists';
                break;
            case '23503': // Foreign key violation
                statusCode = 400;
                message = 'Invalid reference';
                break;
            case 'PGRST116': // No rows found
                statusCode = 404;
                message = 'Resource not found';
                break;
        }
    }

    const response = {
        success: false,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(statusCode).json(response);
};

module.exports = errorHandler;
