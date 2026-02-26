import categories from "../constants/categories";

interface Props {
    onSelectCategory: (category: string) => void;
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
const ExpenseFilter = ({ onSelectCategory }: Props) => {

    return <select className="form-select mb-3" name="categorieselector" id="categorieselector"
                   onChange={(e: any) => { onSelectCategory(e.target.value)}}
    >
        <option value="">All categories</option>
        {categories.map((category: string) => (
            <option key={category} value={category}>{capitalize(category)}</option>
        ))}
    </select>;
}

export default ExpenseFilter;