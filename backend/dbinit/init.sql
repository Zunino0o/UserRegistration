CREATE DATABASE IF NOT EXISTS usersdb;

USE usersdb;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, image_url VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id), CONSTRAINT UQ_users_Email UNIQUE (email)
);

DELIMITER //

CREATE PROCEDURE create_and_return(
    IN first_name VARCHAR(255), 
    IN last_name VARCHAR(255), 
    IN email VARCHAR(255), 
    IN phone VARCHAR(255), 
    IN address VARCHAR(255), 
    IN image_url VARCHAR(255)
) 
BEGIN 
	INSERT INTO
	    users (first_name, last_name, email, phone, address, image_url)
	VALUES 
		(first_name, last_name, email, phone, address, image_url);

	SELECT * FROM users WHERE id = LAST_INSERT_ID();
END// 

DELIMITER;