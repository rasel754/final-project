import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({item}) => {
    const {name , image ,recipe ,price,_id }= item;
    const {user } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [,refetch]=useCart();

    const handleAddToCart = () =>{
      if (user && user.email){
      
        const cartItemU ={
          menuId:_id,
          email:user.email,
          name,
          image,
          price
        }
      
         axiosSecure.post('/carts',cartItemU)
        .then(res => {
          console.log(res);
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added in your card`,
              showConfirmButton: false,
              timer: 1500
            });
            refetch(); // to update the cart state after adding an item
          }
        })


       
      }
      else{
        Swal.fire({
          title: "You are not logged in",
          text: "Please login to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, logged in !"
        }).then((result) => {
          if (result.isConfirmed) {
           navigate('/login', {state:{from:location}})
          }
        });
      }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
          <p className="bg-slate-950 text-white absolute right-0 px-3 mr-12 mb-36">${price}</p>
        </figure>
        <div className="card-body items-center text-center"> 
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions">
            <button 
            onClick={ handleAddToCart}  
            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
            >Add To Card</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;