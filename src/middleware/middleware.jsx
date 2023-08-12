import { Navigate, Outlet } from "react-router-dom"

export default function ProtectorRuta({children}) {

    const token = localStorage.getItem("token")

    if(!token){
        return <Navigate to='/'/>
    }else{

    }
    return (
        children ? children : <Outlet />
    )
}
