-- Create interactions table
CREATE TABLE IF NOT EXISTS interactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    content VARCHAR(500) NOT NULL,
    interaction_date_time DATETIME NOT NULL,
    user_id BIGINT,
    deal_id BIGINT,
    direction VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    notes VARCHAR(500),
    INDEX idx_customer (customer_id),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
