import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/menu/Menu";
import Order from "../pages/order/order/Order";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import Secret from "../pages/shared/secret/Secret";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/dashboard/cart/Cart";
import AllUsers from "../pages/dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../pages/dashboard/addItems/AddItems";
import ManageItems from "../pages/dashboard/manageItems/ManageItems";
import UpdateItem from "../pages/dashboard/upadateItem/UpdateItem";
import Payment from "../pages/dashboard/payment/Payment";
import PaymentHistory from "../pages/dashboard/paymentHistory/PaymentHistory";
import UserHome from "../pages/userHome/UserHome";
import AdminHome from "../pages/dashboard/adminHome/AdminHome";
  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: "/",
            element: <Home></Home>
        },{
          path:"menu",
          element:<Menu></Menu>

        },{
          path:"order/:category", 
          element:<Order></Order>
        },{
          path: "login",
          element: <Login></Login>
        },{
          path:"signUp",
          element:<SignUp></SignUp>
        },{
          path:'secret',
          element:<PrivateRoutes><Secret></Secret></PrivateRoutes>
        
        }
      ]
    },{
      path:'/dashboard',
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children:[
        // user routes
       {
         path: "cart",
         element: <Cart></Cart>
       },{
        path:'payment',
        element:<Payment></Payment>
       },{
        path:'paymentHistory',
        element:<PaymentHistory></PaymentHistory>
       },{
        path:'UserHome',
        element:<UserHome></UserHome>
       },


      //  admin routes
      {
        path:'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },{
        path:'addItems',
        element:<AdminRoute><AddItems></AddItems></AdminRoute>
      },{
        path:'manageItems',
        element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
      },{
        path:'updateItem/:id',
        element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },{
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      }
      

      ]
        
    },
  ]);