import { useMemo } from 'react'
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material'
import { TrendingUp, People, ShoppingCart, AttachMoney } from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useCrm } from '../shared/crm/CrmContext'
import { dealStatusLabels } from '../shared/crm/types'
import type { DealStatus } from '../shared/crm/types'

export default function DashboardPage() {
  const crm = useCrm()

  const { kpiMetrics, lineData, dealPie } = useMemo(() => {
    const { customers, deals, orders } = crm.data
    const customerCount = customers.length
    const activeDeals = deals.filter((d) => d.status !== 'CLOSED_WON' && d.status !== 'CLOSED_LOST').length
    const orderCount = orders.length
    const revenue = orders.reduce((a, o) => a + o.totalAmount, 0)

    const byMonth = new Map<string, { revenue: number; orders: number }>()
    orders.forEach((o) => {
      const m = o.orderDate.slice(0, 7)
      if (!byMonth.has(m)) byMonth.set(m, { revenue: 0, orders: 0 })
      const cur = byMonth.get(m)!
      cur.revenue += o.totalAmount
      cur.orders += 1
    })
    const monthKeys = Array.from(byMonth.keys()).sort().slice(-6)
    const line = monthKeys.map((k) => ({
      month: k,
      revenue: byMonth.get(k)!.revenue,
      orders: byMonth.get(k)!.orders,
    }))

    const statusCount = new Map<DealStatus, number>()
    deals.forEach((d) => {
      statusCount.set(d.status, (statusCount.get(d.status) ?? 0) + 1)
    })
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#4caf50', '#f44336']
    const pie = Array.from(statusCount.entries()).map(([status, value], i) => ({
      name: dealStatusLabels[status],
      value,
      color: colors[i % colors.length],
    }))

    return {
      kpiMetrics: [
        { label: 'Клиенты', value: String(customerCount), icon: People, color: '#3b82f6' },
        { label: 'Сделки в работе', value: String(activeDeals), icon: TrendingUp, color: '#10b981' },
        { label: 'Заказы', value: String(orderCount), icon: ShoppingCart, color: '#f59e0b' },
        {
          label: `Выручка по заказам (${crm.data.settings.currency})`,
          value: revenue.toLocaleString('ru-RU'),
          icon: AttachMoney,
          color: '#6366f1',
        },
      ],
      lineData: line.length ? line : [{ month: '—', revenue: 0, orders: 0 }],
      dealPie: pie.length ? pie : [{ name: 'Нет данных', value: 1, color: '#e0e0e0' }],
    }
  }, [crm.data])

  return (
    <Box className="fade-in">
      <Typography className="page-title">Главная</Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {kpiMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.label}>
            <Card sx={{ bgcolor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                      {metric.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: metric.color }}>
                      {metric.value}
                    </Typography>
                  </Box>
                  <metric.icon sx={{ fontSize: 40, color: metric.color, opacity: 0.2 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, bgcolor: '#fff' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Выручка и число заказов по месяцам (из текущих данных)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" name="Выручка" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: '#fff' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Сделки по статусам
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dealPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dealPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
