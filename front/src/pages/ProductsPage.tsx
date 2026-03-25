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
import type { CrmProduct } from '../shared/crm/types'

export default function ProductsPage() {
  const crm = useCrm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<CrmProduct>>({})

  const openNew = () => {
    setEditingId(null)
    setForm({ active: true, status: 'ACTIVE', stock: 0, price: 0, sku: '', name: '', category: 'Топливо' })
    setOpen(true)
  }

  const openEdit = (p: CrmProduct) => {
    setEditingId(p.id)
    setForm({ ...p })
    setOpen(true)
  }

  const save = () => {
    if (!form.name?.trim() || !form.sku?.trim() || !form.category?.trim()) {
      alert('Укажите название, SKU и категорию')
      return
    }
    const sku = form.sku!.trim()
    const dup = crm.data.products.some((p) => p.sku === sku && p.id !== editingId)
    if (dup) {
      alert('SKU уже занят')
      return
    }
    const row: Omit<CrmProduct, 'id'> = {
      name: form.name!,
      description: form.description,
      sku,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      category: form.category!,
      unit: form.unit,
      status: form.status || 'ACTIVE',
      active: form.active !== false,
    }
    if (editingId) crm.updateProduct(editingId, row)
    else crm.addProduct(row)
    setOpen(false)
  }

  const remove = (id: number) => {
    if (confirm('Удалить продукт?')) crm.deleteProduct(id)
  }

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography className="page-title">Продукция</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew}>
          Добавить продукт
        </Button>
      </Box>
      <Paper>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f3f4f6' }}>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Остаток</TableCell>
              <TableCell>Ед.</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crm.data.products.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell>
                  <Chip size="small" label={p.sku} variant="outlined" />
                </TableCell>
                <TableCell>
                  {Number(p.price).toLocaleString('ru-RU')} {crm.data.settings.currency}
                </TableCell>
                <TableCell>{p.stock.toLocaleString('ru-RU')}</TableCell>
                <TableCell>{p.unit ?? '—'}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell align="right">
                  <Button size="small" startIcon={<Edit />} onClick={() => openEdit(p)} />
                  <Button size="small" color="error" startIcon={<Delete />} onClick={() => remove(p.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Редактировать продукт' : 'Новый продукт'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField fullWidth margin="normal" label="Название" value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField fullWidth margin="normal" label="Описание" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <TextField fullWidth margin="normal" label="SKU" value={form.sku ?? ''} onChange={(e) => setForm({ ...form, sku: e.target.value })} disabled={!!editingId} />
          <TextField fullWidth margin="normal" type="number" label="Цена" value={form.price ?? ''} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" type="number" label="Остаток" value={form.stock ?? ''} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
          <TextField fullWidth margin="normal" label="Единица (л, т...)" value={form.unit ?? ''} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          <TextField fullWidth margin="normal" label="Категория" value={form.category ?? ''} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <TextField fullWidth margin="normal" select label="Статус" value={form.status ?? 'ACTIVE'} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <MenuItem value="ACTIVE">Активен</MenuItem>
            <MenuItem value="INACTIVE">Не активен</MenuItem>
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
