import { useState } from "react";
import axios from "axios";

const Expenses = () => {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
        time: ""
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // 🔥 date + time combine
        const fullDateTime = new Date(`${form.date}T${form.time}`);

        axios.post("https://jewellers-shop-server.vercel.app/expenses", {
            ...form,
            amount: Number(form.amount),
            createdAt: fullDateTime
        })
            .then(() => {
                alert("✅ Expense Added");

                // reset
                setForm({
                    title: "",
                    amount: "",
                    category: "",
                    date: "",
                    time: ""
                });
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 mt-10 space-y-3">

            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Expense Title"
                className="input input-bordered w-full"
            />

            <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="input input-bordered w-full"
            />

            <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category (optional)"
                className="input input-bordered w-full"
            />

            {/* ✅ DATE */}
            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            {/* ✅ TIME */}
            <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            <button className="btn btn-error w-full">Add Expense</button>
        </form>
    );
};

export default Expenses;