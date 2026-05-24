import pool from "./pool.js";

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM messages");

  return rows;
}
async function insert(message, user) {
  await pool.query(
    `INSERT INTO messages (message, username, date) VALUES ($1, $2, $3)`,
    [message, user, new Date()],
  );
}

async function getID(id) {
  const { row } = await pool.query(`SELECT * FROM messages WHERE id = ($1)`, [
    id,
  ]);
  return row;
}

export default {
  getAll,
  insert,
  getID,
};
