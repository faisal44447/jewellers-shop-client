import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [paboList, setPaboList] = useState([]);
    const [tab, setTab] = useState("products");

    const axiosSecure = useAxiosSecure();

    // ✅ LOAD PRODUCTS
    const fetchProducts = async () => {
        const res = await axiosSecure.get("/products");
        setProducts(res.data);
    };

    // ✅ LOAD PABO TAKA
    const fetchPabo = async () => {
        const res = await axios.get("http://localhost:5000/receivables");
        setPaboList(res.data);
    };

    useEffect(() => {
        fetchProducts();
        fetchPabo();
    }, []);

    // ✅ DELETE PRODUCT
    const handleDeleteProduct = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be deleted!",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/products/${item._id}`);
                fetchProducts();
                Swal.fire("Deleted!", "Product removed", "success");
            }
        });
    };

    // ✅ DELETE PABO TAKA
    const handleDeletePabo = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This data will be deleted!",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5000/receivables/${id}`);
                fetchPabo();
                Swal.fire("Deleted!", "Removed", "success");
            }
        });
    };

    return (
        <div className="p-5">

            {/* 🔥 TAB BUTTON */}
            <div className="flex gap-3 mb-5">
                <button
                    onClick={() => setTab("products")}
                    className={`btn ${tab === "products" ? "btn-primary" : ""}`}
                >
                    📦 Products
                </button>

                <button
                    onClick={() => setTab("pabo")}
                    className={`btn ${tab === "pabo" ? "btn-primary" : ""}`}
                >
                    💰 Pabo Taka
                </button>
            </div>

            {/* ================= PRODUCTS TABLE ================= */}
            {tab === "products" && (
                <>
                    <div className="flex justify-between mb-6">
                        <h2 className="text-3xl font-bold">Manage Products</h2>

                        <Link to="/add-product">
                            <button className="btn btn-primary">➕ Add Product</button>
                        </Link>
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
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <img
                                                src={item.image || "https://picsum.photos/200"}
                                                className="w-12 h-12 rounded"
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
                                                onClick={() => handleDeleteProduct(item)}
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
                </>
            )}

            {/* ================= PABO TAKA TABLE ================= */}
            {tab === "pabo" && (
                <>
                    <h2 className="text-3xl font-bold mb-5">
                        💰 Manage Pabo Taka
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="table w-full">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paboList.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>৳ {item.amount}</td>
                                        <td>
                                            {new Date(item.createdAt).toLocaleString()}
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => handleDeletePabo(item._id)}
                                                className="btn btn-ghost"
                                            >
                                                ❌
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </>
            )}

        </div>
    );
};

export default ManageProduct;