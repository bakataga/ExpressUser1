/* SELECT * FROM users;
SELECT * FROM users;
INSERT INTO users (username, password) VALUES (?, ?) */
/* ALTER TABLE annonces ADD COLUMN status TEXT DEFAULT 'pending'; */
 /* ctrl maj q => acces a la base de donnée sqlite */
 /* ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'; */
UPDATE users SET role = 'admin' WHERE id = 18;


 /* UPDATE users SET role = 'admin' WHERE username = 'admin'; */