-- liquibase formatted sql

-- changeset tarasovna:015-reset-demo-passwords-plain
UPDATE users SET password = 'password123' WHERE email IN ('admin@example.com', 'john@example.com', 'jane@example.com');
