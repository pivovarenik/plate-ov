import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Button } from '@mui/material'
import { AccountCircle, Logout, Settings } from '@mui/icons-material'
import { RootState } from '../../app/store'
import { logout } from '../../features/auth/authSlice'

function roleLabel(role: string | null): string {
  if (!role) return ''
  const map: Record<string, string> = {
    ADMIN: 'Администратор',
    USER: 'Пользователь',
  }
  return map[role] ?? role
}

export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => ({
    fullName: state.auth.fullName,
    email: state.auth.email,
    role: state.auth.role,
  }))

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', borderBottom: '1px solid #e5e7eb' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          С возвращением, {user.fullName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            {roleLabel(user.role)}
          </Typography>
          <Button
            onClick={handleMenu}
            startIcon={<AccountCircle />}
            sx={{ color: 'black', textTransform: 'none' }}
          >
            {user.email}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/settings'); handleClose() }}>
              <Settings sx={{ mr: 1 }} /> Настройки
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} /> Выйти
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
