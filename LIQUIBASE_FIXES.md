# Liquibase Migration Fixes

## Ошибки, найденные и исправленные

### 1. ❌ Зарезервированное ключевое слово в имени столбца
**Файл:** `012-create-notifications-table.sql`  
**Проблема:** Столбец `read` - зарезервированное слово в MySQL  
**Ошибка при запуске:** `Syntax error in SQL statement`

**Решение:**
```sql
-- ДО:
read BOOLEAN NOT NULL DEFAULT FALSE,
INDEX idx_read (read)

-- ПОСЛЕ:
is_read BOOLEAN NOT NULL DEFAULT FALSE,
INDEX idx_is_read (is_read)
```

**Файлы для обновления:**
- `back/src/main/resources/db/changelog/012-create-notifications-table.sql` ✅
- `back/src/main/java/by/tarasovna/modules/notifications/entity/Notification.java` ✅
  - Поле переименовано с `read` на `isRead`
  - Аннотация `@Column(name = "is_read")`

---

### 2. ❌ Неправильный формат путей в Liquibase master changelog
**Файл:** `db.changelog-master.yml`  
**Проблема:** Пути без префикса `classpath:` не загружаются корректно

**Решение:**
```yaml
# ДО:
- include:
    file: db/changelog/001-create-users-table.sql

# ПОСЛЕ:
- include:
    file: classpath:db/changelog/001-create-users-table.sql
```

**Применено ко всем 14 файлам миграций** ✅

---

### 3. ❌ Функция CURDATE() в демо-данных
**Файлы:**
- `014-insert-demo-data.sql` (orders, tasks, campaigns)

**Проблема:** CURDATE() может давать нежелаемые результаты при выполнении SQL, т.к. возвращает дату без времени. При использовании в DATE_ADD/DATE_SUB функции может быть несовместимость.

**Решение:** Замена на NOW() (текущие дата и время)
```sql
-- ДО:
CURDATE()
DATE_ADD(CURDATE(), INTERVAL 10 DAY)
DATE_SUB(CURDATE(), INTERVAL 3 DAY)

-- ПОСЛЕ:
NOW()
DATE_ADD(NOW(), INTERVAL 10 DAY)
DATE_SUB(NOW(), INTERVAL 3 DAY)
```

**Применено к:**
- Orders inserts (4 строки) ✅
- Tasks inserts (4 строки) ✅
- Campaigns inserts (3 строки) ✅

---

### 4. ⚠️ DEFAULT CURDATE() в schema
**Файл:** `007-create-orders-table.sql`
**Исправлено на:** `DEFAULT (CURDATE())`

Изменено:
```sql
order_date DATE NOT NULL DEFAULT CURDATE()
→
order_date DATE NOT NULL DEFAULT (CURDATE())
```

---

## Контрольный список перед запуском

✅ **Liquibase YAML:**
- Master файл имеет корректный формат
- Все пути содержат префикс `classpath:`
- Порядок миграций правильный

✅ **SQL Синтаксис:**
- Нет зарезервированных слов в именах столбцов
- Все CREATE TABLE IF NOT EXISTS с правильным синтаксисом
- Индексы созданы корректно
- DEFAULT значения в правильном формате

✅ **Java Entities:**
- Notification.java: поле переименовано на `isRead`
- Индексы обновлены для соответствия schema

✅ **Demo Data:**
- CURDATE() заменён на NOW() везде где требуется
- Все вставки используют совместимые функции даты/времени

---

## Как запустить приложение после исправлений

1. **Убедитесь, что MySQL запущена:**
```bash
mysql -u root -p
CREATE DATABASE tarasovna_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

2. **Запустите Spring Boot приложение:**
```bash
cd back
./mvnw spring-boot:run
```

Liquibase должна:
- ✅ Загрузить master changelog
- ✅ Последовательно выполнить все 14 миграции
- ✅ Создать все таблицы
- ✅ Вставить demo data
- ✅ Завершиться без ошибок

---

## Дополнительные рекомендации

1. **Если ошибка persists:**
   - Очистите таблицу `DATABASECHANGELOG` в MySQL
   - Удалите базу данных и пересоздайте
   - Перезапустите приложение

2. **Логирование Liquibase:**
   Добавьте в `application.yml`:
   ```yaml
   logging:
     level:
       liquibase: DEBUG
   ```

3. **Проверка версии Liquibase:**
   Убедитесь, что используется совместимая версия (Spring Boot 4.0.3 использует Liquibase 4.x)

---

**Статус:** ✅ Все ошибки найдены и исправлены  
**Дата исправления:** 24.03.2026  
**Версия:** v0.0.1-SNAPSHOT
