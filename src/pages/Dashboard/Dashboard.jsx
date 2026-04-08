import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("https://jewellers-shop-server.vercel.app/dashboard", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="mt-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">

                {/* TIME + STOCK */}
                <div className="card bg-gradient-to-r from-indigo-400 to-blue-500 text-white p-4 shadow-lg">
                    <p>
                        🕒 {data.time
                            ? (() => {
                                const d = new Date(data.time);
                                let hours = d.getHours();
                                const minutes = d.getMinutes().toString().padStart(2, "0");
                                const ampm = hours >= 12 ? "PM" : "AM";
                                hours = hours % 12 || 12; // 0 হলে 12 দেখাবে
                                const day = d.getDate().toString().padStart(2, "0");
                                const month = (d.getMonth() + 1).toString().padStart(2, "0");
                                const year = d.getFullYear();
                                return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
                            })()
                            : "Loading..."}
                    </p>
                    <h2>দোকানের মোট পণ্য সংখ্যা</h2>
                    <p className="text-xl font-bold">{data.totalStock || 0}</p>
                </div>

                {/* CASH */}
                <div className="card bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 shadow-lg">
                    <h2>নগদ টাকা</h2>
                    <p className="text-xl font-bold">৳{data.cash || 0}</p>
                </div>

                {/* EXPENSE */}
                <div className="card bg-gradient-to-r from-red-400 to-rose-500 text-white p-4 shadow-lg">
                    <h2>খরচ</h2>
                    <p className="text-xl font-bold">৳{data.totalExpense || 0}</p>
                </div>

                {/* PROFIT */}
                <div className="card bg-gradient-to-r from-yellow-300 to-orange-400 text-black p-4 shadow-lg">
                    <h2>মোট লাভ</h2>
                    <p className="text-xl font-bold">৳{data.profit || 0}</p>
                </div>

                {/* RECEIVABLE */}
                <div className="card bg-gradient-to-r from-purple-400 to-pink-500 text-white p-4 shadow-lg">
                    <h2>টাকা পাবো</h2>
                    <p className="text-xl font-bold">৳{data.takaPabo || 0}</p>

                    <Link to="/pabo-list" className="btn btn-sm mt-2 btn-light text-black">
                        View Details
                    </Link>
                </div>

                {/* LOAN TAKEN */}
                <div className="card bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-4 shadow-lg">
                    <h2>ধার নেওয়া</h2>
                    <p className="text-xl font-bold">৳{data.howladNise || 0}</p>

                    <Link to="/howlad-list" className="btn btn-sm mt-2 btn-light text-black">
                        View Details
                    </Link>
                </div>

                {/* LOAN GIVEN */}
                <div className="card bg-gradient-to-r from-teal-400 to-green-500 text-white p-4 shadow-lg">
                    <h2>ধার শোধ করা</h2>
                    <p className="text-xl font-bold">৳{data.howladDise || 0}</p>

                    <Link to="/howlad-list" className="btn btn-sm mt-2 btn-light text-black">
                        View Details
                    </Link>
                </div>

                {/* LINKS */}
                <div>
                    <Link to="/product-card-page">
                        <h2 className="card bg-gradient-to-r from-red-400 to-rose-500 text-white p-4 shadow-lg">
                            দোকানের সকল পণ্য
                        </h2>
                    </Link>
                </div>

                <div>
                    <Link to="/sales">
                        <h2 className="card bg-gradient-to-r from-yellow-300 to-orange-400 text-black p-4 shadow-lg">
                            দোকানের সকল বিক্রয় করা পণ্য
                        </h2>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;