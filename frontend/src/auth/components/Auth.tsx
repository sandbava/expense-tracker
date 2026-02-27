import {useState} from "react";
import SignIn from "./SignIn.tsx";
import SignUp from "./SignUp.tsx";

interface Props {
    setJwt: (jwt: string) => void;
}

const Auth = ({setJwt}: Props) => {
    const [signMethod, setSignMethod] = useState("signin");

    return <div>
        <h1>Authentication</h1>
        <div className="mx-5 btn-group">
            <button onClick={() => setSignMethod("signin")}
                    className={"btn " + (signMethod == "signin" ? "btn-success" : "btn-outline-success")}
            >
                Sign in
            </button>
            <button onClick={() => setSignMethod("signup")}
                    className={"btn " + (signMethod == "signup" ? "btn-success" : "btn-outline-success")}
            >
                Sign up
            </button>
        </div>
        <div className="mt-5">
            {signMethod == "signin" ? <SignIn setJwt={setJwt}/> : <SignUp/>}
        </div>
    </div>;
}

export default Auth;