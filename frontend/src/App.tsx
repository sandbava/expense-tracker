import ExpenseTracker from "./expense-tracker/components/ExpenseTracker.tsx";
import {useEffect, useState} from "react";
import Auth from "./auth/components/Auth.tsx";
import apiClient from "./services/api-client.ts";

export interface User {
    username: string;
}

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [jwt, setJwt] = useState<string | null>(null);

    if(!jwt) {
        const jwt = localStorage.getItem('jwt');
        if(jwt) {
            setJwt(jwt);
        }
    }

    useEffect(() => {
        apiClient.get('/me', {headers: {Authorization : "Bearer " + jwt}})
                 .then(response => setUser({username: response.data.user}));
    }, [jwt])

    if (!user) return <Auth setJwt={setJwt}/>;

    return <>
        <p>
            Logged as {user?.username}.
            (<a className="link-secondary" href="#" onClick={() => setUser(null)}>
            Logout
        </a>)
        </p>
        <ExpenseTracker/>
    </>;
}

export default App;