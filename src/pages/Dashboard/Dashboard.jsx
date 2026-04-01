import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../../components/Chart/Chart";
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
                <h2>Sales</h2>
                <p className="text-xl font-bold">৳{data.totalSales || 0}</p>
            </div>

            <div className="card bg-red-100 p-4">
                <h2>Expense</h2>
                <p className="text-xl font-bold">৳{data.totalExpense || 0}</p>
            </div>

            <div className="card bg-yellow-100 p-4">
                <h2>Profit</h2>
                <p className="text-xl font-bold">৳{data.profit || 0}</p>
            </div>
            <div className="card bg-yellow-100 p-4">
                <h2>Pabo Taka</h2>
                <p className="text-xl font-bold">৳{data.takaPabo || 0}</p>

                <Link to="/pabo-list" className="btn btn-sm mt-2">
                    View Details
                </Link>
            </div>
            <div className="card bg-yellow-100 p-4">
                <h2>Howlad Nise</h2>
                <p className="text-xl font-bold">৳{data.howladNise || 0}</p>
            </div>

            <div className="card bg-yellow-100 p-4">
                <h2>Howlad Dise</h2>
                <p className="text-xl font-bold">৳{data.howladDise || 0}</p>
            </div>
            <div className="p-5">
                <Chart />
            </div>
        </div>
    );
};

export default Dashboard;