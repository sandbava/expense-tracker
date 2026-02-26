import ExpenseTracker from "./expense-tracker/components/ExpenseTracker.tsx";
import {useState} from "react";
import Auth from "./auth/components/Auth.tsx";

export interface User {
    id: number;
    username: string;
    email: string;
}

function App() {
    const [user, setUser] = useState<User | null>(null);

    if (!user) return <Auth setUser={setUser}/>;

    return <>
        <p>
            Logged as {user?.username} - {user?.email}.
            (<a className="link-secondary" href="#" onClick={() => setUser(null)}>
                Logout
            </a>)
        </p>
        <ExpenseTracker/>
    </>;
}

export default App;