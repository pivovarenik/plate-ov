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
import type { CrmTask, TaskPriority, TaskStatus } from '../shared/crm/types'
import { MOCK_USERS, taskPriorityLabels, taskStatusLabels } from '../shared/crm/types'
import { companyName } from '../shared/crm/crmUtils'

const taskStatuses: TaskStatus[] = ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
const priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']
const categories = ['SALES', 'LOGISTICS', 'ADMIN', 'GENERAL']

export default function TasksPage() {
  const crm = useCrm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<CrmTask>>({})

  const openNew = () => {
    setEditingId(null)
    setForm({
      status: 'OPEN',
      priority: 'MEDIUM',
      assignedUserId: 2,
      category: 'SALES',
    })
    setOpen(true)
  }

  const openEdit = (t: CrmTask) => {
    setEditingId(t.id)
    setForm({ ...t })
    setOpen(true)
  }

  const save = () => {
    if (!form.title?.trim()) {
      alert('Укажите заголовок')
      return
    }
    const row: Omit<CrmTask, 'id'> = {
      title: form.title!,
      description: form.description,
      status: (form.status as TaskStatus) || 'OPEN',
      priority: (form.priority as TaskPriority) || 'MEDIUM',
      assignedUserId: Number(form.assignedUserId) || 2,
      dueDate: form.dueDate || undefined,
      relatedCustomerId: form.relatedCustomerId ? Number(form.relatedCustomerId) : undefined,
      relatedDealId: form.relatedDealId ? Number(form.relatedDealId) : undefined,
      category: form.category || 'GENERAL',
    }
    if (editingId) crm.updateTask(editingId, row)
    else crm.addTask(row)
    setOpen(false)
  }

  const remove = (id: number) => {
    if (confirm('Удалить задачу?')) crm.deleteTask(id)
  }

  const prCol = (p: TaskPriority) => {
    if (p === 'URGENT') return 'error'
    if (p === 'HIGH') return 'warning'
    if (p === 'MEDIUM') return 'primary'
    return 'default'
  }

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography className="page-title">Задачи</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew}>
          Новая задача
        </Button>
      </Box>
      <Paper>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f3f4f6' }}>
            <TableRow>
              <TableCell>Задача</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Приоритет</TableCell>
              <TableCell>Исполнитель</TableCell>
              <TableCell>Срок</TableCell>
              <TableCell>Клиент</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crm.data.tasks.map((t) => (
              <TableRow key={t.id} hover>
                <TableCell>{t.title}</TableCell>
                <TableCell>
                  <Chip size="small" label={taskStatusLabels[t.status]} />
                </TableCell>
                <TableCell>
                  <Chip size="small" color={prCol(t.priority)} label={taskPriorityLabels[t.priority]} />
                </TableCell>
                <TableCell>{MOCK_USERS.find((u) => u.id === t.assignedUserId)?.label ?? t.assignedUserId}</TableCell>
                <TableCell>{t.dueDate ?? '—'}</TableCell>
                <TableCell>{companyName(crm.data.customers, t.relatedCustomerId)}</TableCell>
                <TableCell align="right">
                  <Button size="small" startIcon={<Edit />} onClick={() => openEdit(t)} />
                  <Button size="small" color="error" startIcon={<Delete />} onClick={() => remove(t.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Редактировать задачу' : 'Новая задача'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField fullWidth margin="normal" label="Заголовок" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextField fullWidth margin="normal" label="Описание" multiline minRows={2} value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <TextField fullWidth margin="normal" select label="Статус" value={form.status ?? 'OPEN'} onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}>
            {taskStatuses.map((s) => (
              <MenuItem key={s} value={s}>
                {taskStatusLabels[s]}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" select label="Приоритет" value={form.priority ?? 'MEDIUM'} onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}>
            {priorities.map((p) => (
              <MenuItem key={p} value={p}>
                {taskPriorityLabels[p]}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" select label="Исполнитель" value={form.assignedUserId ?? 2} onChange={(e) => setForm({ ...form, assignedUserId: Number(e.target.value) })}>
            {MOCK_USERS.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" type="date" label="Срок" InputLabelProps={{ shrink: true }} value={form.dueDate ?? ''} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <TextField
            fullWidth
            margin="normal"
            select
            label="Связанный клиент (необязательно)"
            value={form.relatedCustomerId == null ? 'none' : String(form.relatedCustomerId)}
            onChange={(e) =>
              setForm({
                ...form,
                relatedCustomerId: e.target.value === 'none' ? undefined : Number(e.target.value),
              })
            }
          >
            <MenuItem value="none">—</MenuItem>
            {crm.data.customers.map((c) => (
              <MenuItem key={c.id} value={String(c.id)}>
                {c.companyName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            select
            label="Связанная сделка (необязательно)"
            value={form.relatedDealId == null ? 'none' : String(form.relatedDealId)}
            onChange={(e) =>
              setForm({ ...form, relatedDealId: e.target.value === 'none' ? undefined : Number(e.target.value) })
            }
          >
            <MenuItem value="none">—</MenuItem>
            {crm.data.deals.map((d) => (
              <MenuItem key={d.id} value={String(d.id)}>
                {d.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" select label="Категория" value={form.category ?? 'GENERAL'} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
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
