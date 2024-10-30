import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

export const PrivateRoute = () => {
    const { userInfo } = useAppSelector((state) => state.auth)

    return (
        <div>
            {(userInfo || localStorage.getItem('userId')) ? <Outlet /> : < Navigate to='/admin/login' />}
        </div>
    )
}