import {useEffect, useState} from "react";
import {CanceledError} from "axios";
import {getAllExpensesFromUser, type Expense} from "../services/expense-service.ts";

const useExpenses = (userId: number) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const {request, cancel} = getAllExpensesFromUser(userId);
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
    }, [userId]);

    return {expenses, error, setExpenses, setError};
}


export default useExpenses;