const pool = require("./pool");

const USERS_SEED_DATA = `
    INSERT INTO users (first_name, last_name, email, password_hash, user_status)
    VALUES ('Alice', 'Chen', 'alice.chen@example.com', 'hashed_password_1', 'basic');

    INSERT INTO users (first_name, last_name, email, password_hash, user_status)
    VALUES ('Marcus', 'Johnson', 'marcus.j@example.com', 'hashed_password_2', 'member');

    INSERT INTO users (first_name, last_name, email, password_hash, user_status)
    VALUES ('Sarah', 'Miller', 'sarah.miller@example.com', 'hashed_password_3', 'admin');
`;

const MESSAGES_SEED_DATA = `
    INSERT INTO messages (title, content, user_id)
    VALUES ('New to the group', 'Hey everyone, just signed up. Excited to be here!', 1);

    INSERT INTO messages (title, content, user_id)
    VALUES ('Weekend plans', 'Anyone up for a hiking trip this Saturday?', 2);

    INSERT INTO messages (title, content, user_id)
    VALUES ('Welcome new members', 'A quick reminder to read the community guidelines. Happy posting!', 3);
`;

const seed = async () => {
  console.log("Seeding...");
  try {
    await pool.query(USERS_SEED_DATA);
    await pool.query(MESSAGES_SEED_DATA);
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await pool.end();
  }
};

seed();
