import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaboTakaList = () => {
    const [list, setList] = useState([]);
    const axiosSecure = useAxiosSecure();

    // ✅ correct function
    const fetchPabo = async () => {
        try {
            const res = await axiosSecure.get("/receivables");
            setList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPabo(); // ✅ correct name
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Delete this item?");

        if (confirm) {
            await axiosSecure.delete(`/receivables/${id}`);
            fetchPabo();
        }
    };

    const handleEdit = async (item) => {
        const name = prompt("Edit Name", item.name);
        const amount = prompt("Edit Amount", item.amount);

        if (name && amount) {
            await axiosSecure.patch(`/receivables/${item._id}`, {
                name,
                amount
            });

            fetchPabo();
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">📋 Pabo Taka List</h2>

            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date & Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    ❌ No Data Found
                                </td>
                            </tr>
                        ) : (
                            list.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>৳ {item.amount}</td>
                                    <td>
                                        {item.createdAt
                                            ? new Date(item.createdAt).toLocaleString()
                                            : "No date"}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="btn btn-xs btn-warning ml-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaboTakaList; 