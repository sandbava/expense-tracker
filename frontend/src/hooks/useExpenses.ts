import {useEffect, useState} from "react";
import {CanceledError} from "axios";
import ExpenseService, {type Expense, type ExpenseAPIResponse} from "../services/expense-service.ts";

const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        const {request, cancel} = ExpenseService.getAll<ExpenseAPIResponse>();
        request
            .then(res => {
                // @ts-ignore
                setExpenses(res.data.member);
                setLoading(false);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            })

        return () => cancel()
    }, []);

    return {expenses, error, isLoading, setExpenses, setError};
}


export default useExpenses;