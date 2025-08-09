import { useContext, createContext, useState, useEffect } from "react";
import { me } from "@/services/authService";
import { useFetcher } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [shouldFetchUser, setShouldFetchUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await me();
                setUser(response?.data?.user);
            } catch (error) {
                setShouldFetchUser(false);
                console.error("Failed to fetch user data");
            } finally {
                setIsLoading(false);
            }
        }

        getUser();
    }, [shouldFetchUser]);

    const triggerUserFetch = () => setShouldFetchUser(prev => !prev);

    return (
        <AuthContext.Provider value={{ user, isLoading, triggerUserFetch, setShouldFetchUser, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
};
