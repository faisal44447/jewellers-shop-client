import { useState } from "react";
import axios from "axios";

const PaboTaka = () => {
    const [form, setForm] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/receivables", {
            ...form,
            amount: Number(form.amount)   // 🔥 MUST (very important)
        })
            .then(() => {
                alert("Added");
                setForm({});
            });
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

            <button className="btn btn-primary">Add</button>
        </form>
    );
};
export default PaboTaka;