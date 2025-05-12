import { urlState } from "@/context";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { BarLoader } from "react-spinners";


const RequireAuth = () => {
    const navigate = useNavigate();

    const { loading, isAuthenticated } = urlState()

    useEffect(() => {
        if (!isAuthenticated)
            navigate(`/auth`)
    }, [isAuthenticated, loading])

    if (loading) return <BarLoader width={"100%"} color="#36d7b7" />
    if (isAuthenticated) return <Outlet />
}

export default RequireAuth