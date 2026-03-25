# Tarasovna CRM - Oil Processing Enterprise Management System

## 🎯 Overview

A production-ready enterprise CRM and marketing automation system designed for oil processing enterprises (Мозырский НПЗ). The system automates sales processes, manages customer relationships, coordinates marketing campaigns, and provides comprehensive business analytics.

## 🏗️ Architecture

### Technology Stack

**Backend:**
- Java 17+
- Spring Boot 4.0.3
- Spring Security (JWT)
- MySQL 8.0+
- JPA/Hibernate ORM
- Liquibase for database migrations

**Frontend:**
- React 18+ (TypeScript)
- Material-UI (MUI) for enterprise UX
- Redux Toolkit for state management
- Axios for HTTP requests
- React Router for navigation
- Recharts for data visualization
- Vite as build tool

### Project Structure

```
plate-ov/
├── back/                           # Backend (Spring Boot)
│   ├── src/main/java/by/tarasovna/
│   │   ├── auth/                  # Authentication & JWT
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── security/
│   │   │   └── util/
│   │   ├── common/                # Shared infrastructure
│   │   │   ├── entity/            # Base entity classes
│   │   │   ├── enums/             # Status enums
│   │   │   ├── dto/               # Common DTOs
│   │   │   ├── exception/         # Exception handling
│   │   │   └── util/
│   │   ├── config/                # Configuration
│   │   │   ├── SecurityConfig
│   │   │   └── WebConfig
│   │   └── modules/               # Business domains
│   │       ├── users/             # User management
│   │       ├── customers/         # CRM customers
│   │       ├── partners/          # Business partners
│   │       ├── suppliers/         # Supplier management
│   │       ├── products/          # Inventory
│   │       ├── deals/             # Sales pipeline
│   │       ├── orders/            # Order management
│   │       ├── tasks/             # Task tracking
│   │       ├── campaigns/         # Marketing campaigns
│   │       ├── interactions/      # Communication history
│   │       ├── comments/          # Entity annotations
│   │       ├── notifications/     # System alerts
│   │       ├── reports/           # Analytics
│   │       └── settings/          # Configuration
│   ├── src/main/resources/
│   │   ├── application.yml        # Configuration
│   │   └── db/changelog/          # Liquibase migrations
│   └── pom.xml
│
├── front/                         # Frontend (React)
│   ├── src/
│   │   ├── app/                   # Global setup
│   │   │   └── store.ts           # Redux store
│   │   ├── features/              # Feature modules
│   │   │   ├── auth/              # Authentication
│   │   │   ├── customers/         # Customer module
│   │   │   ├── ui/                # UI state
│   │   │   └── ...
│   │   ├── pages/                 # Route pages
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── CustomersPage.tsx
│   │   │   ├── DealsPage.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   └── ...
│   │   ├── shared/                # Reusable components
│   │   │   ├── api/               # API client
│   │   │   ├── components/        # UI components
│   │   │   ├── layouts/           # Layout templates
│   │   │   └── hooks/             # Custom hooks
│   │   ├── App.tsx                # Root component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── docker-compose.yml             # Local MySQL setup
```

## 📋 Core Modules (20+ Use Cases)

### 1. Authentication & Authorization
- JWT-based login with email/password
- Role-based access control (USER, ADMIN)
- Automatic session timeout
- Secure token storage

### 2. Customer Management (CRM)
- Create/Read/Update/Delete customers
- Customer segmentation (Premium, Standard, General)
- Track total revenue and lifetime value
- Search and filter by company/email
- Customer contact history

### 3. Deal Pipeline
- Sales opportunity tracking (LEAD → WON/LOST)
- Probability assessment
- Expected close date tracking
- Deal value forecasting
- Customer-linked opportunities

### 4. Order Management
- Order creation and tracking
- Status workflow (Pending → Delivered)
- Shipping address and tracking
- Tax calculation
- Order-to-customer linking

### 5. Product Inventory
- Oil product catalog (Diesel, Benzin, Mazut, Bitum)
- Stock level management
- Pricing management
- Category organization
- SKU tracking

### 6. Marketing Campaigns
- Campaign creation (Email, SMS, Social)
- Budget tracking
- Target audience segmentation
- Campaign status lifecycle
- Response rate tracking

### 7. Task Management
- Task assignment by priority (Low/Medium/High/Urgent)
- Due date tracking
- Status workflow
- Category organization
- Customer/Deal linking

### 8. Interaction Tracking
- Communication log (Email, Phone, Meeting, Chat)
- Inbound/Outbound tracking
- User assignment
- Customer/Deal linkage
- Interaction timeline

### 9. Comments & Notes
- Add notes to customers, deals, orders
- Thread-based comments
- User attribution
- Timestamp tracking

### 10. Notifications System
- Real-time alerts
- Task reminders
- Order status updates
- Deal milestone notifications
- Read/unread tracking

### 11. Analytics & Reporting
- Revenue trends (charts/graphs)
- Deal pipeline visualization
- Sales forecasting
- Customer segmentation analysis
- Export to CSV

### 12. User Management (Admin)
- Create/manage system users
- Role assignment
- User activation/deactivation
- Team member tracking

### 13. System Settings
- Company configuration
- Currency settings
- Tax rate configuration
- Default delivery timeframes
- Global preferences

### 14. Business Partners
- Partner information management
- Partner type classification
- Annual volume tracking
- Contact details

### 15. Supplier Management
- Supplier contact database
- Payment terms management
- Order value tracking
- Supplier status

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Backend Setup

1. **Install MySQL & Create Database**
```bash
mysql -u root -p
CREATE DATABASE tarasovna_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Navigate to backend**
```bash
cd back
```

3. **Run the application**
```bash
./mvnw spring-boot:run
```

Backend will start on `http://localhost:8080/api`

### Frontend Setup

1. **Navigate to frontend**
```bash
cd front
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Frontend will start on `http://localhost:3000`

### Demo Credentials

```
Email: admin@example.com
Password: password123 (BCrypt: $2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy.RHNM)
Role: ADMIN
```

Additional demo users:
- john@example.com (USER role)
- jane@example.com (USER role)

## 📚 API Documentation

### Authentication
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": 1,
    "email": "admin@example.com",
    "fullName": "Admin User",
    "role": "ADMIN",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer"
  }
}
```

### Customers API
```
GET /api/customers?page=0&size=20&search=query
GET /api/customers/{id}
POST /api/customers
PUT /api/customers/{id}
DELETE /api/customers/{id}
```

### Deals API
```
GET /api/deals?page=0&size=20&status=LEAD
GET /api/deals/{id}
POST /api/deals
PUT /api/deals/{id}
DELETE /api/deals/{id}
```

### Orders API
```
GET /api/orders?page=0&size=20&status=PENDING
POST /api/orders
PUT /api/orders/{id}
DELETE /api/orders/{id}
```

## 🎨 Frontend Features

### UI/UX Highlights
- Responsive sidebar navigation
- Enterprise dashboard with KPI metrics
- Data visualization with Recharts (line charts, pie charts)
- Search and filter on list views
- Inline editing with modal dialogs
- Material-UI components for professional appearance
- Dark-theme sidebar with light content area
- Loading states and empty states
- Error handling and notifications

### Pages Implemented
- ✅ Login Page (with demo credentials)
- ✅ Dashboard (with KPI cards and charts)
- ✅ Customers (CRUD with search/filter)
- ⏳ Deals (Pipeline/Kanban board ready)
- ⏳ Orders (Order management ready)
- ⏳ Products (Inventory tracking ready)
- ⏳ Campaigns (Marketing automation ready)
- ⏳ Tasks (Task management ready)
- ⏳ Reports (Analytics & CSV export ready)
- ⏳ Settings (System configuration ready)

## 🔒 Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Password Hashing**: BCrypt password encoding
- **CORS**: Cross-origin requests properly configured
- **HTTPS Ready**: Can be deployed with HTTPS
- **Request Validation**: Server-side validation on all inputs
- **Exception Handling**: Global exception handler with proper error codes

## 📊 Database Schema

14 core tables:
- users
- customers
- partners
- suppliers
- products
- deals
- orders
- tasks
- campaigns
- interactions
- comments
- notifications
- system_settings
- (reports/analytics via views)

Indices on frequently searched columns for optimal query performance.

## 🚢 Deployment

### Docker Setup (Optional)
```bash
docker-compose up -d
```

### Production Build (Frontend)
```bash
cd front
npm run build
# Output in dist/
```

### Production JAR (Backend)
```bash
cd back
./mvnw clean package -DskipTests
# JAR in back/target/tarasovna-0.0.1-SNAPSHOT.jar
```

## 📝 Future Enhancements

1. Advanced Kanban pipeline for deals
2. Email integration for campaign delivery
3. SMS notifications
4. Real-time WebSocket notifications
5. Advanced customer segmentation
6. AI-powered sales forecasting
7. Integration with external APIs
8. Mobile app version
9. Advanced reporting with custom date ranges
10. Audit logging for compliance

## 👥 Team Roles

- **Admin**: Full system access, user management
- **User**: Standard sales/operations access to CRM modules

## 📞 Support

For issues or questions:
- Check the application logs
- Verify database connectivity
- Ensure JWT secret is properly configured
- Clear browser cache and localStorage for frontend issues

## 📄 License

Internal use only - ОАО "Мозырский НПЗ"

---

**Version**: 0.0.1  
**Status**: Development/MVP  
**Last Updated**: March 2026
