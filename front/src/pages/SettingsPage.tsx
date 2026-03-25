import { useEffect, useState } from 'react'
import { Box, Typography, Paper, TextField, Button, Divider, Alert } from '@mui/material'
import { useCrm } from '../shared/crm/CrmContext'

export default function SettingsPage() {
  const crm = useCrm()
  const [companyName, setCompanyName] = useState(crm.data.settings.companyName)
  const [currency, setCurrency] = useState(crm.data.settings.currency)
  const [taxRate, setTaxRate] = useState(String(crm.data.settings.taxRate))
  const [deliveryDays, setDeliveryDays] = useState(String(crm.data.settings.defaultDeliveryDays))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setCompanyName(crm.data.settings.companyName)
    setCurrency(crm.data.settings.currency)
    setTaxRate(String(crm.data.settings.taxRate))
    setDeliveryDays(String(crm.data.settings.defaultDeliveryDays))
  }, [crm.data.settings])

  const save = () => {
    crm.updateSettings({
      companyName,
      currency,
      taxRate: Number(taxRate) || 0,
      defaultDeliveryDays: Number(deliveryDays) || 0,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Box className="fade-in">
      <Typography className="page-title">Настройки системы</Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Настройки сохранены в локальном хранилище браузера.
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Организация
        </Typography>
        <TextField fullWidth label="Название компании" margin="normal" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        <TextField fullWidth label="Валюта" margin="normal" value={currency} onChange={(e) => setCurrency(e.target.value)} />
        <TextField fullWidth label="Ставка налога / НДС (%)" type="number" margin="normal" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
        <TextField fullWidth label="Срок поставки по умолчанию (дней)" type="number" margin="normal" value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)} />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Данные CRM
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Сейчас клиенты, сделки, заказы и остальные сущности хранятся в <strong>localStorage</strong> этого браузера (демо-режим при отсутствии REST API).
        </Typography>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => {
            if (confirm('Сбросить все данные к демо-набору? Текущие изменения будут потеряны.')) crm.resetToDemo()
          }}
        >
          Сбросить к демо-данным
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Пользователи
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Управление учётными записями доступно после подключения соответствующих API на сервере.
        </Typography>
        <Button variant="outlined" disabled>
          Управление пользователями
        </Button>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="success" onClick={save}>
            Сохранить
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setCompanyName(crm.data.settings.companyName)
              setCurrency(crm.data.settings.currency)
              setTaxRate(String(crm.data.settings.taxRate))
              setDeliveryDays(String(crm.data.settings.defaultDeliveryDays))
            }}
          >
            Отмена
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
