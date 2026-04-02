import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Sales = () => {
    const [sales, setSales] = useState([]);

    const fetchSales = async () => {
        const res = await axios.get("http://localhost:5000/sales");
        setSales(res.data);
    };

    useEffect(() => {
        fetchSales();
    }, []);

    // ❌ DELETE
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this sale?",
            text: "You won't be able to revert!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/sales/${id}`);

                Swal.fire("Deleted!", "Sale has been deleted.", "success");
                fetchSales();
            } catch (err) {
                Swal.fire("Error!", "Delete failed", "error");
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-4xl text-center font-bold mb-6">
                {sales.length} Sold Products
            </h2>

            {sales.length === 0 ? (
                <p className="text-center text-gray-500">No sales found</p>
            ) : (
                <div className="card grid grid-cols-1 md:grid-cols-3 gap-4 ">

                    {sales.map(item => (
                        <div key={item._id} className="card bg-base-100 shadow-xl">

                            {/* IMAGE */}
                            <figure className="px-5 pt-5">
                                <img
                                    src={item.image || "https://picsum.photos/200"}
                                    alt={item.name}
                                    className="h-52 w-full object-contain rounded"
                                />
                            </figure>

                            {/* BODY */}
                            <div className="card-body text-center">

                                <h2 className="font-bold text-lg">
                                    {item.name}
                                </h2>

                                {/* PRICE */}
                                <p className="text-lg font-bold text-green-600">
                                    ৳ {item.sellPrice}
                                </p>

                                {/* STATUS */}
                                <p className="text-red-500 font-bold">
                                    SOLD
                                </p>

                                {/* DATE */}
                                <p className="text-sm text-gray-500">
                                    {item.date
                                        ? new Date(item.date).toLocaleString()
                                        : "No Date"}
                                </p>

                                {/* BUTTON */}
                                <button
                                    className="w-full btn btn-error btn-sm mt-2"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default Sales;