import { useMemo } from 'react'
import { Box, Typography, Paper, Button, Grid, Card, CardContent } from '@mui/material'
import { Download } from '@mui/icons-material'
import { useCrm } from '../shared/crm/CrmContext'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { dealStatusLabels } from '../shared/crm/types'
import type { DealStatus } from '../shared/crm/types'

export default function ReportsPage() {
  const crm = useCrm()

  const stats = useMemo(() => {
    const { customers, deals, orders, products, campaigns, tasks } = crm.data
    const orderSum = orders.reduce((a, o) => a + o.totalAmount, 0)
    const dealSum = deals.filter((d) => d.status !== 'CLOSED_LOST').reduce((a, d) => a + d.value, 0)
    const openTasks = tasks.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length
    const activeCampaigns = campaigns.filter((c) => c.status === 'ACTIVE').length
    return {
      customers: customers.length,
      deals: deals.length,
      orders: orders.length,
      products: products.length,
      orderSum,
      dealSum,
      openTasks,
      activeCampaigns,
    }
  }, [crm.data])

  const dealsByStatus = useMemo(() => {
    const map = new Map<string, number>()
    crm.data.deals.forEach((d) => {
      map.set(d.status, (map.get(d.status) ?? 0) + 1)
    })
    return Array.from(map.entries()).map(([status, count]) => ({
      status,
      label: dealStatusLabels[status as DealStatus],
      count,
    }))
  }, [crm.data.deals])

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography className="page-title">Отчёты и аналитика</Typography>
        <Button variant="contained" startIcon={<Download />} onClick={() => crm.exportReportCsv()}>
          Экспорт полного отчёта (CSV)
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { title: 'Клиенты', value: stats.customers },
          { title: 'Сделки', value: stats.deals },
          { title: 'Заказы', value: stats.orders },
          { title: 'Активных кампаний', value: stats.activeCampaigns },
          { title: 'Открытых задач', value: stats.openTasks },
          {
            title: `Сумма заказов (${crm.data.settings.currency})`,
            value: stats.orderSum.toLocaleString('ru-RU'),
          },
          {
            title: `Сумма сделок (без проигранных)`,
            value: stats.dealSum.toLocaleString('ru-RU'),
          },
        ].map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Сделки по статусам
        </Typography>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={dealsByStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" name="Количество" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  )
}
