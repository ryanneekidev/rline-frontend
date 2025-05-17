import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function PublicRoute() {
    const auth = useAuth();
    if (auth.token !== '') {
        return <Navigate to='/' />
    }
    return <Outlet />
}

export default PublicRoute