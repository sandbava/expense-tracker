import create from "./http-service";

export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: 'groceries' | 'utilities' | 'entertainment';
}

export interface ExpenseApiItem extends Expense {
    "@id": string;
    "@type": "Expense";
}

export interface ExpenseAPIResponse {
    "@context": string;
    "@id": string;
    "@type": "Collection";
    totalItems: number;
    member: ExpenseApiItem[];
}

const expenseService = create('/expenses');

export const getAllExpensesFromUser = (userId: number) =>
    expenseService.getAllFromEndpoint<ExpenseAPIResponse>(`/users/${userId}/expenses`);

export default expenseService;
