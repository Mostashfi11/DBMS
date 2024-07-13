// config/db.config.js

const oracledb = require('oracledb');
const dbConfig = {
  user: process.env.DB_USER || 'c##itembase',
  password: process.env.DB_PASSWORD || 'itembase',
  connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/xe'
};

async function initialize() {
  let connection;

  try {
    // Create a connection pool
    await oracledb.createPool(dbConfig);
    console.log('Connection pool started');
    
    // Get a connection from the pool
    connection = await oracledb.getConnection();
    console.log('Database connected');

    // Execute the query SELECT * FROM UNIT
    const result = await connection.execute(
      `SELECT * FROM UNIT`
    );

    console.log('Query result:', result.rows);

  } catch (err) {
    console.error('Error initializing database connection:', err);
    throw err;
  } finally {
    // Close the connection if it was successfully obtained
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed');
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Call the initialize function
initialize().catch(err => console.error(err));
