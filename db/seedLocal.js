const pool = require("./pool");

const USERS_SEED_DATA = `
    INSERT INTO users (first_name, last_name, email, password_hash, user_status)
    VALUES ('George', 'Washington', 'gwashington@gmail.com', 'USA', 'basic');

    INSERT INTO users (first_name, last_name, email, password_hash, user_status)
    VALUES ('Abraham', 'Lincoln', 'honestabe@gmail.com', 'USA', 'member');

    INSERT INTO users (first_name, last_name, email, password_hash, user_status)
    VALUES ('Donald', 'Trump', '45@gmail.com', 'USA', 'admin');
`;

const MESSAGES_SEED_DATA = `
    INSERT INTO messages (title, content, user_id)
    VALUES ('Honesy', 'Honesty is the best policy', 1);
    
    INSERT INTO messages (title, content, user_id)
    VALUES ('Truth', 'I cannot tell a lie', 2);

    INSERT INTO messages (title, content, user_id)
    VALUES ('The Very Best', 'It is gonna be yuge!', 3);
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
