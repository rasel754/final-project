import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBorderStyle, FaDollarSign, FaUsers } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];



const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data:stats=[] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
 
  console.log(stats);
  const { user } = useAuth();

  const {data: chartStats=[]} =useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
        const response = await axiosSecure.get(`/order-stats`)
        return response.data;
    }
  })
  return (
    <div>
      <h1 className="text-3xl font-semibold">
        Hi, Welcome <span>{user.displayName ? user.displayName : "Back!"}</span>
      </h1>

      <div>
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl" />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${ stats.revenue }</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl"></FaUsers>
            </div>
            <div className="stat-title"> Users</div>
            <div className="stat-value">{stats.user}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
            <BiFoodMenu className="text-3xl" />    
            </div>
            <div className="stat-title"> Menu Items</div>
            <div className="stat-value">{stats.menuItems}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
            <FaBorderStyle className="text-3xl" />

            </div>
            <div className="stat-title">Orders</div>
            <div className="stat-value">{stats.orders}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
