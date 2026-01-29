const pool = require("./pool");

const createNewUser = async (userData, hashedPassword) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    userData.email,
  ]);

  if (rows.length > 0) {
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
      false,
    ],
  );

  return result.rows[0];
};

module.exports = { createNewUser };
