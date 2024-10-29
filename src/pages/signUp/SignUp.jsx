import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/socialLogin/SocialLogin";

const SignUp = () => {
    const {createUser , updateUserProfile} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();

  const onSubmit = (data) => {
   
    createUser(data.email, data.password)
    .then(result => {
        const loggedUser = result.user;
       console.log(loggedUser);
        updateUserProfile( data.name , data.PhotoUrl)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            
          }
            axiosPublic.post('/users' , userInfo)
            .then(res=> {
              if(res.data.insertedId) {
                reset();
            Swal.fire("user profile updated successfully!");
            navigate('/')
              }
              
            })
            
        })
        .catch(err => console.log(err))
    });
  };

  return (
    <>
    <Helmet>
        <title>
            bistro || SignUP
        </title>
    </Helmet>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">SignUp now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name",{ required: true })}
                placeholder="Enter Your Name"
               
                name="name"
                className="input input-bordered"
               
              />
               {errors.name && <span className="text-red-700">Name required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                {...register("PhotoUrl",{ required: true })}
                placeholder="Enter Your PhotoUrl"
                className="input input-bordered"
               
              />
               {errors.PhotoUrl && <span className="text-red-700">PhotoUrl is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                {...register("email", {required: true})}
                type="email"
                placeholder="email"
                className="input input-bordered"
                
              />
              {errors.email && <span className="text-red-700">Name required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password" , {required: true, minLength:6 , maxLength:20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                })}
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.firstName?.type === 'required' && <p className="text-red-600">password is required</p>}
              {errors.password?.type ==='minLength' && <p className="text-red-600">Password should be at least 6 characters long</p>}
              {errors.password?.type ==='maxLength' && <p className="text-red-600">Password should not exceed 20 characters</p>}
              {errors.password?.type ==='pattern' && <p className="text-red-600">Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$&*)</p>}




              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
           
              <input className="btn btn-primary" type="submit" value="Sign Up " />
            </div>
          </form>
          <p className='text-center text-xl text-[#D1A054]'><small>Already have an account? please <Link to="/login" className='font-semibold'>Login</Link></small></p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
