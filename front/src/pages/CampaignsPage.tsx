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
import type { CampaignStatus, CrmCampaign } from '../shared/crm/types'
import { MOCK_USERS, campaignStatusLabels } from '../shared/crm/types'

const statuses: CampaignStatus[] = ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED']
const types = ['EMAIL', 'SMS', 'SOCIAL'] as const
const segments = ['ALL', 'PREMIUM', 'STANDARD', 'GENERAL']

export default function CampaignsPage() {
  const crm = useCrm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<CrmCampaign>>({})

  const openNew = () => {
    setEditingId(null)
    setForm({
      status: 'DRAFT',
      type: 'EMAIL',
      budget: 0,
      targetAudience: 0,
      responseCount: 0,
      segment: 'ALL',
      startDate: new Date().toISOString().slice(0, 10),
      createdByUserId: 2,
    })
    setOpen(true)
  }

  const openEdit = (c: CrmCampaign) => {
    setEditingId(c.id)
    setForm({ ...c })
    setOpen(true)
  }

  const save = () => {
    if (!form.name?.trim()) {
      alert('Укажите название кампании')
      return
    }
    const row: Omit<CrmCampaign, 'id'> = {
      name: form.name!,
      description: form.description,
      status: (form.status as CampaignStatus) || 'DRAFT',
      type: form.type || 'EMAIL',
      startDate: form.startDate,
      endDate: form.endDate,
      budget: Number(form.budget) || 0,
      targetAudience: Number(form.targetAudience) || 0,
      responseCount: Number(form.responseCount) || 0,
      createdByUserId: form.createdByUserId != null ? Number(form.createdByUserId) : undefined,
      segment: form.segment || 'ALL',
    }
    if (editingId) crm.updateCampaign(editingId, row)
    else crm.addCampaign(row)
    setOpen(false)
  }

  const remove = (id: number) => {
    if (confirm('Удалить кампанию?')) crm.deleteCampaign(id)
  }

  const stCol = (s: CampaignStatus) => {
    if (s === 'ACTIVE') return 'success'
    if (s === 'PAUSED') return 'warning'
    if (s === 'COMPLETED') return 'info'
    if (s === 'CANCELLED') return 'error'
    return 'default'
  }

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography className="page-title">Маркетинговые кампании</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew}>
          Новая кампания
        </Button>
      </Box>
      <Paper>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f3f4f6' }}>
            <TableRow>
              <TableCell>Кампания</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Бюджет</TableCell>
              <TableCell>Аудитория</TableCell>
              <TableCell>Отклики</TableCell>
              <TableCell>Сегмент</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crm.data.campaigns.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.type}</TableCell>
                <TableCell>
                  <Chip size="small" label={campaignStatusLabels[c.status]} color={stCol(c.status)} />
                </TableCell>
                <TableCell>
                  {Number(c.budget).toLocaleString('ru-RU')} {crm.data.settings.currency}
                </TableCell>
                <TableCell>{c.targetAudience}</TableCell>
                <TableCell>{c.responseCount}</TableCell>
                <TableCell>{c.segment}</TableCell>
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
        <DialogTitle>{editingId ? 'Редактировать кампанию' : 'Новая кампания'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField fullWidth margin="normal" label="Название" value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField fullWidth margin="normal" label="Описание" multiline minRows={2} value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <TextField fullWidth margin="normal" select label="Тип" value={form.type ?? 'EMAIL'} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {types.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" select label="Статус" value={form.status ?? 'DRAFT'} onChange={(e) => setForm({ ...form, status: e.target.value as CampaignStatus })}>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {campaignStatusLabels[s]}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" type="date" label="Начало" InputLabelProps={{ shrink: true }} value={form.startDate ?? ''} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <TextField fullWidth margin="normal" type="date" label="Окончание" InputLabelProps={{ shrink: true }} value={form.endDate ?? ''} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          <TextField fullWidth margin="normal" type="number" label="Бюджет" value={form.budget ?? ''} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" type="number" label="Целевая аудитория (чел.)" value={form.targetAudience ?? ''} onChange={(e) => setForm({ ...form, targetAudience: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" type="number" label="Отклики" value={form.responseCount ?? ''} onChange={(e) => setForm({ ...form, responseCount: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" select label="Сегмент клиентов" value={form.segment ?? 'ALL'} onChange={(e) => setForm({ ...form, segment: e.target.value })}>
            {segments.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" select label="Создал" value={form.createdByUserId ?? 2} onChange={(e) => setForm({ ...form, createdByUserId: Number(e.target.value) })}>
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
