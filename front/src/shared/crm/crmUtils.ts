import type { CrmData, Customer } from './types'

export function customerName(customers: Customer[], id: number | undefined): string {
  if (id == null) return '—'
  const c = customers.find((x) => x.id === id)
  return c ? `${c.firstName} ${c.lastName} · ${c.companyName}` : `#${id}`
}

export function companyName(customers: Customer[], id: number | undefined): string {
  if (id == null) return '—'
  return customers.find((x) => x.id === id)?.companyName ?? `#${id}`
}

export function downloadTextFile(filename: string, content: string, mime = 'text/csv;charset=utf-8') {
  const blob = new Blob([`\uFEFF${content}`], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function toCsv(headers: string[], rows: (string | number | undefined)[][]): string {
  const esc = (v: string | number | undefined) => {
    if (v === undefined || v === null) return ''
    const s = String(v)
    if (/[;"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  return [headers.join(';'), ...rows.map((r) => r.map(esc).join(';'))].join('\r\n')
}

export function exportFullReportCsv(data: CrmData): string {
  const parts: string[] = []
  parts.push('=== Клиенты ===')
  parts.push(
    toCsv(
      ['id', 'Имя', 'Фамилия', 'Email', 'Компания', 'Сегмент', 'Выручка'],
      data.customers.map((c) => [c.id, c.firstName, c.lastName, c.email, c.companyName, c.segment, c.totalRevenue]),
    ),
  )
  parts.push('\n=== Сделки ===')
  parts.push(
    toCsv(
      ['id', 'Название', 'Клиент_id', 'Сумма', 'Статус', 'Дата закрытия'],
      data.deals.map((d) => [d.id, d.title, d.customerId, d.value, d.status, d.expectedCloseDate]),
    ),
  )
  parts.push('\n=== Заказы ===')
  parts.push(
    toCsv(
      ['id', 'Клиент_id', 'Статус', 'Сумма', 'НДС/налог', 'Дата заказа'],
      data.orders.map((o) => [o.id, o.customerId, o.status, o.totalAmount, o.tax, o.orderDate]),
    ),
  )
  parts.push('\n=== Продукция ===')
  parts.push(
    toCsv(
      ['id', 'Название', 'SKU', 'Цена', 'Остаток', 'Категория'],
      data.products.map((p) => [p.id, p.name, p.sku, p.price, p.stock, p.category]),
    ),
  )
  parts.push('\n=== Кампании ===')
  parts.push(
    toCsv(
      ['id', 'Название', 'Тип', 'Статус', 'Бюджет', 'Аудитория', 'Отклики'],
      data.campaigns.map((c) => [c.id, c.name, c.type, c.status, c.budget, c.targetAudience, c.responseCount]),
    ),
  )
  parts.push('\n=== Задачи ===')
  parts.push(
    toCsv(
      ['id', 'Заголовок', 'Статус', 'Приоритет', 'Исполнитель_id', 'Клиент_id'],
      data.tasks.map((t) => [t.id, t.title, t.status, t.priority, t.assignedUserId, t.relatedCustomerId ?? '']),
    ),
  )
  return parts.join('\r\n')
}

