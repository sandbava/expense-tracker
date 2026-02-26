import ExpenseFilter from "./ExpenseFilter";
import ExpenseList from "./ExpenseList";
import {type ExpenseFormData} from "./ExpenseForm";
import ExpenseForm from "./ExpenseForm";
import {useState} from "react";

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: 'groceries' | 'utilities' | 'entertainment';
}

function ExpenseTracker() {
    const defaultExpenses: Expense[] = [
        {id: 1, description: 'bread', amount: 2.5, category: 'groceries'},
        {id: 2, description: 'milk', amount: 5, category: 'groceries'},
        {id: 3, description: 'eggs', amount: 10, category: 'groceries'},
        {id: 4, description: 'movies', amount: 15, category: 'entertainment'},
        {id: 5, description: 'electricity', amount: 100, category: 'utilities'}
    ];

    const [expenses, setExpenses] = useState(defaultExpenses);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const visibleExpenses = selectedCategory
        ? expenses.filter(expense => expense.category === selectedCategory)
        : expenses;
    const addExpense = (data: ExpenseFormData) => setExpenses((expenses) =>
        expenses.some((expense: Expense) => expense.description === data.description)
            ? expenses
            : [
                ...expenses,
                {
                    id: expenses.length + 1,
                    description: data.description,
                    amount: data.amount,
                    category: data.category,
                } satisfies Expense,
            ]);

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