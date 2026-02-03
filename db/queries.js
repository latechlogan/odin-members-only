const pool = require("./pool");

const getUserById = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  return rows[0];
};

const getUserByEmail = async (userEmail) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    userEmail,
  ]);

  return rows[0];
};

const createNewUser = async (userData, hashedPassword) => {
  const rows = await getUserByEmail(userData.email);

  if (rows) {
    throw new Error("Email already in use");
  }

  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password_hash, is_member, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, email`,
    [
      userData.first_name,
      userData.last_name,
      userData.email,
      hashedPassword,
      false,
      userData.is_admin,
    ],
  );

  return result.rows[0];
};

const listMessages = async () => {
  const { rows } = await pool.query(
    `SELECT messages.*, users.first_name, users.last_name
    FROM messages
    JOIN users ON messages.user_id = users.id
    `,
  );

  return rows;
};

const createNewMessage = async (title, content, user) => {
  await pool.query(
    `INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)`,
    [title, content, user],
  );
};

const deleteMessage = async (id) => {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
};

const makeMember = async (userId) => {
  await pool.query(`UPDATE users SET is_member = true WHERE id = $1`, [userId]);
};

module.exports = {
  getUserById,
  getUserByEmail,
  createNewUser,
  listMessages,
  createNewMessage,
  deleteMessage,
  makeMember,
};
