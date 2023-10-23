const express = require("express")

const app = express();

const mongoose = require('mongoose')

const http = require("http");
const { error } = require("console");

const server = http.createServer(app);

const initMeetingserver = require("./meeting.server");

initMeetingserver.initMeetingServer(server)

// mongoose.Promise = global.Promise;



// // const MONGO_DB_CONFIG = require("./config/app.config")



// // // mongoose
// // //     .connect("mongodb+srv://aliabbas:ro7Ik6zoC5nmWg4w@cluster0.m4bwaua.mongodb.net/?retryWrites=true&w=majority", {
// // //         usenewurlparser: true,
// // //         useunifiedtopology: true,
// // //     })
// // //     .then(() => {
// // //         console.log("Successfully connected ");
// // //     })
// // //     .catch((error) => {
// // //         console.log(`can not connect to database, ${error}`);
// // //     });
// // // app.use(express.json());
// // // app.use("/api", require("./routes/app.routes"))

// // // server.listen(process.env.port || 4000, function () {
// // //     console.log("ready to go");

// // // })


// const { Client } = require('pg');


const pool = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5434,
});

pool.connect();
pool.query(`Select * from meetings`, (err, res) => {
    if (!err) {
        console.log(res.rows);

        app.use(express.json());
        app.use("/api", require("./routes/app.routes"))

        server.listen(process.env.port || 5000, function () {
            console.log("ready to go");

        })

    }
    else { console.log(err.message) }

    pool.end;

});




// // const appConfig = require("./config/app.config");
// // const dbConfig = require("./config/app.config");

// // const Sequelize = require("sequelize");
// // const sequelize = new Sequelize(appConfig.DB, appConfig.USER, appConfig.PASSWORD, {
// //     host: appConfig.HOST,
// //     dialect: appConfig.dialect,
// //     operatorsAliases: false,

// //     pool: {
// //         max: appConfig.pool.max,
// //         min: appConfig.pool.min,
// //         acquire: appConfig.pool.acquire,
// //         idle: appConfig.pool.idle
// //     }
// // });

// // const db = {};

// // db.Sequelize = Sequelize;
// // db.sequelize = sequelize;

// // db.tutorials = require("./model/metting.model")(sequelize, Sequelize);

// // module.exports = db;




// // failure
// app.get('/auth/google/callback/failure', (req, res) => {
//     res.send("Error");
// })

// app.listen(3000, () => {
//     console.log("Server Running on port 3000");
// });
// const express = require('express');
// const { Server } = require('ws');

// const PORT = process.env.PORT || 3000;

// const server = express().use((req, res) => res.send('Hello World')).listen(PORT, () => console.log(`Listening on ${PORT}`));

// const wss = new Server({ server });

// wss.on('connection', ws => {
//     console.log('Client connected');
//     ws.on('message', message => console.log(`Received: ${message}`));
//     ws.on('close', () => console.log('Client disconnected'));
// });