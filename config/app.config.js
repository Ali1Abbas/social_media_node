const pool = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5434,
});



// const mONGO_DB_CONFIG = {
//     DB: "mongodb+srv://aliabbas:ro7Ik6zoC5nmWg4w@cluster0.m4bwaua.mongodb.net/?retryWrites=true&w=majority"
// };

module.exports = {
  pool

}

//mongodb+srv://abbasa487567:eKXBBSNSGRVhSGIS@cluster0.m4bwaua.mongodb.net/?retryWrites=true&w=majo