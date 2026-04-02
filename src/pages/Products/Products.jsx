import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Products = () => {
    const [products, setProducts] = useState([]);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // 🔥 LOAD PRODUCTS
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

    // ❌ DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Product will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/products/${id}`);

                if (res.data.deletedCount > 0) {
                    fetchProducts();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Product deleted successfully.",
                        icon: "success"
                    });
                }
            }
        });
    };

    return (
        <div>
            {/* 🔥 TOP SUMMARY */}
            <div className="flex justify-evenly mb-8">
                <h2 className="text-4xl text-center font-bold">All Products: {products.length}</h2>
            
            </div>

            {/* 🔥 TABLE */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Karat</th>
                            <th>Weight</th>
                            <th>Buy</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>

                                    {/* IMAGE */}
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="product" />
                                            </div>
                                        </div>
                                    </td>

                                    {/* NAME */}
                                    <td>{item.name}</td>

                                    {/* KARAT */}
                                    <td>{item.karat}</td>

                                    {/* WEIGHT */}
                                    <td>
                                        {item.vori}v {item.ana}a {item.rati}r {item.point}p
                                    </td>

                                    {/* BUY */}
                                    <td>৳{item.buyPrice}</td>


                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;