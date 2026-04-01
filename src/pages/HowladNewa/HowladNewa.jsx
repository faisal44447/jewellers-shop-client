import { useState } from "react";
import axios from "axios";

const HowladNewa = () => {
    const [form, setForm] = useState({
        name: "",
        amount: "",
        type: "loan",
        date: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/transactions", {
                ...form,
                amount: Number(form.amount),
                createdAt: form.date ? new Date(form.date) : new Date()
            });

            alert("✅ Saved");

            setForm({
                name: "",
                amount: "",
                type: "loan",
                date: ""
            });

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 space-y-3">

            <input
                value={form.name}
                placeholder="Name"
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="input input-bordered w-full"
            />

            <input
                value={form.amount}
                placeholder="Amount"
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="input input-bordered w-full"
            />

            {/* ✅ DATE TIME FIELD */}
            <input
                type="datetime-local"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="input input-bordered w-full"
            />

            <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="select select-bordered w-full"
            >
                <option value="loan">Howlad Nise (+)</option>
                <option value="given">Howlad Dise (-)</option>
            </select>

            <button className="btn btn-primary w-full">Save</button>
        </form>
    );
};

export default HowladNewa;