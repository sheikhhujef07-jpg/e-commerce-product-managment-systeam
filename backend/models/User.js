const { pool } = require("../config/db");

async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0];
}

async function createUser({ name, email, password, role = "customer" }) {
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
  return { id: result.insertId, name, email, role };
}

module.exports = { findUserByEmail, createUser };
