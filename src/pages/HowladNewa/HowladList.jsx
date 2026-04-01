import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const HowladList = () => {
    const [list, setList] = useState([]);
    const axiosSecure = useAxiosSecure();

    const fetchData = async () => {
        const res = await axiosSecure.get("/transactions");
        setList(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">📊 Howlad Details</h2>

            <table className="table table-xs">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((item, i) => (
                        <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                {item.type === "loan"
                                    ? "➕ Howlad Nise"
                                    : "➖ Howlad Dise"}
                            </td>
                            <td>৳ {item.amount}</td>
                            <td>
                                {new Date(item.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HowladList;