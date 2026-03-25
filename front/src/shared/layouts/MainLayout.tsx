import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar />
        <Box sx={{ flex: 1, overflow: 'auto', padding: 3, background: '#f5f5f5' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
