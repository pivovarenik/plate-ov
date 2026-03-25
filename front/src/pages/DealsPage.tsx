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
import type { CrmDeal, DealStatus } from '../shared/crm/types'
import { dealStatusLabels, MOCK_USERS } from '../shared/crm/types'
import { companyName } from '../shared/crm/crmUtils'

const statuses: DealStatus[] = ['LEAD', 'NEGOTIATION', 'PROPOSAL', 'CLOSED_WON', 'CLOSED_LOST']

export default function DealsPage() {
  const crm = useCrm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<CrmDeal>>({})

  const openNew = () => {
    setEditingId(null)
    setForm({
      status: 'LEAD',
      value: 0,
      probability: 50,
      expectedCloseDate: new Date().toISOString().slice(0, 10),
      customerId: crm.data.customers[0]?.id ?? 1,
      assignedUserId: 2,
    })
    setOpen(true)
  }

  const openEdit = (d: CrmDeal) => {
    setEditingId(d.id)
    setForm({ ...d })
    setOpen(true)
  }

  const save = () => {
    if (!form.title?.trim() || !form.customerId) {
      alert('Укажите название и клиента')
      return
    }
    const row: Omit<CrmDeal, 'id'> = {
      title: form.title!,
      description: form.description,
      customerId: Number(form.customerId),
      value: Number(form.value) || 0,
      status: (form.status as DealStatus) || 'LEAD',
      expectedCloseDate: form.expectedCloseDate || new Date().toISOString().slice(0, 10),
      probability: form.probability != null ? Number(form.probability) : undefined,
      assignedUserId: form.assignedUserId != null ? Number(form.assignedUserId) : undefined,
    }
    if (editingId) crm.updateDeal(editingId, row)
    else crm.addDeal(row)
    setOpen(false)
  }

  const remove = (id: number) => {
    if (confirm('Удалить сделку?')) crm.deleteDeal(id)
  }

  const statusColor = (s: DealStatus) => {
    if (s === 'CLOSED_WON') return 'success'
    if (s === 'CLOSED_LOST') return 'error'
    if (s === 'NEGOTIATION' || s === 'PROPOSAL') return 'warning'
    return 'default'
  }

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography className="page-title">Сделки</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew}>
          Новая сделка
        </Button>
      </Box>
      <Paper>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f3f4f6' }}>
            <TableRow>
              <TableCell>Сделка</TableCell>
              <TableCell>Клиент</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Закрытие</TableCell>
              <TableCell>%</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crm.data.deals.map((d) => (
              <TableRow key={d.id} hover>
                <TableCell>{d.title}</TableCell>
                <TableCell>{companyName(crm.data.customers, d.customerId)}</TableCell>
                <TableCell>{Number(d.value).toLocaleString('ru-RU')} {crm.data.settings.currency}</TableCell>
                <TableCell>
                  <Chip size="small" label={dealStatusLabels[d.status]} color={statusColor(d.status)} />
                </TableCell>
                <TableCell>{d.expectedCloseDate}</TableCell>
                <TableCell>{d.probability ?? '—'}</TableCell>
                <TableCell align="right">
                  <Button size="small" startIcon={<Edit />} onClick={() => openEdit(d)} />
                  <Button size="small" color="error" startIcon={<Delete />} onClick={() => remove(d.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Редактировать сделку' : 'Новая сделка'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField fullWidth margin="normal" label="Название" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextField fullWidth margin="normal" label="Описание" multiline minRows={2} value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <TextField fullWidth margin="normal" select label="Клиент" value={form.customerId ?? ''} onChange={(e) => setForm({ ...form, customerId: Number(e.target.value) })}>
            {crm.data.customers.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.companyName}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" type="number" label={`Сумма (${crm.data.settings.currency})`} value={form.value ?? ''} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" select label="Статус" value={form.status ?? 'LEAD'} onChange={(e) => setForm({ ...form, status: e.target.value as DealStatus })}>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {dealStatusLabels[s]}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" type="date" label="Ожидаемая дата закрытия" InputLabelProps={{ shrink: true }} value={form.expectedCloseDate ?? ''} onChange={(e) => setForm({ ...form, expectedCloseDate: e.target.value })} />
          <TextField fullWidth margin="normal" type="number" label="Вероятность, %" value={form.probability ?? ''} onChange={(e) => setForm({ ...form, probability: Number(e.target.value) })} />
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
