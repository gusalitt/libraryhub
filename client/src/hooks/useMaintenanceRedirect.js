import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useMaintenanceRedirect(isMaintenance) {
    const navigate = useNavigate();
    const location = useLocation;
    
    useEffect(() => {
        if (isMaintenance && location.pathname !== "/maintenance") {
            navigate("/maintenance", { replace: true });
        }
    }, [isMaintenance, location.pathname, navigate]);
}

export default useMaintenanceRedirect;