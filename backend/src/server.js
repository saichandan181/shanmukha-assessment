const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// For Vercel, we export the app instead of listening
if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log(`
    ╔═══════════════════════════════════════╗
    ║   User Management System - Backend   ║
    ╠═══════════════════════════════════════╣
    ║  Server running on port ${PORT}         ║
    ║  Environment: ${process.env.NODE_ENV || 'development'}           ║
    ║  Time: ${new Date().toLocaleString()}    ║
    ╚═══════════════════════════════════════╝
        `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received: closing HTTP server');
        process.exit(0);
    });

    process.on('SIGINT', () => {
        console.log('SIGINT signal received: closing HTTP server');
        process.exit(0);
    });
}
