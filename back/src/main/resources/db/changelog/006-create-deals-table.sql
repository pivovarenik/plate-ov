-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    customer_id BIGINT NOT NULL,
    value DECIMAL(19,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'LEAD',
    expected_close_date DATE NOT NULL,
    probability INT,
    assigned_user_id BIGINT,
    source VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    notes VARCHAR(500),
    INDEX idx_customer (customer_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
