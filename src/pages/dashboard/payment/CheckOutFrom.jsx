import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useCart from "../../../hooks/useCart.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutFrom = () => {
 
  const [clientSecret , setClientSecret] = useState();
  const [transactionId , setTransactionId] = useState('');
  const [error, setError] = useState("");
  const stripe = useStripe();
  const {user} = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart , refetch] = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item )=> total + item.price ,0)

  useEffect(()=>{
    if(totalPrice >0){
        axiosSecure.post('/create-payment-intent', {price: totalPrice})
    .then( res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
    } )
    }
  },[axiosSecure , totalPrice])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(" payment error :", error);
      setError(error.message);
    } else {
      console.log("Payment method :", paymentMethod);
      setError("");
    }
    // confirm error 
    const {paymentIntent , error:confirmError} = await stripe.confirmCardPayment( clientSecret , {
        payment_method:{
            card:card ,
            billing_details:{
                name:user.name || 'anonymous',
                email:user.email || 'anonymous',
                phone:user.phone || 'anonymous'
            }
        }
    })
    if (confirmError) {
        console.log('confirmation error');

    }
    else{
        console.log('payment intent' , paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            console.log('transaction id' , paymentIntent.id);
            setTransactionId(paymentIntent.id);

            // now set the payment in database
            const payment ={
                email:user.email,
                price : totalPrice,
                transactionId: paymentIntent.id,
                date : new Date(),
                cartIds : cart.map(item => item._id),
                menuitemIds : cart.map(item => item.menuId),
                status : 'pending'

            }
          const res = await  axiosSecure.post('/payments', payment)   
          console.log('payment save :',res.data);
          refetch();
          if(res.data?.paymentResult?.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment was successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/dashboard/paymentHistory'); 
          }

        }
    }

  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-primary btn-sm my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600 font-medium text-xl">{error}</p>
      {
        transactionId && 
          <div className="text-green-600 font-medium text-xl">
            Transaction Successful! Transaction ID: {transactionId}
          </div>
        
      }
    </form>
  );
};

export default CheckOutFrom;
