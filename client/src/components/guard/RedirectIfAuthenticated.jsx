import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectIfAuthenticated({ children }) {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated and if the access was manual (not from a login redirect)
        // We assume that if the user is authenticated, they should not be on the login page
        const fromManualAccess = !sessionStorage.getItem("just_logged_in");

        if (user && fromManualAccess) {
            navigate(-1, { replace: true }); // Redirect to the previous page if user is authenticated
        }
    }, [user, navigate]);

    return !isLoading && !user ? children : null; // Render children only if user is not authenticated
}