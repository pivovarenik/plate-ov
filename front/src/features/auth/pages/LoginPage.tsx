import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Container, TextField, Button, Typography, Alert, Paper, CircularProgress } from '@mui/material'
import { isAxiosError } from 'axios'
import { setAuth } from '../authSlice'
import { authService } from '../authService'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({ email, password })
      dispatch(setAuth({
        token: response.token,
        userId: response.userId,
        email: response.email,
        fullName: response.fullName,
        role: response.role,
      }))
      navigate('/')
    } catch (err: unknown) {
      const message = isAxiosError(err)
        ? (err.response?.data as { error?: string })?.error
        : undefined
      setError(message || 'Не удалось войти. Проверьте email и пароль.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
            Tarasovna CRM
          </Typography>
          <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 3, color: '#666' }}>
            Управление продажами и взаимоотношениями с клиентами
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Электронная почта"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Войти'}
            </Button>
          </form>

          <Typography variant="caption" sx={{ display: 'block', mt: 3, textAlign: 'center', color: '#999' }}>
            Демо-доступ:<br />
            Email: admin@example.com<br />
            Пароль: password123
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
