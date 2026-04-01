import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const axiosSecure = useAxiosSecure();

    const fetchProducts = async () => {
        try {
            const res = await axiosSecure.get("/products");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/products/${item._id}`);

                if (res.data.deletedCount > 0) {
                    fetchProducts();
                    Swal.fire("Deleted!", `${item.name} deleted`, "success");
                }
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-3xl font-bold">📦 Manage Products</h2>
                <Link to="/add-product">
                    <button className="btn btn-primary">➕ Add Product</button>
                </Link>
            </div>

            <div className="flex justify-evenly mb-8">
                <h2>Total: {products.length}</h2>
                <h2>
                    Stock Value: ৳
                    {products.reduce((sum, p) => sum + Number(p.buyPrice || 0), 0)}
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Karat</th>
                            <th>Weight</th>
                            <th>Buy Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>

                                {/* ✅ FIXED IMAGE */}
                                <td>
                                    <img
                                        src={item.image || "https://picsum.photos/200"}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>

                                <td>{item.name}</td>
                                <td>{item.karat}</td>

                                <td>
                                    {item.vori}v {item.ana}a {item.rati}r {item.point}p
                                </td>

                                <td>৳{item.buyPrice}</td>

                                <td>
                                    <Link to={`/edit/${item._id}`}>
                                        <button className="btn btn-warning btn-sm">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="btn btn-ghost"
                                    >
                                        <FaTrashAlt className="text-red-600" />
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

export default ManageProduct;