import {type MouseEventHandler} from "react";

export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: 'groceries' | 'utilities' | 'entertainment';
}
interface Props {
    expenses: Expense[];
    onDelete: (id: number) => MouseEventHandler<HTMLButtonElement>;
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatAmount(amount: number) {
    return '$' + amount.toFixed(2);
}

const ExpenseList = ({ expenses, onDelete }:Props) => {
    return <table className="table table-bordered">
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { expenses.length === 0
                ? <tr><td colSpan={4}>No expenses</td></tr>
                : expenses.map( (expense: Expense) =>
                    <tr key={expense.id}>
                        <td>{capitalize(expense.description)}</td>
                        <td>{formatAmount(expense.amount)}</td>
                        <td>{capitalize(expense.category)}</td>
                        <td>
                            <button className="btn btn-outline-danger" onClick={onDelete(expense.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
            )}
        </tbody>
        <tfoot className="fw-bold">
            <tr>
                <td>Total</td>
                <td>${expenses.reduce((acc, expense) => expense.amount + acc, 0).toFixed(2)}</td>
                <td colSpan={2}></td>
            </tr>
        </tfoot>
    </table>;
}

export default ExpenseList;