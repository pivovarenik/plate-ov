import { useState, useMemo } from 'react'
import {
  Box,
  Button,
  TextField,
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
  Chip,
  InputAdornment,
  MenuItem,
} from '@mui/material'
import { Add, Edit, Delete, Search } from '@mui/icons-material'
import { useCrm } from '../shared/crm/CrmContext'
import type { Customer } from '../shared/crm/types'

const segments = [
  { value: 'PREMIUM', label: 'Премиум' },
  { value: 'STANDARD', label: 'Стандарт' },
  { value: 'GENERAL', label: 'Общий' },
]

export default function CustomersPage() {
  const crm = useCrm()
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<Customer>>({})

  const rows = useMemo(() => crm.filterCustomers(search), [crm, search])

  const openNew = () => {
    setEditingId(null)
    setForm({ segment: 'GENERAL', active: true, totalRevenue: 0 })
    setOpen(true)
  }

  const openEdit = (c: Customer) => {
    setEditingId(c.id)
    setForm({ ...c })
    setOpen(true)
  }

  const save = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.companyName) {
      alert('Заполните имя, фамилию, email и компанию')
      return
    }
    if (editingId) {
      crm.updateCustomer(editingId, form as Customer)
    } else {
      crm.addCustomer({
        firstName: form.firstName!,
        lastName: form.lastName!,
        email: form.email!,
        phone: form.phone,
        companyName: form.companyName!,
        address: form.address,
        city: form.city,
        country: form.country,
        zipCode: form.zipCode,
        totalRevenue: Number(form.totalRevenue) || 0,
        segment: form.segment || 'GENERAL',
        active: form.active !== false,
      })
    }
    setOpen(false)
  }

  const remove = (id: number) => {
    const has = crm.data.deals.some((d) => d.customerId === id) || crm.data.orders.some((o) => o.customerId === id)
    if (has) {
      alert('Нельзя удалить клиента: к нему привязаны сделки или заказы')
      return
    }
    if (confirm('Удалить клиента?')) crm.deleteCustomer(id)
  }

  const chip = (seg: string) => {
    const s = segments.find((x) => x.value === seg)
    const color = seg === 'PREMIUM' ? 'success' : seg === 'STANDARD' ? 'primary' : 'default'
    return <Chip label={s?.label ?? seg} color={color} size="small" />
  }

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography className="page-title">Клиенты</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew}>
          Добавить клиента
        </Button>
      </Box>

      <Paper sx={{ mb: 2, p: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Поиск по имени, email, компании..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f3f4f6' }}>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Компания</TableCell>
              <TableCell>Выручка, {crm.data.settings.currency}</TableCell>
              <TableCell>Сегмент</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>
                  {c.firstName} {c.lastName}
                </TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.companyName}</TableCell>
                <TableCell>{Number(c.totalRevenue).toLocaleString('ru-RU')}</TableCell>
                <TableCell>{chip(c.segment)}</TableCell>
                <TableCell align="right">
                  <Button size="small" startIcon={<Edit />} onClick={() => openEdit(c)} />
                  <Button size="small" color="error" startIcon={<Delete />} onClick={() => remove(c.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Редактировать клиента' : 'Новый клиент'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField fullWidth margin="normal" label="Имя" value={form.firstName ?? ''} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
          <TextField fullWidth margin="normal" label="Фамилия" value={form.lastName ?? ''} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          <TextField fullWidth margin="normal" label="Email" type="email" value={form.email ?? ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth margin="normal" label="Телефон" value={form.phone ?? ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <TextField fullWidth margin="normal" label="Компания" value={form.companyName ?? ''} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
          <TextField fullWidth margin="normal" label="Город" value={form.city ?? ''} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <TextField fullWidth margin="normal" label="Страна" value={form.country ?? ''} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          <TextField fullWidth margin="normal" label="Выручка (учёт)" type="number" value={form.totalRevenue ?? 0} onChange={(e) => setForm({ ...form, totalRevenue: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" select label="Сегмент" value={form.segment ?? 'GENERAL'} onChange={(e) => setForm({ ...form, segment: e.target.value })}>
            {segments.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
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
