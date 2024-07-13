// config/db.config.js

const oracledb = require('oracledb');
const dbConfig = {
  user: process.env.DB_USER || 'c##itembase',
  password: process.env.DB_PASSWORD || 'itembase',
  connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/xe'
};

 async function connection(){
  try{
  const conn = await oracledb.getConnection(dbConfig);
  if(conn) console.log("connection established");
  else console.log("failed")
  }
  catch(e){
    console.log("Error connecting db", e.message)
  }
}

// Function to initialize connection pool
async function initialize() {
  await oracledb.createPool(dbConfig);
  console.log('Connection pool started');
}

// Function to close connection pool
async function close() {
  await oracledb.getPool().close();
  console.log('Connection pool closed');
}

module.exports = {
  initialize,
  close,
  oracledb,
  connection
};
