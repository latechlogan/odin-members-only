const pool = require("./pool");

const CREATE_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        user_status VARCHAR(20) DEFAULT 'basic',  -- 'basic', 'member', 'admin'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const CREATE_MESSAGES_TABLE = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const migrate = async () => {
  console.log("Migrating...");
  try {
    await pool.query(CREATE_USERS_TABLE);
    await pool.query(CREATE_MESSAGES_TABLE);
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error.message);
  } finally {
    await pool.end();
  }
};

migrate();
