import {useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import apiClient from "../../services/api-client.ts";
import {useToast} from "../../context/ToastProvider.tsx";
import type {AuthCredentials} from "./Auth.tsx";

interface Props {
    getJwt: (data: AuthCredentials) => void;
}

const schema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    passwordRepeat: z.string().min(6),
}).refine((data) => data.password === data.passwordRepeat, {
    path: ["passwordRepeat"],
    message: "Passwords do not match.",
});

type SignUpFormData = z.infer<typeof schema>;

const SignUp = ({getJwt}: Props) => {
    const {showToast} = useToast();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<SignUpFormData>({resolver: zodResolver(schema)});

    const createUser = (data: SignUpFormData) => {
        apiClient.post('/register', {
                email: data.email,
                roles: ['ROLE_USER'],
                password: data.password
            }
        )
            .then(response => {
                getJwt({ email: data.email, password: data.password });
                showToast(response.data.message, "success");
            })
    }

    return <>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(data => {
            createUser(data);
            reset();
        })}
              className="mt-5">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input {...register('username')} type="text" id="username" className="form-control"/>
                {errors.username && <p className="form-text text-danger">{errors.username.message}</p>}
            </div>
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
                <label htmlFor="password-repeat" className="form-label">Repeat password</label>
                <input {...register('passwordRepeat')} type="password" id="password-repeat" className="form-control"/>
                {errors.passwordRepeat && <p className="form-text text-danger">{errors.passwordRepeat.message}</p>}
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                    Sign up
                </button>
            </div>
        </form>
    </>
}

export default SignUp