import { useState } from "react";
import axios from "axios";

const HowladNewa = () => {
    const [form, setForm] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/transactions", {
            ...form,
            amount: Number(form.amount)   // 🔥 must
        })
            .then(() => alert("✅ Saved"));
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 space-y-3">

            <input
                placeholder="Name"
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="input input-bordered w-full"
            />

            <input
                placeholder="Amount"
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="input input-bordered w-full"
            />

            <select
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="select select-bordered w-full"
            >
                <option value="loan">Howlad Nise (Cash +)</option>
                <option value="given">Howlad Dise (Cash -)</option>
            </select>

            <button className="btn btn-primary w-full">Save</button>
        </form>
    );
};

export default HowladNewa;