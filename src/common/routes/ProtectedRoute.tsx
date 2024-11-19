import { useAppSelector } from '../hooks/hook'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const { userInfo } = useAppSelector((state) => state.auth)
    const userId = localStorage.getItem('userId')

  return (
    <div>
        {(userId || userInfo) ? 
          <Outlet /> : <Navigate to='/admin/login' />
        }
    </div>
  )
}

export default ProtectedRoute