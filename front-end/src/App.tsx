import ExpenseTracker from "./expense-tracker/components/ExpenseTracker.tsx";
import {useState} from "react";
import Auth from "./auth/components/Auth.tsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    if (!loggedIn) return <Auth />;

    return <ExpenseTracker />;
}

export default App;