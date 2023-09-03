


// const MONGO_DB_CONFIG = {
//     DB: "mongodb+srv://aliabbas:ro7Ik6zoC5nmWg4w@cluster0.m4bwaua.mongodb.net/?retryWrites=true&w=majority"
// };

module.exports = {

    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "password",
    DB: "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
    
}

//mongodb+srv://abbasa487567:eKXBBSNSGRVhSGIS@cluster0.m4bwaua.mongodb.net/?retryWrites=true&w=majo