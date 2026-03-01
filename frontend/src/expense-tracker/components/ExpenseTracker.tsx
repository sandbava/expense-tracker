import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm, {type ExpenseFormData} from "./ExpenseForm";
import {useState} from "react";
import useExpenses from "../../hooks/useExpenses.ts";
import ExpenseService, {type Expense} from "../../services/expense-service.ts";
import ExpenseList from "./ExpenseList.tsx";

function ExpenseTracker() {
    const {expenses, setExpenses, setError} = useExpenses();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const visibleExpenses = selectedCategory
        ? expenses.filter(expense => expense.category === selectedCategory)
        : expenses;
    const addExpense = (data: ExpenseFormData) => {
        const originalExpenses = [...expenses];
        const newExpense = {id:0, description: data.description, amount: data.amount, category: data.category};
        setExpenses([...originalExpenses, newExpense]);
        ExpenseService.create<Expense>(newExpense)
            .then(response => {
                const responseExpense = {
                    id: response.data.id,
                    description: response.data.description,
                    amount: response.data.amount,
                    category: response.data.category,
                };
                setExpenses([...originalExpenses, responseExpense]);
            })
            .catch(err => {
                setError(err.message);
                setExpenses(originalExpenses);
            });
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <ExpenseForm onSubmit={(data: ExpenseFormData) => addExpense(data)}/>
            <ExpenseFilter onSelectCategory={(category: string) => setSelectedCategory(category)}/>
            <ExpenseList expenses={visibleExpenses}
                         onDelete={
                             (id: number) => () => setExpenses(
                                 expenses.filter((expense) => expense.id !== id)
                             )}
            />
        </div>
    );
}

export default ExpenseTracker;