const morgan  = require("morgan");
const fs = require("fs");
const path = require("path");

// Create log directory if it doesn't exist
const logDirectory = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Create a write stream for the access log
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

const morganMiddleware = [
    // Write logs to the access log file
    morgan('combined', { stream: accessLogStream }),

    // Only log in development
    // process.env.NODE_ENV !== 'production' && morgan('dev'),
]. filter(Boolean);

module.exports = morganMiddleware;