import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data:payments=[]} = useQuery({
        queryKey:['payments'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/payments/${user.email}`)
            return response.data;
        }
    })
  return (
    <div>
      <h1 className="font-bold text-3xl mb-6">Total Payments: {payments.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            
            <thead className="bg-[#D1A054] h-16 ">
              <tr >
                <th>Date</th>
                <th>Transaction Id</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
               {payments.map(payment => <tr key={payment._id} className="hover">
                <th>{payment.date}</th>
                <td>{payment.transactionId}</td>
                <td>{payment.price}</td>
                <td>{payment.status}</td>
              </tr>)}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
