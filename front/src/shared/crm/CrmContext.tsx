import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type {
  CrmCampaign,
  CrmData,
  CrmDeal,
  CrmOrder,
  CrmProduct,
  CrmSettings,
  CrmTask,
  Customer,
} from './types'
import { CRM_STORAGE_KEY, CRM_STORAGE_VERSION } from './types'
import { createSeedData } from './seedData'
import { exportFullReportCsv, downloadTextFile } from './crmUtils'

function nextId<T extends { id: number }>(rows: T[]): number {
  return rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1
}

function loadInitial(): CrmData {
  try {
    const raw = localStorage.getItem(CRM_STORAGE_KEY)
    if (!raw) {
      const seed = createSeedData()
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(seed))
      return seed
    }
    const parsed = JSON.parse(raw) as CrmData
    if (parsed?.version !== CRM_STORAGE_VERSION || !Array.isArray(parsed.customers)) {
      const seed = createSeedData()
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(seed))
      return seed
    }
    return parsed
  } catch {
    const seed = createSeedData()
    localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(seed))
    return seed
  }
}

export interface CrmApi {
  data: CrmData
  filterCustomers: (q: string) => Customer[]
  /** Полный сброс демо-данных */
  resetToDemo: () => void
  addCustomer: (row: Omit<Customer, 'id'>) => void
  updateCustomer: (id: number, row: Partial<Customer>) => void
  deleteCustomer: (id: number) => void
  addDeal: (row: Omit<CrmDeal, 'id'>) => void
  updateDeal: (id: number, row: Partial<CrmDeal>) => void
  deleteDeal: (id: number) => void
  addOrder: (row: Omit<CrmOrder, 'id'>) => void
  updateOrder: (id: number, row: Partial<CrmOrder>) => void
  deleteOrder: (id: number) => void
  addProduct: (row: Omit<CrmProduct, 'id'>) => void
  updateProduct: (id: number, row: Partial<CrmProduct>) => void
  deleteProduct: (id: number) => void
  addCampaign: (row: Omit<CrmCampaign, 'id'>) => void
  updateCampaign: (id: number, row: Partial<CrmCampaign>) => void
  deleteCampaign: (id: number) => void
  addTask: (row: Omit<CrmTask, 'id'>) => void
  updateTask: (id: number, row: Partial<CrmTask>) => void
  deleteTask: (id: number) => void
  updateSettings: (s: Partial<CrmSettings>) => void
  exportReportCsv: () => void
}

const ctx = createContext<CrmApi | null>(null)

export function CrmProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CrmData>(loadInitial)
  const dataRef = useRef(data)
  dataRef.current = data

  const persist = useCallback((updater: (d: CrmData) => CrmData) => {
    setData((prev) => {
      const next = updater(prev)
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const filterCustomers = useCallback(
    (q: string) => {
      const s = q.trim().toLowerCase()
      if (!s) return data.customers
      return data.customers.filter(
        (c) =>
          c.firstName.toLowerCase().includes(s) ||
          c.lastName.toLowerCase().includes(s) ||
          c.email.toLowerCase().includes(s) ||
          c.companyName.toLowerCase().includes(s),
      )
    },
    [data.customers],
  )

  const api = useMemo<CrmApi>(() => {
    return {
      data,
      filterCustomers,
      resetToDemo: () => {
        const seed = createSeedData()
        localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(seed))
        setData(seed)
      },
      addCustomer: (row) => {
        persist((d) => ({
          ...d,
          customers: [...d.customers, { ...row, id: nextId(d.customers) }],
        }))
      },
      updateCustomer: (id, row) => {
        persist((d) => ({
          ...d,
          customers: d.customers.map((c) => (c.id === id ? { ...c, ...row } : c)),
        }))
      },
      deleteCustomer: (id) => {
        persist((d) => ({
          ...d,
          customers: d.customers.filter((c) => c.id !== id),
        }))
      },
      addDeal: (row) => {
        persist((d) => ({
          ...d,
          deals: [...d.deals, { ...row, id: nextId(d.deals) }],
        }))
      },
      updateDeal: (id, row) => {
        persist((d) => ({
          ...d,
          deals: d.deals.map((x) => (x.id === id ? { ...x, ...row } : x)),
        }))
      },
      deleteDeal: (id) => {
        persist((d) => ({ ...d, deals: d.deals.filter((x) => x.id !== id) }))
      },
      addOrder: (row) => {
        persist((d) => ({
          ...d,
          orders: [...d.orders, { ...row, id: nextId(d.orders) }],
        }))
      },
      updateOrder: (id, row) => {
        persist((d) => ({
          ...d,
          orders: d.orders.map((x) => (x.id === id ? { ...x, ...row } : x)),
        }))
      },
      deleteOrder: (id) => {
        persist((d) => ({ ...d, orders: d.orders.filter((x) => x.id !== id) }))
      },
      addProduct: (row) => {
        persist((d) => ({
          ...d,
          products: [...d.products, { ...row, id: nextId(d.products) }],
        }))
      },
      updateProduct: (id, row) => {
        persist((d) => ({
          ...d,
          products: d.products.map((x) => (x.id === id ? { ...x, ...row } : x)),
        }))
      },
      deleteProduct: (id) => {
        persist((d) => ({ ...d, products: d.products.filter((x) => x.id !== id) }))
      },
      addCampaign: (row) => {
        persist((d) => ({
          ...d,
          campaigns: [...d.campaigns, { ...row, id: nextId(d.campaigns) }],
        }))
      },
      updateCampaign: (id, row) => {
        persist((d) => ({
          ...d,
          campaigns: d.campaigns.map((x) => (x.id === id ? { ...x, ...row } : x)),
        }))
      },
      deleteCampaign: (id) => {
        persist((d) => ({ ...d, campaigns: d.campaigns.filter((x) => x.id !== id) }))
      },
      addTask: (row) => {
        persist((d) => ({
          ...d,
          tasks: [...d.tasks, { ...row, id: nextId(d.tasks) }],
        }))
      },
      updateTask: (id, row) => {
        persist((d) => ({
          ...d,
          tasks: d.tasks.map((x) => (x.id === id ? { ...x, ...row } : x)),
        }))
      },
      deleteTask: (id) => {
        persist((d) => ({ ...d, tasks: d.tasks.filter((x) => x.id !== id) }))
      },
      updateSettings: (s) => {
        persist((d) => ({
          ...d,
          settings: { ...d.settings, ...s },
        }))
      },
      exportReportCsv: () => {
        const text = exportFullReportCsv(dataRef.current)
        downloadTextFile(`tarasovna-crm-отчёт-${new Date().toISOString().slice(0, 10)}.csv`, text)
      },
    }
  }, [data, persist, filterCustomers])

  return <ctx.Provider value={api}>{children}</ctx.Provider>
}

export function useCrm(): CrmApi {
  const v = useContext(ctx)
  if (!v) throw new Error('useCrm: оберните приложение в <CrmProvider>')
  return v
}
