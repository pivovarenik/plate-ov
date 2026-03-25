import { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useCrm } from '../shared/crm/CrmContext'
import type { CrmOrder, OrderStatus } from '../shared/crm/types'
import { MOCK_USERS, orderStatusLabels } from '../shared/crm/types'
import { companyName } from '../shared/crm/crmUtils'

const statuses: OrderStatus[] = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']

export default function OrdersPage() {
  const crm = useCrm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<CrmOrder>>({})

  const openNew = () => {
    setEditingId(null)
    setForm({
      customerId: crm.data.customers[0]?.id ?? 1,
      status: 'PENDING',
      totalAmount: 0,
      tax: 0,
      orderDate: new Date().toISOString().slice(0, 10),
      assignedUserId: 2,
    })
    setOpen(true)
  }

  const openEdit = (o: CrmOrder) => {
    setEditingId(o.id)
    setForm({ ...o })
    setOpen(true)
  }

  const save = () => {
    if (!form.customerId) {
      alert('Выберите клиента')
      return
    }
    const row: Omit<CrmOrder, 'id'> = {
      customerId: Number(form.customerId),
      status: (form.status as OrderStatus) || 'PENDING',
      totalAmount: Number(form.totalAmount) || 0,
      tax: Number(form.tax) || 0,
      orderDate: form.orderDate || new Date().toISOString().slice(0, 10),
      expectedDeliveryDate: form.expectedDeliveryDate || undefined,
      assignedUserId: form.assignedUserId != null ? Number(form.assignedUserId) : undefined,
    }
    if (editingId) crm.updateOrder(editingId, row)
    else crm.addOrder(row)
    setOpen(false)
  }

  const remove = (id: number) => {
    if (confirm('Удалить заказ?')) crm.deleteOrder(id)
  }

  const col = (s: OrderStatus) => {
    if (s === 'DELIVERED') return 'success'
    if (s === 'CANCELLED') return 'error'
    if (s === 'SHIPPED') return 'info'
    return 'default'
  }

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography className="page-title">Заказы</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew}>
          Новый заказ
        </Button>
      </Box>
      <Paper>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f3f4f6' }}>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Клиент</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Налог</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crm.data.orders.map((o) => (
              <TableRow key={o.id} hover>
                <TableCell>{o.id}</TableCell>
                <TableCell>{companyName(crm.data.customers, o.customerId)}</TableCell>
                <TableCell>
                  <Chip size="small" color={col(o.status)} label={orderStatusLabels[o.status]} />
                </TableCell>
                <TableCell>
                  {Number(o.totalAmount).toLocaleString('ru-RU')} {crm.data.settings.currency}
                </TableCell>
                <TableCell>{Number(o.tax).toLocaleString('ru-RU')}</TableCell>
                <TableCell>{o.orderDate}</TableCell>
                <TableCell align="right">
                  <Button size="small" startIcon={<Edit />} onClick={() => openEdit(o)} />
                  <Button size="small" color="error" startIcon={<Delete />} onClick={() => remove(o.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Редактировать заказ' : 'Новый заказ'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField fullWidth margin="normal" select label="Клиент" value={form.customerId ?? ''} onChange={(e) => setForm({ ...form, customerId: Number(e.target.value) })}>
            {crm.data.customers.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.companyName}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" select label="Статус" value={form.status ?? 'PENDING'} onChange={(e) => setForm({ ...form, status: e.target.value as OrderStatus })}>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {orderStatusLabels[s]}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" type="number" label="Сумма" value={form.totalAmount ?? ''} onChange={(e) => setForm({ ...form, totalAmount: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" type="number" label="Налог / НДС" value={form.tax ?? ''} onChange={(e) => setForm({ ...form, tax: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" type="date" label="Дата заказа" InputLabelProps={{ shrink: true }} value={form.orderDate ?? ''} onChange={(e) => setForm({ ...form, orderDate: e.target.value })} />
          <TextField fullWidth margin="normal" type="date" label="Ожидаемая доставка" InputLabelProps={{ shrink: true }} value={form.expectedDeliveryDate ?? ''} onChange={(e) => setForm({ ...form, expectedDeliveryDate: e.target.value })} />
          <TextField fullWidth margin="normal" select label="Ответственный" value={form.assignedUserId ?? 2} onChange={(e) => setForm({ ...form, assignedUserId: Number(e.target.value) })}>
            {MOCK_USERS.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={save}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
