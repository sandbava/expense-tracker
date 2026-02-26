import type {User} from "../../App.tsx";

interface Props {
    setUser: (user:User) => void;
}

const SignUp = ({setUser}: Props) => {
    return <>
        <h2>Sign Up</h2>
        <form onSubmit={(e) => e.preventDefault()}
              className="mt-5">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" id="username" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password-repeat" className="form-label">Repeat password</label>
                <input type="password" id="password-repeat" className="form-control"/>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary"
                        onClick={() => setUser({id: 1, username: "Bastien", email: ""})}>
                    Sign up
                </button>
            </div>
        </form>
    </>
}

export default SignUp