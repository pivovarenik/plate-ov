import { Link } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Dashboard, People, TrendingUp, ShoppingCart, Inventory, Campaign, CheckCircle, BarChart, Settings } from '@mui/icons-material'

const menuItems = [
  { label: 'Главная', path: '/', icon: Dashboard },
  { label: 'Клиенты', path: '/customers', icon: People },
  { label: 'Сделки', path: '/deals', icon: TrendingUp },
  { label: 'Заказы', path: '/orders', icon: ShoppingCart },
  { label: 'Продукция', path: '/products', icon: Inventory },
  { label: 'Кампании', path: '/campaigns', icon: Campaign },
  { label: 'Задачи', path: '/tasks', icon: CheckCircle },
  { label: 'Отчёты', path: '/reports', icon: BarChart },
  { label: 'Настройки', path: '/settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          bgcolor: '#1e3a8a',
          color: 'white',
          borderRight: '1px solid #0f172a',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#60a5fa' }}>
          🛢️ Tarasovna CRM
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              color: 'white',
              '&:hover': { bgcolor: '#1e40af' },
              textDecoration: 'none',
              '&.active': { bgcolor: '#2563eb' },
            }}
          >
            <ListItemIcon sx={{ color: '#60a5fa', minWidth: 40 }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
