import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Sales = () => {
    const [sales, setSales] = useState([]);

    const fetchSales = async () => {
        const res = await axios.get("https://jewellers-shop-server.vercel.app/sales");
        setSales(res.data);
    };

    useEffect(() => {
        fetchSales();
    }, []);

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
                await axios.delete(`https://jewellers-shop-server.vercel.app/sales/${id}`);
                Swal.fire("Deleted!", "Sale has been deleted.", "success");
                fetchSales();
            } catch (err) {
                Swal.fire("Error!", "Delete failed", "error");
            }
        }
    };

    return (
        <div className="p-6 mt-10">
            <h2 className="text-4xl text-center font-bold mb-6">
                {sales.length} Sold Products
            </h2>

            {sales.length === 0 ? (
                <p className="text-center text-gray-500">No sales found</p>
            ) : (
                <div className="card grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sales.map(item => (
                        <div key={item._id} className="card bg-base-100 shadow-xl">
                            <figure className="px-5 pt-5">
                                <img
                                    src={item.image || "https://picsum.photos/200"}
                                    alt={item.name}
                                    className="h-52 w-full object-contain rounded"
                                />
                            </figure>

                            <div className="card-body text-center">
                                <h2 className="font-bold text-lg">{item.name}</h2>

                                <p className="text-lg font-bold text-green-600">
                                    ৳ {item.sellPrice}
                                </p>

                                <p className="text-red-500 font-bold">
                                    {item.status === "sold" ? "SOLD" : "PENDING"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {item.date ? new Date(item.date).toLocaleString() : "No Date"}
                                </p>

                                <button
                                    className="btn btn-error btn-sm mt-2"
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