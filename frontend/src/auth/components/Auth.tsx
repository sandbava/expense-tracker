import {useState} from "react";
import SignIn from "./SignIn.tsx";
import SignUp from "./SignUp.tsx";

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return <div>
        <h1>Authentication</h1>
        <div className="mt-5">
            <button onClick={() => setIsSignIn(true)}
                    className={"btn mx-3 " + (isSignIn ? "btn-success" : "btn-outline-success")}
            >
                Sign in
            </button>
            <button onClick={() => setIsSignIn(false)}
                    className={"btn mx-3 " + (!isSignIn ? "btn-success" : "btn-outline-success")}
            >
                Sign up
            </button>
        </div>
        <div className="mt-5">
            {isSignIn ? <SignIn /> : <SignUp />}
        </div>
    </div>;
}

export default Auth;