import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm, {type ExpenseFormData} from "./ExpenseForm";
import {useState} from "react";
import useExpenses from "../../hooks/useExpenses.ts";
import ExpenseService, {type Expense} from "../../services/expense-service.ts";
import ExpenseList from "./ExpenseList.tsx";
import {useToast} from "../../context/ToastProvider.tsx";

function ExpenseTracker() {
    const {showToast} = useToast();

    const {expenses, error, setExpenses, setError} = useExpenses();
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
                if (response.status === 201) {
                    showToast("Expense created successfully !", "success");
                    const responseExpense = {
                        id: response.data.id,
                        description: response.data.description,
                        amount: response.data.amount,
                        category: response.data.category,
                    };
                    setExpenses([...originalExpenses, responseExpense]);
                }
            })
            .catch(err => {
                setError(err.message);
                setExpenses(originalExpenses);
            });
    };

    const deleteExpense = (id: number) => {
        const originalExpenses = [...expenses];
        ExpenseService.delete(id)
            .then((response) => {
                if (response.status === 204) {
                    showToast("Expense deleted successfully !", "success");
                    setExpenses(
                        originalExpenses.filter(expense => expense.id !== id)
                    )
                }
            })
            .catch(err => {
                setError(err.message);
                setExpenses(originalExpenses);
            });
    }

    return (
        <div>
            <h1>Expense Tracker</h1>
            {error && <p className="text-danger">{error}</p>}
            <ExpenseForm onSubmit={(data: ExpenseFormData) => addExpense(data)}/>
            <ExpenseFilter onSelectCategory={(category: string) => setSelectedCategory(category)}/>
            <ExpenseList expenses={visibleExpenses}
                         onDelete={deleteExpense}
            />
        </div>
    );
}

export default ExpenseTracker;