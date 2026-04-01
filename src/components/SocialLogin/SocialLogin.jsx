import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);

                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };

                // ✅ 1. Save user in DB
                axiosPublic.post('/users', userInfo)
                    .then(() => {

                        // ✅ 2. Get JWT token
                        axiosPublic.post('/jwt', { email: userInfo.email })
                            .then(res => {
                                console.log("TOKEN:", res.data.token);

                                // ✅ 3. Save token
                                localStorage.setItem("access-token", res.data.token);

                                // ✅ 4. Redirect
                                navigate('/');
                            })
                            .catch(err => console.log("JWT Error:", err));

                    })
                    .catch(err => console.log("User Save Error:", err));
            })
            .catch(err => console.log("Google Login Error:", err));
    };

    return (
        <div className="p-8">
            <div className="divider"></div>

            <button
                onClick={handleGoogleSignIn}
                className="btn w-full"
            >
                <FaGoogle className="mr-2" />
                Google Login
            </button>
        </div>
    );
};

export default SocialLogin;