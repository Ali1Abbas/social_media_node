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



// // mongoose
// //     .connect("mongodb+srv://aliabbas:ro7Ik6zoC5nmWg4w@cluster0.m4bwaua.mongodb.net/?retryWrites=true&w=majority", {
// //         usenewurlparser: true,
// //         useunifiedtopology: true,
// //     })
// //     .then(() => {
// //         console.log("Successfully connected ");
// //     })
// //     .catch((error) => {
// //         console.log(`can not connect to database, ${error}`);
// //     });
// // app.use(express.json());
// // app.use("/api", require("./routes/app.routes"))

// // server.listen(process.env.port || 4000, function () {
// //     console.log("ready to go");

// // })


const { Client } = require('pg');


const pool = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5433,
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




// const appConfig = require("./config/app.config");
// const dbConfig = require("./config/app.config");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(appConfig.DB, appConfig.USER, appConfig.PASSWORD, {
//     host: appConfig.HOST,
//     dialect: appConfig.dialect,
//     operatorsAliases: false,

//     pool: {
//         max: appConfig.pool.max,
//         min: appConfig.pool.min,
//         acquire: appConfig.pool.acquire,
//         idle: appConfig.pool.idle
//     }
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.tutorials = require("./model/metting.model")(sequelize, Sequelize);

// module.exports = db;


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(
    new GoogleStrategy(
        {
            clientID: '888833156940-8e3tddn6333k2dlg7v4jqiriv8sgn7nh.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true
        },
        (request, accessToken, refreshToken, profile, done) => {
            // Handle user authentication here (e.g., save user to your database)
            console.log(profile);
            return done(null, profile);

        }
    )
);
const cookieSession = require('cookie-session');


app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send("<button><a href='/auth/google/'>Login With Google</a></button>")
});

// Auth
app.get('/auth/google', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}));

// Auth Callback
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/callback/success',
        failureRedirect: '/auth//google/callback/failure'
    }));

// Success
app.get('/auth/google/callback/success', (req, res) => {
    if (!req.user)
        res.redirect('/auth/google/callback/failure');
    res.send("Welcome " + req.user.email);
    app.use('auth/google/create/', res, req => {
        pool.query(`Insert  into meetings(hostId) VALUES(${req.user.email})`)
        app.use(express.json());

        return res.status(200).send({ message: "success", data: res });



    })

});




// failure
app.get('/auth/google/callback/failure', (req, res) => {
    res.send("Error");
})

app.listen(3000, () => {
    console.log("Server Running on port 3000");
});
