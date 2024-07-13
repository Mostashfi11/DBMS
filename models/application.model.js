const oracledb = require('oracledb');

async function getAllApplications() {
  const sql = `SELECT * FROM application`;
  const result = await oracledb.getPool().getConnection().execute(sql);
  return result.rows;
}

async function getApplicationById(id) {
  const sql = `SELECT * FROM application WHERE id = :id`;
  const binds = { id };
  const result = await oracledb.getPool().getConnection().execute(sql, binds);
  return result.rows[0];
}

async function createApplication(application) {
  const sql = `
    INSERT INTO application (
      name, email, phone, department, item, description, quantity, 
      purpose, brand, date_needed, duration, reason, impact, issuer_name, 
      issuer_email, requirements, request_date, attachments
    ) VALUES (
      :name, :email, :phone, :department, :item, :description, :quantity, 
      :purpose, :brand, :date_needed, :duration, :reason, :impact, :issuer_name, 
      :issuer_email, :requirements, :request_date, :attachments
    )`;
  const binds = { ...application };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function updateApplication(id, application) {
  const sql = `
    UPDATE application SET 
      name = :name, email = :email, phone = :phone, department = :department, 
      item = :item, description = :description, quantity = :quantity, 
      purpose = :purpose, brand = :brand, date_needed = :date_needed, 
      duration = :duration, reason = :reason, impact = :impact, 
      issuer_name = :issuer_name, issuer_email = :issuer_email, 
      requirements = :requirements, request_date = :request_date, 
      attachments = :attachments
    WHERE id = :id`;
  const binds = { ...application, id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

async function deleteApplication(id) {
  const sql = `DELETE FROM application WHERE id = :id`;
  const binds = { id };
  const options = { autoCommit: true };
  const result = await oracledb.getPool().getConnection().execute(sql, binds, options);
  return result;
}

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication
};
