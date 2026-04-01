import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/dashboard", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        })
            .then(res => setData(res.data));
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">

            <div className="card bg-blue-100 p-4">
                <p>🕒 {new Date(data.time).toLocaleString()}</p>
                <h2>Stock</h2>
                <p className="text-xl font-bold">৳{data.totalStock || 0}</p>
            </div>

            <div className="card bg-green-100 p-4">
                <h2>নগদ টাকা</h2>
                <p className="text-xl font-bold">৳{data.totalSales || 0}</p>
            </div>

            <div className="card bg-red-100 p-4">
                <h2>খরচ</h2>
                <p className="text-xl font-bold">৳{data.totalExpense || 0}</p>
            </div>

            <div className="card bg-yellow-100 p-4">
                <h2>মোট টাকা</h2>
                <p className="text-xl font-bold">৳{data.profit || 0}</p>
            </div>
            <div className="card bg-yellow-100 p-4">
                <h2>টাকা পাবো</h2>
                <p className="text-xl font-bold">৳{data.takaPabo || 0}</p>

                <Link to="/pabo-list" className="btn btn-sm mt-2">
                    View Details
                </Link>
            </div>
            <div className="card bg-yellow-100 p-4">
                <h2>ধার নেওয়া</h2>
                <p className="text-xl font-bold">৳{data.howladNise || 0}</p>

                <Link to="/howlad-list" className="btn btn-sm mt-2">
                    View Details
                </Link>
            </div>

            <div className="card bg-yellow-100 p-4">
                <h2>ধার শোধ করা</h2>
                <p className="text-xl font-bold">৳{data.howladDise || 0}</p>

                <Link to="/howlad-list" className="btn btn-sm mt-2">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;