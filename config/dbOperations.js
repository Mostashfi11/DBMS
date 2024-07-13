// dbOperations.js

const dbConfig = require('./db.config');

// Function to insert data into the database
async function insertData(tableName, columns, values) {
  let connection;

  try {
    connection = await dbConfig.oracledb.getConnection();

    // Construct the SQL query dynamically
    const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.map((v, i) => `:${i + 1}`).join(', ')})`;

    const bindParams = {};
    values.forEach((value, index) => {
      bindParams[index + 1] = value;
    });

    const result = await connection.execute(sql, bindParams);

    return result.rowsAffected;

  } catch (err) {
    console.error('Error inserting data:', err);
    throw err;

  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = {
  insertData
};
