import ExpenseTracker from "./expense-tracker/components/ExpenseTracker.tsx";
import {useEffect, useState} from "react";
import Auth from "./auth/components/Auth.tsx";
import apiClient from "./services/api-client.ts";
import {useToast} from "./context/ToastProvider.tsx";
import LogMessage from "./auth/components/LogMessage.tsx";

export interface User {
    id: number;
    email: string;
    username: string;
}

function App() {
    const {showToast} = useToast();

    const [user, setUser] = useState<User | null>(null);
    const [jwt, setJwt] = useState<string | null>(null);

    const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setUser(null);
        setJwt(null);
        localStorage.removeItem('jwt');
        showToast('User logged out successfully!', "success");
    }

    if (!jwt) {
        const localStorageJWT = localStorage.getItem('jwt');
        if (localStorageJWT) {
            setJwt(localStorageJWT);
        }
    }

    useEffect(() => {
        if (!jwt) return;
        apiClient.get('/me', {headers: {Authorization: "Bearer " + jwt}})
            .then(response => setUser({
                    id: response.data.id,
                    email: response.data.email,
                    username: response.data.username,
            }))
            .catch(err => {
                if(err.response.status == 401) {
                    setUser(null);
                    setJwt(null);
                    localStorage.removeItem('jwt');
                    showToast('User session expired. Please log in again.', 'error');
                }
            })
    }, [jwt])

    if (!user) return <Auth setJwt={setJwt}/>;

    return <>
        <div className="d-flex justify-content-center">
            <LogMessage username={user?.username} logout={logout} />
        </div>
        <ExpenseTracker />
    </>;
}

export default App;