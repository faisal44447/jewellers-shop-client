import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ExpenseList = () => {
    const [list, setList] = useState([]);

    const fetchExpenses = async () => {
        const res = await axios.get("http://localhost:5000/expenses");
        setList(res.data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // ❌ DELETE
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete?",
            showCancelButton: true
        });

        if (confirm.isConfirmed) {
            await axios.delete(`http://localhost:5000/expenses/${id}`);
            fetchExpenses();
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">💸 Expense List</h2>

            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((item, i) => (
                            <tr key={item._id}>
                                <th>{i + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.category || "N/A"}</td>
                                <td>৳ {item.amount}</td>
                                <td>
                                    {new Date(item.date).toLocaleString()}
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseList;