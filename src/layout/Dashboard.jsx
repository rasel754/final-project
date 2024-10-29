
import { CiShoppingCart } from "react-icons/ci";
import { FaBook, FaCalendar, FaHome, FaList, FaMoneyBill, FaSearch, FaStreetView,  FaUsers, FaUtensils } from "react-icons/fa";
import { FaBagShopping, FaBookBookmark, FaMessage } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";

const Dashboard = () => {
    const [cart]=useCart()

    //TODO: get is admin value from database
    const [isAdmin]= useAdmin();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#D1A054] ">
                <ul className="menu p-4 ">
                    {
                        isAdmin ? 
                        <>
                        <li>
                        <NavLink to='/dashboard/adminHome'>
                        <FaHome></FaHome>
                        Admin Home</NavLink>
                    </li>


                    <li>
                        <NavLink to='/dashboard/addItems'>
                       <FaUtensils></FaUtensils>
                       Add Items</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to='/dashboard/manageItems'>
                      <FaList></FaList>
                      Manage Items</NavLink>
                    </li>

                    <li>
                        <NavLink to='/dashboard/manageBookings'>
                        <FaBook></FaBook>
                        Manage bookings</NavLink>
                    </li>

                    <li>
                        <NavLink to='/dashboard/allUsers'>
                       <FaUsers></FaUsers>
                        All Users</NavLink>
                    </li>
                   
                        </>
                        :
                        <>
                        <li>
                        <NavLink to='/dashboard/UserHome'>
                        <FaHome></FaHome>
                        User Home</NavLink>
                    </li>


                    <li>
                        <NavLink to='/dashboard/reservation'>
                       <FaCalendar></FaCalendar>
                        Reservation</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to='/dashboard/paymentHistory'>
                      <FaMoneyBill></FaMoneyBill>
                       Payment History</NavLink>
                    </li>

                    <li>
                        <NavLink to='/dashboard/cart'>
                        <CiShoppingCart></CiShoppingCart>
                        My Cart <span className="text-xl">{cart.length}</span></NavLink>
                    </li>

                    <li>
                        <NavLink to='/dashboard/addReview'>
                        <FaStreetView></FaStreetView>
                        Add Review</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myBooking'>
                       <FaBookBookmark></FaBookBookmark>
                        My Booking</NavLink>
                    </li>
                        </>
                    }
                    {/* share role  */}
                    <div className="divider"></div>

                    <li>
                        <NavLink to='/'>
                        <FaHome></FaHome>
                         Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                        <FaSearch></FaSearch>
                         Menu</NavLink>
                    </li>


                    <li>
                        <NavLink to='/order/salad'>
                        <FaBagShopping></FaBagShopping>
                         Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                        <FaMessage></FaMessage>
                        Contact</NavLink>
                    </li>

                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;