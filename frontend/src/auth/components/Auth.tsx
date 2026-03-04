import {useState} from "react";
import SignIn from "./SignIn.tsx";
import SignUp from "./SignUp.tsx";
import {useToast} from "../../context/ToastProvider.tsx";
import apiClient from "../../services/api-client.ts";
import {CanceledError} from "axios";

interface Props {
    setJwt: (jwt: string) => void;
}

export type AuthCredentials = { email: string; password: string };

const Auth = ({setJwt}: Props) => {
    const {showToast} = useToast();
    const [signMethod, setSignMethod] = useState("signin");

    const getJwt = (data: AuthCredentials) => {
        apiClient
            .post('/auth', {username: data.email, password: data.password})
            .then(response => {
                if (response.data.token) {
                    setJwt(response.data.token);
                    localStorage.setItem('jwt', response.data.token);
                    showToast('User signed in successfully!', "success");
                } else {
                    showToast('Invalid credentials.', 'error');
                }
            })
            .catch((err) => {
                console.log(err);
                if (err instanceof CanceledError) return;
                if (err.response?.status === 401) {
                    showToast('Invalid credentials.', 'error');
                } else showToast(err.message, 'error');
            });
    };

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
            {
                signMethod == "signin"
                    ? <SignIn getJwt={getJwt}/>
                    : <SignUp getJwt={getJwt}/>
            }
        </div>
    </div>;
}

export default Auth;