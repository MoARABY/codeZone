// import libraries
const express = require('express'); 
const dotenv = require('dotenv').config();
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const app = express();


// import middlewares
const dbConnection=require('./config/dbConnection');
const limiter=require('./utils/rateLimiter');
const userRouter=require('./routes/userRouter');
const authRouter=require('./routes/authRouter');
const postRouter=require('./routes/postRouter');




// use middlewares
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
const {createLogger,transports,format}=require('winston');
const logger=createLogger({
    transports:[
        new transports.File({
            filename:'combined.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        })
    ]

})
logger.stream = {
    write:function(message){
        logger.info(message);
    }
}
app.use(morgan('combined',{stream:logger.stream}));




// START REQUESTS ==================================
app.get("/", (req, res) => {
    res.status(200).send("Social Media App")
})
app.use("/api/auth/", limiter, authRouter);
app.use("/api/user/", userRouter);
app.use("/api/post/", postRouter);
// =================================================




// SWAGGER =========================================
const swaggerSetup = require('./swagger');  
swaggerSetup(app);
// =================================================




let PORT=process.env.PORT || 3000;
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`); 
    dbConnection()
} )


// I'm excited to share that I've completed a Social Media App project! 🚀

// This app is built using NodeJS and utilizes the following libraries:
// - Express: a fast and minimalist web application framework for Node.js
// - mongoose: an Object Data Modeling (ODM) library for MongoDB and Node.js
// - dotenv: a zero-dependency module that loads environment variables from a .env file
// - helmet: a middleware that helps secure Express apps by setting various HTTP headers
// - morgan: a HTTP request logger middleware for Node.js
// - bcrypt: a library to help hash passwords
// - cors: a middleware that enables cross-origin resource sharing
// - nodemon: a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected
// - swagger-autogen: a tool that generates a Swagger documentation file based on the routes in the application
// - swagger-ui-express: a middleware that serves the Swagger UI interface for API documentation

// The app includes the following features:
// - User management (registration, login, profile update)
// - User creation, retrieval, deletion and (follow , unfollow)
// - Post creation, retrieval, timeline Posts from friends, deletion and reaction (like, unlike)

// The project structure follows a modular approach, with separate routers for user authentication, user management, and post management.

// I've also implemented a database connection using the dbConnection module.

// To run the app, simply clone the repository and run the following commands:
// 1. Install dependencies: npm install
// 2. Start the server: npm start

// Feel free to check out the code on my GitHub repository: [link to your GitHub repository]

// #SocialMediaApp #JavaScript #Express #NodeJS #WebDevelopment






