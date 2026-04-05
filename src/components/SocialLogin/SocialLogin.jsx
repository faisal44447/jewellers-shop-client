import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;
            console.log(user);

            const userInfo = {
                email: user?.email,
                name: user?.displayName
            };

            // ✅ Save user to DB
            await axiosPublic.post('/users', userInfo);

            // ✅ Get JWT token
            const tokenRes = await axiosPublic.post('/jwt', { email: userInfo.email });
            const token = tokenRes.data.token;

            // ✅ Save token
            localStorage.setItem("access-token", token);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login successful via Google!',
                showConfirmButton: false,
                timer: 1500
            });

            // ✅ Redirect
            navigate('/');
        } catch (error) {
            console.error("Social Login Error:", error);
            Swal.fire("Error!", error.message || "Google login failed", "error");
        }
    };

    return (
        <div className="p-8">
            <div className="divider">Or continue with</div>

            <button
                onClick={handleGoogleSignIn}
                className="btn w-full btn-outline flex items-center justify-center gap-2"
            >
                <FaGoogle />
                Google Login
            </button>
        </div>
    );
};

export default SocialLogin;