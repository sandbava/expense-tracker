import {useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import apiClient from "../../services/api-client.ts";

interface Props {
    setJwt: (jwt: string) => void;
}

const schema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

type SignInFormData = z.infer<typeof schema>;

const SignIn = ({setJwt}: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<SignInFormData>({resolver: zodResolver(schema)});

    const getJwt = (data: SignInFormData) => {
        apiClient.post('/login_check', {username:data.email, password: data.password})
                 .then(response => {
                    console.log(response.data);
                    if(response.data.token) {
                        setJwt(response.data.token);
                        localStorage.setItem('jwt', response.data.token);
                    } else {
                        alert("Invalid credentials");
                    }
                })
    }

    return <>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(data => { getJwt(data); reset();})}
              className="mt-5"
        >
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input {...register('email')} type="email" id="email" className="form-control"/>
                {errors.email && <p className="form-text text-danger">{errors.email.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input {...register('password')} type="password" id="password" className="form-control"/>
                {errors.password && <p className="form-text text-danger">{errors.password.message}</p>}
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary" >
                    Sign in
                </button>
            </div>
        </form>
    </>
}

export default SignIn