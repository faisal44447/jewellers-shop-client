import axios from "axios";
import { useEffect, useState } from "react";

const PaboTakaList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/receivables")
            .then(res => setList(res.data));
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">📋 Pabo Taka List</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>৳ {item.amount}</td>
                                <td>
                                    {new Date(item.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaboTakaList;