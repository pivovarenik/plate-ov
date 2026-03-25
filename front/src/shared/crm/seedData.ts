import type {
  CrmCampaign,
  CrmData,
  CrmDeal,
  CrmOrder,
  CrmProduct,
  CrmTask,
  Customer,
} from './types'
import { CRM_STORAGE_VERSION } from './types'

function d(y: number, m: number, day: number) {
  return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const customers: Customer[] = [
  { id: 1, firstName: 'Иван', lastName: 'Петров', email: 'ivan@company1.com', phone: '+375291000001', companyName: 'ООО «Ланополь»', city: 'Минск', country: 'Беларусь', segment: 'PREMIUM', totalRevenue: 125000.5, active: true },
  { id: 2, firstName: 'Марина', lastName: 'Иванова', email: 'marina@company2.com', phone: '+375291000002', companyName: 'ЗАО «Поставщик»', city: 'Витебск', country: 'Беларусь', segment: 'STANDARD', totalRevenue: 89000, active: true },
  { id: 3, firstName: 'Пётр', lastName: 'Смирнов', email: 'petr@company3.com', phone: '+375291000003', companyName: 'ООО «Трейд»', city: 'Гродно', country: 'Беларусь', segment: 'GENERAL', totalRevenue: 42000, active: true },
  { id: 4, firstName: 'Елена', lastName: 'Волкова', email: 'elena@company4.com', phone: '+375291000004', companyName: 'ООО «Нефть»', city: 'Полоцк', country: 'Беларусь', segment: 'PREMIUM', totalRevenue: 210000, active: true },
  { id: 5, firstName: 'Андрей', lastName: 'Козлов', email: 'a.kozlov@beltrans.by', phone: '+375291000010', companyName: 'ООО «БелТранс»', city: 'Гомель', country: 'Беларусь', segment: 'PREMIUM', totalRevenue: 95000, active: true },
  { id: 6, firstName: 'Ольга', lastName: 'Новикова', email: 'o.novikova@optima.by', phone: '+375291000011', companyName: 'ООО «Оптима-Ойл»', city: 'Брест', country: 'Беларусь', segment: 'STANDARD', totalRevenue: 38000, active: true },
  { id: 7, firstName: 'Дмитрий', lastName: 'Орлов', email: 'd.orlov@stroi.by', phone: '+375291000012', companyName: 'ЗАО «СтройМазут»', city: 'Могилёв', country: 'Беларусь', segment: 'GENERAL', totalRevenue: 12000, active: true },
  { id: 8, firstName: 'Светлана', lastName: 'Ким', email: 's.kim@export.eu', phone: '+375291000013', companyName: 'SpedOil GmbH', city: 'Берлин', country: 'Германия', segment: 'PREMIUM', totalRevenue: 450000, active: true },
  { id: 9, firstName: 'Николай', lastName: 'Баранов', email: 'n.baranov@local.by', phone: '+375291000014', companyName: 'ИП Баранов', city: 'Мозырь', country: 'Беларусь', segment: 'STANDARD', totalRevenue: 6700, active: true },
  { id: 10, firstName: 'Татьяна', lastName: 'Лисовская', email: 't.lisovskaya@agro.by', phone: '+375291000015', companyName: 'ОАО «АгроНефтеСбыт»', city: 'Бобруйск', country: 'Беларусь', segment: 'GENERAL', totalRevenue: 28000, active: true },
]

const deals: CrmDeal[] = [
  { id: 1, title: 'Крупная поставка дизеля', description: 'Поставка 10 000 л дизеля на Q1', customerId: 1, value: 12500, status: 'NEGOTIATION', expectedCloseDate: d(2026, 4, 30), probability: 75, assignedUserId: 2 },
  { id: 2, title: 'Контрактная закупка бензина', description: 'Закупка бензина на 6 месяцев', customerId: 2, value: 20000, status: 'PROPOSAL', expectedCloseDate: d(2026, 3, 31), probability: 60, assignedUserId: 3 },
  { id: 3, title: 'Экстренная поставка мазута', description: 'Срочная доставка', customerId: 3, value: 5000, status: 'LEAD', expectedCloseDate: d(2026, 4, 15), probability: 40, assignedUserId: 2 },
  { id: 4, title: 'Годовой контракт на битум', description: 'Долгосрочное сотрудничество', customerId: 4, value: 25000, status: 'CLOSED_WON', expectedCloseDate: d(2026, 3, 25), probability: 100, assignedUserId: 3 },
  { id: 5, title: 'Поставка СПБТ в регион', description: '20 т пропан-бутана', customerId: 5, value: 32000, status: 'NEGOTIATION', expectedCloseDate: d(2026, 5, 30), probability: 55, assignedUserId: 2 },
  { id: 6, title: 'Экспорт битума в DE', description: 'Пилотная поставка', customerId: 8, value: 180000, status: 'PROPOSAL', expectedCloseDate: d(2026, 6, 15), probability: 45, assignedUserId: 3 },
  { id: 7, title: 'Сеть АЗС — бензин', description: 'Консолидация заказов', customerId: 6, value: 95000, status: 'LEAD', expectedCloseDate: d(2026, 4, 20), probability: 30, assignedUserId: 2 },
  { id: 8, title: 'Сезонный мазут для агро', description: 'Партия М-100', customerId: 10, value: 15000, status: 'NEGOTIATION', expectedCloseDate: d(2026, 4, 30), probability: 65, assignedUserId: 3 },
  { id: 9, title: 'Агентский договор на год', description: 'Сопровождение сбыта', customerId: 7, value: 40000, status: 'PROPOSAL', expectedCloseDate: d(2026, 5, 10), probability: 50, assignedUserId: 2 },
]

const orders: CrmOrder[] = [
  { id: 1, customerId: 1, status: 'CONFIRMED', totalAmount: 15000, tax: 2500, orderDate: d(2026, 3, 15), expectedDeliveryDate: d(2026, 3, 28), assignedUserId: 2 },
  { id: 2, customerId: 2, status: 'PENDING', totalAmount: 8000, tax: 1333.33, orderDate: d(2026, 3, 24), expectedDeliveryDate: d(2026, 3, 30), assignedUserId: 3 },
  { id: 3, customerId: 3, status: 'SHIPPED', totalAmount: 5500, tax: 916.67, orderDate: d(2026, 3, 18), expectedDeliveryDate: d(2026, 3, 29), assignedUserId: 2 },
  { id: 4, customerId: 4, status: 'DELIVERED', totalAmount: 12000, tax: 2000, orderDate: d(2026, 3, 10), expectedDeliveryDate: d(2026, 3, 22), assignedUserId: 3 },
  { id: 5, customerId: 5, status: 'PENDING', totalAmount: 22000, tax: 3666.67, orderDate: d(2026, 3, 24), expectedDeliveryDate: d(2026, 4, 1), assignedUserId: 2 },
  { id: 6, customerId: 6, status: 'CONFIRMED', totalAmount: 15000, tax: 2500, orderDate: d(2026, 3, 22), expectedDeliveryDate: d(2026, 4, 5), assignedUserId: 3 },
  { id: 7, customerId: 8, status: 'SHIPPED', totalAmount: 98000, tax: 16333.33, orderDate: d(2026, 3, 19), expectedDeliveryDate: d(2026, 3, 30), assignedUserId: 2 },
  { id: 8, customerId: 9, status: 'DELIVERED', totalAmount: 6700, tax: 1116.67, orderDate: d(2026, 3, 4), expectedDeliveryDate: d(2026, 3, 20), assignedUserId: 3 },
  { id: 9, customerId: 10, status: 'DELIVERED', totalAmount: 28000, tax: 4666.67, orderDate: d(2026, 3, 16), expectedDeliveryDate: d(2026, 3, 24), assignedUserId: 2 },
]

const products: CrmProduct[] = [
  { id: 1, name: 'Дизельное топливо', description: 'Дизель марки ДС', sku: 'DIESEL-001', price: 1.25, stock: 100000, category: 'Топливо', unit: 'л', status: 'ACTIVE', active: true },
  { id: 2, name: 'Бензин АИ-95', description: 'Автомобильный', sku: 'PETROL-AI95', price: 1.35, stock: 80000, category: 'Топливо', unit: 'л', status: 'ACTIVE', active: true },
  { id: 3, name: 'Мазут М-100', description: 'Для отопления', sku: 'MAZUT-M100', price: 0.95, stock: 50000, category: 'Мазут', unit: 'л', status: 'ACTIVE', active: true },
  { id: 4, name: 'Битум БНД 60/90', description: 'Для дорог', sku: 'BITUM-BND', price: 2.5, stock: 10000, category: 'Битум', unit: 'т', status: 'ACTIVE', active: true },
  { id: 5, name: 'СПБТ (пропан-бутан)', description: 'Сжиженный газ', sku: 'LPG-001', price: 0.85, stock: 35000, category: 'Газ', unit: 'т', status: 'ACTIVE', active: true },
  { id: 6, name: 'Масло базовое гр. II', description: 'Для смазок', sku: 'BASE-OIL-II', price: 1.1, stock: 12000, category: 'Масла', unit: 'т', status: 'ACTIVE', active: true },
  { id: 7, name: 'Мазут М-40', description: 'Котельный', sku: 'MAZUT-M40', price: 0.88, stock: 22000, category: 'Мазут', unit: 'л', status: 'ACTIVE', active: true },
]

const campaigns: CrmCampaign[] = [
  { id: 1, name: 'Email-кампания Q1', description: 'Рассылка о новых продуктах', status: 'ACTIVE', type: 'EMAIL', startDate: d(2026, 3, 1), endDate: d(2026, 4, 1), budget: 5000, targetAudience: 500, responseCount: 42, createdByUserId: 2, segment: 'PREMIUM' },
  { id: 2, name: 'Социальные сети', description: 'Реклама B2B', status: 'DRAFT', type: 'SOCIAL', startDate: d(2026, 4, 1), endDate: d(2026, 5, 10), budget: 3000, targetAudience: 1000, responseCount: 0, createdByUserId: 3, segment: 'ALL' },
  { id: 3, name: 'SMS рассылка', description: 'Спецпредложения', status: 'PAUSED', type: 'SMS', startDate: d(2026, 3, 10), endDate: d(2026, 4, 10), budget: 1000, targetAudience: 200, responseCount: 18, createdByUserId: 2, segment: 'STANDARD' },
  { id: 4, name: 'Ретаргетинг B2B', description: 'Лиды с выставки', status: 'ACTIVE', type: 'EMAIL', startDate: d(2026, 3, 24), endDate: d(2026, 5, 8), budget: 7500, targetAudience: 120, responseCount: 5, createdByUserId: 2, segment: 'STANDARD' },
  { id: 5, name: 'Промо АЗС весна', description: 'Материалы для партнёров', status: 'DRAFT', type: 'SOCIAL', startDate: d(2026, 3, 29), endDate: d(2026, 5, 28), budget: 12000, targetAudience: 2000, responseCount: 0, createdByUserId: 3, segment: 'ALL' },
]

const tasks: CrmTask[] = [
  { id: 1, title: 'Счёт для «Ланополь»', description: 'Выставить счёт на 15 000', status: 'OPEN', priority: 'HIGH', assignedUserId: 2, dueDate: d(2026, 3, 28), relatedCustomerId: 1, category: 'SALES' },
  { id: 2, title: 'Проверить доставку мазута', description: 'Клиент ЗАО Поставщик', status: 'IN_PROGRESS', priority: 'URGENT', assignedUserId: 3, dueDate: d(2026, 3, 25), relatedCustomerId: 3, category: 'LOGISTICS' },
  { id: 3, title: 'КП для нового клиента', description: 'Подготовить предложение', status: 'OPEN', priority: 'MEDIUM', assignedUserId: 2, dueDate: d(2026, 3, 30), relatedCustomerId: 2, category: 'SALES' },
  { id: 4, title: 'Обновить прайс на битум', description: 'Согласовать с закупками', status: 'COMPLETED', priority: 'LOW', assignedUserId: 3, dueDate: d(2026, 3, 20), relatedCustomerId: 4, category: 'ADMIN' },
  { id: 5, title: 'Скидка для «БелТранс»', description: 'Согласовать 3%', status: 'OPEN', priority: 'HIGH', assignedUserId: 2, dueDate: d(2026, 3, 28), relatedCustomerId: 5, category: 'SALES' },
  { id: 6, title: 'Экспорт в DE — документы', description: 'Таможня SpedOil', status: 'IN_PROGRESS', priority: 'URGENT', assignedUserId: 3, dueDate: d(2026, 3, 26), relatedCustomerId: 8, category: 'LOGISTICS' },
  { id: 7, title: 'Звонок ИП Баранов', description: 'График поставок', status: 'OPEN', priority: 'MEDIUM', assignedUserId: 2, dueDate: d(2026, 3, 27), relatedCustomerId: 9, category: 'SALES' },
  { id: 8, title: 'Прайс на газ', description: 'Обновление', status: 'OPEN', priority: 'LOW', assignedUserId: 3, dueDate: d(2026, 4, 1), category: 'ADMIN' },
  { id: 9, title: 'Договор с «ТехноСнаб»', description: 'Юридическая проверка', status: 'IN_PROGRESS', priority: 'MEDIUM', assignedUserId: 2, dueDate: d(2026, 4, 3), category: 'ADMIN' },
  { id: 10, title: 'Отчёт по АЗС', description: 'Сводка за неделю', status: 'OPEN', priority: 'LOW', assignedUserId: 3, dueDate: d(2026, 3, 31), relatedCustomerId: 6, category: 'SALES' },
]

export function createSeedData(): CrmData {
  return {
    version: CRM_STORAGE_VERSION,
    customers: customers.map((c) => ({ ...c })),
    deals: deals.map((x) => ({ ...x })),
    orders: orders.map((x) => ({ ...x })),
    products: products.map((x) => ({ ...x })),
    campaigns: campaigns.map((x) => ({ ...x })),
    tasks: tasks.map((x) => ({ ...x })),
    settings: {
      companyName: 'ОАО «Мозырский НПЗ»',
      currency: 'BYN',
      taxRate: 20,
      defaultDeliveryDays: 5,
    },
  }
}
