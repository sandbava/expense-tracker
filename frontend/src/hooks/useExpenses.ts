import {useEffect, useState} from "react";
import {CanceledError} from "axios";
import ExpenseService, {type Expense, type ExpenseAPIResponse} from "../services/expense-service.ts";

const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        const {request, cancel} = ExpenseService.getAll<ExpenseAPIResponse>();
        request
            .then(res => {
                // @ts-ignore
                setExpenses(res.data.member);
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
            })

        return () => cancel()
    }, []);

    return {expenses, error, setExpenses, setError};
}


export default useExpenses;