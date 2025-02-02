import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";


const NavBar = () => {
  const { user, logOut } = useAuth();
  const [cart]=useCart()
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
   
      {
        user && isAdmin &&  <li>
        <Link to="/dashboard/adminHome">Dashboard</Link>
      </li>
      }
       {
        user && !isAdmin && 
        <li>
        <Link to="/dashboard/UserHome">Dashboard</Link>
      </li>
      }
      <li>
        <Link to='/dashboard/cart'>
          <button className="btn">
           <MdOutlineShoppingCart></MdOutlineShoppingCart>
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          {" "}
          <button onClick={handleLogOut} className="btn btn-active btn-ghost">
            LogOut
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar fixed z-10 opacity-30 bg-black text-white max-w-screen-xl font-bold">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">BISTRO BOSS</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
