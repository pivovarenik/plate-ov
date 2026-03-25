-- liquibase formatted sql

-- changeset tarasovna:016-update-customer-revenue
UPDATE customers SET total_revenue = 125000.50 WHERE id = 1;
UPDATE customers SET total_revenue = 89000.00 WHERE id = 2;
UPDATE customers SET total_revenue = 42000.00 WHERE id = 3;
UPDATE customers SET total_revenue = 210000.00 WHERE id = 4;

-- changeset tarasovna:016-insert-demo-customers-extra
INSERT INTO customers (first_name, last_name, email, phone, company_name, city, country, segment, active, total_revenue) VALUES
('Андрей', 'Козлов', 'a.kozlov@beltrans.by', '+375291000010', 'ООО «БелТранс»', 'Гомель', 'Беларусь', 'PREMIUM', true, 95000.00),
('Ольга', 'Новикова', 'o.novikova@optima.by', '+375291000011', 'ООО «Оптима-Ойл»', 'Брест', 'Беларусь', 'STANDARD', true, 38000.00),
('Дмитрий', 'Орлов', 'd.orlov@stroi.by', '+375291000012', 'ЗАО «СтройМазут»', 'Могилёв', 'Беларусь', 'GENERAL', true, 12000.00),
('Светлана', 'Ким', 's.kim@export.eu', '+375291000013', 'SpedOil GmbH', 'Берлин', 'Германия', 'PREMIUM', true, 450000.00),
('Николай', 'Баранов', 'n.baranov@local.by', '+375291000014', 'ИП Баранов', 'Мозырь', 'Беларусь', 'STANDARD', true, 6700.00),
('Татьяна', 'Лисовская', 't.lisovskaya@agro.by', '+375291000015', 'ОАО «АгроНефтеСбыт»', 'Бобруйск', 'Беларусь', 'GENERAL', true, 28000.00);

-- changeset tarasovna:016-insert-partners
INSERT INTO partners (company_name, contact_person, email, phone, partner_type, address, annual_volume, status, active) VALUES
('ООО «Логистика-Юг»', 'Сергей Волков', 'sv@logist-yug.by', '+375172111111', 'Дистрибьютор', 'г. Минск, пр. Независимости 95', 620000.00, 'ACTIVE', true),
('ЗАО «ТрансНефтьСервис»', 'Елена Рыбакова', 'office@tns.by', '+375172222222', 'Перевозчик', 'г. Гомель, ул. Железнодорожная 12', 480000.00, 'ACTIVE', true),
('ООО «БалтТрейд»', 'Мартин Каунас', 'info@balttrade.lt', '+37061234567', 'Экспорт', 'Вильнюс, LT', 310000.00, 'ACTIVE', true),
('ИП «СвязьСбыт»', 'Оксана Левитан', 'levitan@svyaz.by', '+375173333333', 'Агент', 'г. Мозырь, ул. Промышленная 3', 95000.00, 'ACTIVE', true),
('ООО «ТехноСнаб»', 'Игорь Панкратов', 'pankratov@tehnos.by', '+375174444444', 'Реселлер', 'г. Витебск, пр. Строителей 7', 220000.00, 'ACTIVE', true);

-- changeset tarasovna:016-insert-suppliers
INSERT INTO suppliers (company_name, contact_person, email, phone, address, city, country, payment_terms, total_order_value, status, active) VALUES
('ООО «СырьёИмпорт»', 'Виктор Смирнов', 'supply@syrimport.ru', '+74951234567', 'Москва, ул. Нефтяная 1', 'Москва', 'Россия', '30 дней', 1200000.00, 'ACTIVE', true),
('KazPetro Supply', 'Айдар Нурланов', 'sales@kzpetro.kz', '+77011234567', 'Алматы, промзона', 'Алматы', 'Казахстан', 'предоплата 50%', 890000.00, 'ACTIVE', true),
('ОАО «БелНефтеХим»', 'Анна Жук', 'procurement@bnh.by', '+375175555555', 'г. Новополоцк', 'Новополоцк', 'Беларусь', 'отсрочка 14 дней', 560000.00, 'ACTIVE', true),
('EU Additives Ltd', 'Hans Mueller', 'h.m@euadd.eu', '+491701234567', 'Hamburg', 'Гамбург', 'Германия', 'LC', 340000.00, 'ACTIVE', true),
('ООО «Тара и Упаковка»', 'Павел Короткий', 'p.k@tara.by', '+375176666666', 'г. Жодино', 'Жодино', 'Беларусь', 'по факту', 78000.00, 'ACTIVE', true);

-- changeset tarasovna:016-insert-products-extra
INSERT INTO products (name, description, sku, price, stock, category, unit, status, active) VALUES
('Сжиженный газ (пропан-бутан)', 'СПБТ для бытовых нужд', 'LPG-001', 0.85, 35000, 'Газ', 'т', 'ACTIVE', true),
('Масло базовое группы II', 'Базовые масла для смазок', 'BASE-OIL-II', 1.10, 12000, 'Масла', 'т', 'ACTIVE', true),
('Мазут М-40', 'Мазут для котельных', 'MAZUT-M40', 0.88, 22000, 'Мазут', 'л', 'ACTIVE', true);

-- changeset tarasovna:016-insert-deals-extra
INSERT INTO deals (title, description, customer_id, value, status, expected_close_date, probability, assigned_user_id) VALUES
('Поставка СПБТ в регион', 'Контракт на 20 т пропан-бутана', 5, 32000, 'NEGOTIATION', '2026-05-30', 55, 2),
('Расширение экспорта в DE', 'Пилотная поставка битума', 8, 180000, 'PROPOSAL', '2026-06-15', 45, 3),
('Региональная сеть АЗС', 'Консолидация заказов на бензин', 6, 95000, 'LEAD', '2026-04-20', 30, 2),
('Сезонный мазут для агро', 'Погрузка партии М-100', 10, 15000, 'NEGOTIATION', '2026-04-30', 65, 3),
('Агентский договор на год', 'Партнёрское сопровождение сбыта', 7, 40000, 'PROPOSAL', '2026-05-10', 50, 2);

-- changeset tarasovna:016-insert-orders-extra
INSERT INTO orders (customer_id, status, total_amount, tax, order_date, expected_delivery_date, assigned_user_id) VALUES
(5, 'PENDING', 22000, 3666.67, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 2),
(6, 'CONFIRMED', 15000, 2500, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 3),
(8, 'SHIPPED', 98000, 16333.33, DATE_SUB(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 2),
(9, 'DELIVERED', 6700, 1116.67, DATE_SUB(CURDATE(), INTERVAL 20 DAY), DATE_SUB(CURDATE(), INTERVAL 1 DAY), 3),
(10, 'DELIVERED', 28000, 4666.67, DATE_SUB(CURDATE(), INTERVAL 8 DAY), CURDATE(), 2);

-- changeset tarasovna:016-insert-tasks-extra
INSERT INTO tasks (title, description, status, priority, assigned_user_id, due_date, related_customer_id, category) VALUES
('Согласовать скидку для БелТранс', 'Обсудить с руководством 3% на дизель', 'OPEN', 'HIGH', 2, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 5, 'SALES'),
('Проверить отгрузку в Германию', 'Документы и таможня для SpedOil', 'IN_PROGRESS', 'URGENT', 3, CURDATE(), 8, 'LOGISTICS'),
('Звонок агенту по Мозырю', 'Уточнить объём по ИП Баранов', 'OPEN', 'MEDIUM', 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), 9, 'SALES'),
('Обновить прайс на газ', 'Согласовать с закупками', 'OPEN', 'LOW', 3, DATE_ADD(CURDATE(), INTERVAL 7 DAY), NULL, 'ADMIN'),
('Согласование договора с ТехноСнаб', 'Юридическая проверка приложения', 'IN_PROGRESS', 'MEDIUM', 2, DATE_ADD(CURDATE(), INTERVAL 5 DAY), NULL, 'ADMIN');

-- changeset tarasovna:016-insert-interactions
INSERT INTO interactions (customer_id, type, content, interaction_date_time, user_id, deal_id, direction) VALUES
(1, 'EMAIL', 'Отправлено КП на поставку дизеля, ожидаем ответ.', '2026-03-18 10:15:00', 2, 1, 'OUTBOUND'),
(1, 'PHONE', 'Созвон с закупками: уточнение объёма на Q2.', '2026-03-19 14:00:00', 2, 1, 'OUTBOUND'),
(2, 'MEETING', 'Встреча в офисе: обсуждение условий бензина АИ-95.', '2026-03-10 11:00:00', 3, 2, 'INBOUND'),
(3, 'CHAT', 'Переписка в мессенджере по срочной отгрузке мазута.', '2026-03-22 09:30:00', 2, 3, 'OUTBOUND'),
(4, 'NOTE', 'Клиент подтвердил готовность к годовому контракту на битум.', '2026-03-25 16:45:00', 3, 4, 'INTERNAL'),
(5, 'EMAIL', 'Запрос коммерческого предложения на СПБТ.', '2026-03-23 08:20:00', 2, NULL, 'INBOUND'),
(8, 'PHONE', 'Переговоры с отделом логистики по экспорту.', '2026-03-21 13:00:00', 3, NULL, 'OUTBOUND'),
(6, 'EMAIL', 'Напоминание об оплате по счёту №1042.', '2026-03-24 10:00:00', 2, NULL, 'OUTBOUND'),
(6, 'EMAIL', 'Ответ клиента: подтверждение дат доставки.', '2026-03-24 15:30:00', 3, NULL, 'INBOUND'),
(9, 'PHONE', 'Короткий звонок: уточнение графика поставок.', '2026-03-20 12:00:00', 2, NULL, 'OUTBOUND'),
(10, 'MEETING', 'Запланирована встреча на площадке агрокомплекса.', '2026-03-26 14:00:00', 3, NULL, 'OUTBOUND'),
(7, 'NOTE', 'Зафиксированы пожелания по отсрочке платежа.', '2026-03-17 17:00:00', 2, NULL, 'INTERNAL');

-- changeset tarasovna:016-insert-comments
INSERT INTO comments (content, entity_id, entity_type, created_by_user_id, status) VALUES
('Клиент просит счёт в двух экземплярах.', 1, 'CUSTOMER', 2, 'ACTIVE'),
('Перспективный контракт, держим связь еженедельно.', 1, 'CUSTOMER', 3, 'ACTIVE'),
('По сделке согласованы базовые условия поставки.', 1, 'DEAL', 2, 'ACTIVE'),
('Нужен контроль сроков оплаты.', 2, 'DEAL', 3, 'ACTIVE'),
('Проверить договор с юристами до подписания.', 5, 'DEAL', 2, 'ACTIVE'),
('Низкая маржа, но объём стабильный.', 9, 'CUSTOMER', 3, 'ACTIVE'),
('Приоритет — экспортные документы.', 8, 'CUSTOMER', 2, 'ACTIVE'),
('Связать с отделом логистики по маршруту.', 6, 'CUSTOMER', 3, 'ACTIVE');

-- changeset tarasovna:016-insert-notifications
INSERT INTO notifications (user_id, title, message, type, is_read, related_entity_id, related_entity_type) VALUES
(1, 'Система', 'Добро пожаловать в Tarasovna CRM. Демо-данные загружены.', 'INFO', false, NULL, NULL),
(2, 'Задача', 'Срочно: согласовать скидку для БелТранс', 'WARNING', false, NULL, NULL),
(2, 'Заказ', 'Новый заказ в статусе «ожидает»', 'INFO', true, 5, 'ORDER'),
(3, 'Напоминание', 'Созвон с закупками Ланополь — завтра 10:00', 'INFO', false, NULL, NULL),
(3, 'Сделка', 'Сделка «Поставка СПБТ» перешла в переговоры', 'INFO', false, NULL, NULL),
(1, 'Безопасность', 'Рекомендуется сменить пароль после демо.', 'INFO', true, NULL, NULL),
(2, 'Клиент', 'Новый комментарий по клиенту ООО Ланополь', 'INFO', false, 1, 'CUSTOMER'),
(3, 'Отчёт', 'Отчёт по продажам за месяц доступен', 'INFO', true, NULL, NULL),
(2, 'Кампания', 'Email-кампания Q1: открытия 12%', 'INFO', false, NULL, NULL),
(3, 'Система', 'Резервное копирование БД выполнено (имитация)', 'INFO', true, NULL, NULL);

-- changeset tarasovna:016-insert-campaigns-extra
INSERT INTO campaigns (name, description, status, type, start_date, end_date, budget, target_audience, response_count, created_by_user_id, segment) VALUES
('Ретаргетинг B2B', 'Повторные касания с лидов из выставки', 'ACTIVE', 'EMAIL', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 7500, 120, 0, 2, 'STANDARD'),
('Промо АЗС весна', 'Материалы для сетей АЗС-партнёров', 'DRAFT', 'SOCIAL', DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 60 DAY), 12000, 2000, 0, 3, 'ALL');
