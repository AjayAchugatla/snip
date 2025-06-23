import { urlState } from "@/context";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import Loader from "./Loader";



const RequireAuth = () => {
    const navigate = useNavigate();

    const { loading, isAuthenticated } = urlState()

    useEffect(() => {
        if (!isAuthenticated)
            navigate(`/auth`)
    }, [isAuthenticated, loading])

    if (loading) return <Loader />
    if (isAuthenticated) return <Outlet />
}

export default RequireAuth