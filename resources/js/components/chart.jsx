import { formatPrice } from "@/helpers/formatPrice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { month: "Jan", sales: 400 },
//   { month: "Feb", sales: 300 },
//   { month: "Mar", sales: 500 },
// ];


export default function SalesChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="label" />
                <YAxis tickFormatter={formatPrice} />
                <Tooltip formatter={(value) => formatPrice(value)} />
                <Line
                    type="monotone"
                    dataKey="revenue"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}