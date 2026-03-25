-- liquibase formatted sql

-- changeset tarasovna:014-insert-demo-users
INSERT INTO users (first_name, last_name, email, password, `role`, phone, active) VALUES
('Admin', 'User', 'admin@example.com', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy.RHNM', 'ADMIN', '+375291234567', true),
('John', 'Sales', 'john@example.com', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy.RHNM', 'USER', '+375291234568', true),
('Jane', 'Manager', 'jane@example.com', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy.RHNM', 'USER', '+375291234569', true);

-- changeset tarasovna:014-insert-demo-customers
INSERT INTO customers (first_name, last_name, email, phone, company_name, city, country, segment, active) VALUES
('Ivan', 'Petrov', 'ivan@company1.com', '+375291000001', 'ООО Ланополь', 'Минск', 'Беларусь', 'PREMIUM', true),
('Marina', 'Ivanova', 'marina@company2.com', '+375291000002', 'ЗАО Поставщик', 'Витебск', 'Беларусь', 'STANDARD', true),
('Petr', 'Smirnov', 'petr@company3.com', '+375291000003', 'ООО Трейд', 'Гродно', 'Беларусь', 'GENERAL', true),
('Elena', 'Volkova', 'elena@company4.com', '+375291000004', 'ООО Нефть', 'Полоцк', 'Беларусь', 'PREMIUM', true);

-- changeset tarasovna:014-insert-demo-products
INSERT INTO products (name, description, sku, price, stock, category, unit, status, active) VALUES
('Дизельное топливо', 'Дизель марки ДС', 'DIESEL-001', 1.25, 100000, 'Топливо', 'л', 'ACTIVE', true),
('Бензин АИ-95', 'Бензин автомобильный', 'PETROL-AI95', 1.35, 80000, 'Топливо', 'л', 'ACTIVE', true),
('Мазут М-100', 'Мазут для отопления', 'MAZUT-M100', 0.95, 50000, 'Мазут', 'л', 'ACTIVE', true),
('Битум БНД 60/90', 'Битум для дорог', 'BITUM-BND', 2.50, 10000, 'Битум', 'т', 'ACTIVE', true);

-- changeset tarasovna:014-insert-demo-deals
INSERT INTO deals (title, description, customer_id, value, status, expected_close_date, probability, assigned_user_id) VALUES
('Крупная поставка дизеля', 'Поставка 10000 л дизеля на Q1', 1, 12500, 'NEGOTIATION', '2026-04-30', 75, 2),
('Контрактная закупка', 'Закупка бензина на 6 месяцев', 2, 20000, 'PROPOSAL', '2026-03-31', 60, 3),
('Экстренная поставка', 'Срочная доставка мазута', 3, 5000, 'LEAD', '2026-04-15', 40, 2),
('Долгосрочный контракт', 'Годовой контракт на поставку битума', 4, 25000, 'CLOSED_WON', '2026-03-25', 100, 3);

-- changeset tarasovna:014-insert-demo-orders
INSERT INTO orders (customer_id, status, total_amount, tax, order_date, expected_delivery_date, assigned_user_id) VALUES
(1, 'CONFIRMED', 15000, 2500, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 2),
(2, 'PENDING', 8000, 1333.33, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 3),
(3, 'SHIPPED', 5500, 916.67, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 2),
(4, 'DELIVERED', 12000, 2000, DATE_SUB(CURDATE(), INTERVAL 10 DAY), CURDATE(), 3);

-- changeset tarasovna:014-insert-demo-tasks
INSERT INTO tasks (title, description, status, priority, assigned_user_id, due_date, related_customer_id, category) VALUES
('Подготовить счет для Ланополь', 'Выставить счет на 15000 руб', 'OPEN', 'HIGH', 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 'SALES'),
('Проверить доставку', 'Убедиться в доставке мазута', 'IN_PROGRESS', 'URGENT', 3, CURDATE(), 3, 'LOGISTICS'),
('Подготовить предложение', 'Подготовить КП для нового клиента', 'OPEN', 'MEDIUM', 2, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 2, 'SALES'),
('Обновить прайс', 'Обновить прайс-лист на битум', 'COMPLETED', 'LOW', 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 4, 'ADMIN');

-- changeset tarasovna:014-insert-demo-campaigns
INSERT INTO campaigns (name, description, status, type, start_date, end_date, budget, target_audience, created_by_user_id, segment) VALUES
('Email кампания Q1', 'Рассылка по клиентам о новых продуктах', 'ACTIVE', 'EMAIL', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 5000, 500, 2, 'PREMIUM'),
('Социальные сети', 'Реклама в социальных сетях', 'DRAFT', 'SOCIAL', DATE_ADD(CURDATE(), INTERVAL 10 DAY), DATE_ADD(CURDATE(), INTERVAL 40 DAY), 3000, 1000, 3, 'ALL'),
('SMS рассылка', 'Информирование о специальных предложениях', 'PAUSED', 'SMS', DATE_SUB(CURDATE(), INTERVAL 15 DAY), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 1000, 200, 2, 'STANDARD');

-- changeset tarasovna:014-insert-demo-system-settings
INSERT INTO system_settings (setting_key, setting_value, description, category, data_type) VALUES
('COMPANY_NAME', 'ОАО "Мозырский НПЗ"', 'Название компании', 'GENERAL', 'STRING'),
('TAX_RATE', '20', 'Налоговая ставка в %', 'FINANCE', 'INTEGER'),
('CURRENCY', 'BYN', 'Валюта по умолчанию', 'FINANCE', 'STRING'),
('DEFAULT_DELIVERY_DAYS', '5', 'Дни доставки по умолчанию', 'LOGISTICS', 'INTEGER');
