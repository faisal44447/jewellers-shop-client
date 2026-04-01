import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import useAuth from '../../hooks/useAuth';

const Chart = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/sales")
            .then(res => {
                const formatted = res.data.map(item => ({
                    name: item.name,
                    value: item.total
                }));
                setData(formatted);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2 className="text-lg font-bold mb-2">
                📊 Sales Chart ({user?.email})
            </h2>

            <BarChart width={400} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" />
            </BarChart>
        </div>
    );
};

export default Chart;