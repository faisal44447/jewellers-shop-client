import { useState } from "react";
import axios from "axios";

const Expenses = () => {
    const [form, setForm] = useState({});

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post("http://localhost:5000/expenses", {
            ...form,
            amount: Number(form.amount),
            date: new Date()
        })
            .then(() => alert("✅ Expense Added"));
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <input name="title" onChange={handleChange} placeholder="Expense Title" className="input input-bordered w-full" />
            <input name="amount" onChange={handleChange} placeholder="Amount" className="input input-bordered w-full" />

            <button className="btn btn-error">Add Expense</button>
        </form>
    );
};

export default Expenses;