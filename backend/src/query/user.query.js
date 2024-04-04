const QUERY = {
  GET_USERS: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 100',
  GET_USER_BY_ID: 'SELECT * FROM users WHERE id = ?',
  GET_USER_BY_EMAIL: 'SELECT * FROM users WHERE email LIKE ?',
  CREATE_USER:
    'INSERT INTO users(first_name, last_name, email, phone, address, image_url) VALUES(?, ?, ?, ?, ?, ?)',
  UPDATE_USER:
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, image_url = ? WHERE id = ?',
  DELETE_USER: 'DELETE FROM users WHERE id = ?',
  CREATE_USER_PROCEDURE: 'CALL create_and_return(?, ?, ?, ?, ?, ?)',
};

export default QUERY;
