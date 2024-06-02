const rateLimiter = require('express-rate-limit');


const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Please try again after 15 minutes"
});

module.exports = limiter;