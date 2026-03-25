export const CRM_STORAGE_KEY = 'tarasovna_crm_data_v1'
export const CRM_STORAGE_VERSION = 1 as const

export type DealStatus = 'LEAD' | 'NEGOTIATION' | 'PROPOSAL' | 'CLOSED_WON' | 'CLOSED_LOST'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED'
export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface Customer {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  companyName: string
  address?: string
  city?: string
  country?: string
  zipCode?: string
  totalRevenue: number
  segment: string
  active: boolean
}

export interface CrmDeal {
  id: number
  title: string
  description?: string
  customerId: number
  value: number
  status: DealStatus
  expectedCloseDate: string
  probability?: number
  assignedUserId?: number
}

export interface CrmOrder {
  id: number
  customerId: number
  status: OrderStatus
  totalAmount: number
  tax: number
  orderDate: string
  expectedDeliveryDate?: string
  assignedUserId?: number
}

export interface CrmProduct {
  id: number
  name: string
  description?: string
  sku: string
  price: number
  stock: number
  category: string
  unit?: string
  status: string
  active: boolean
}

export interface CrmCampaign {
  id: number
  name: string
  description?: string
  status: CampaignStatus
  type: string
  startDate?: string
  endDate?: string
  budget: number
  targetAudience: number
  responseCount: number
  createdByUserId?: number
  segment: string
}

export interface CrmTask {
  id: number
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignedUserId: number
  dueDate?: string
  relatedCustomerId?: number
  relatedDealId?: number
  category: string
}

export interface CrmSettings {
  companyName: string
  currency: string
  taxRate: number
  defaultDeliveryDays: number
}

export interface CrmData {
  version: typeof CRM_STORAGE_VERSION
  customers: Customer[]
  deals: CrmDeal[]
  orders: CrmOrder[]
  products: CrmProduct[]
  campaigns: CrmCampaign[]
  tasks: CrmTask[]
  settings: CrmSettings
}

export const MOCK_USERS = [
  { id: 1, label: 'Администратор' },
  { id: 2, label: 'Иван (отдел сбыта)' },
  { id: 3, label: 'Мария (менеджер)' },
] as const

export const dealStatusLabels: Record<DealStatus, string> = {
  LEAD: 'Лид',
  NEGOTIATION: 'Переговоры',
  PROPOSAL: 'Предложение',
  CLOSED_WON: 'Выиграна',
  CLOSED_LOST: 'Проиграна',
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: 'Ожидает',
  CONFIRMED: 'Подтверждён',
  SHIPPED: 'Отгружен',
  DELIVERED: 'Доставлен',
  CANCELLED: 'Отменён',
}

export const campaignStatusLabels: Record<CampaignStatus, string> = {
  DRAFT: 'Черновик',
  ACTIVE: 'Активна',
  PAUSED: 'Пауза',
  COMPLETED: 'Завершена',
  CANCELLED: 'Отменена',
}

export const taskStatusLabels: Record<TaskStatus, string> = {
  OPEN: 'Открыта',
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Выполнена',
  CANCELLED: 'Отменена',
}

export const taskPriorityLabels: Record<TaskPriority, string> = {
  LOW: 'Низкий',
  MEDIUM: 'Средний',
  HIGH: 'Высокий',
  URGENT: 'Срочный',
}
