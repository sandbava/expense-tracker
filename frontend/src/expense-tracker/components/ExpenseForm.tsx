import categories from "../constants/categories";
import {useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";


const schema = z.object({
    description: z.string().min(3, {message: "Description must be at least 3 characters."}),
    amount: z
        .number({error: "Amount field is required."})
        .min(1, {message: "Amount must be at least $1.00."}),
    category: z.enum(categories, {error: "Category is required."})
});

export type ExpenseFormData = z.infer<typeof schema>;

interface Props {
    onSubmit: (data: ExpenseFormData) => void;
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const ExpenseForm = ({onSubmit}: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<ExpenseFormData>({resolver: zodResolver(schema)});

    return <form onSubmit={handleSubmit(data => {onSubmit(data); reset();})}>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
                {...register('description')}
                type="text" id="description" className="form-control"
            />
            {errors.description && <p className="form-text text-danger">{errors.description.message}</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
                {...register('amount', {valueAsNumber: true})}
                type="number" id="amount" className="form-control"
            />
            {errors.amount && <p className="form-text text-danger">{errors.amount.message}</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
                {...register('category')}
                id="category" className="form-control"
            >
                <option value=""></option>
                {categories.map((category: string) => (
                    <option key={category} value={category}>{capitalize(category)}</option>
                ))}
            </select>
            {errors.category && <p className="form-text text-danger">{errors.category.message}</p>}
        </div>
        <div className="mb-3">
            <button disabled={!isValid} type="submit" className="btn btn-primary">Submit</button>
        </div>
    </form>;
}

export default ExpenseForm;