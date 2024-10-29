
import { FaGoogle } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleGoogleSignIn= () => {
        googleLogin()
        .then(res => {
            console.log(res.user);
            const userInfo = {
                email : res.user?.email,
                name : res.user?.displayName,
               
            }
            axiosPublic.post('/users', userInfo)
             .then(res => {
                console.log(res.data);
                navigate('/')
             })
        })
    };
  return (
    <div className="p-8">
          <div className="divider">or</div>
      <button onClick={handleGoogleSignIn} className="btn">
        <FaGoogle className="ml-2 "></FaGoogle>
        google
      </button>
    </div>
  );
};

export default SocialLogin;
