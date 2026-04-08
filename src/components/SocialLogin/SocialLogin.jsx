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
            if (!user?.email) throw new Error("Google login failed. No email returned.");

            const userInfo = {
                email: user.email,
                name: user.displayName || "Unknown"
            };

            // ✅ Save user to DB, handle duplicate gracefully
            await axiosPublic.post('/users', userInfo).catch(err => {
                console.warn("User may already exist:", err.response?.data?.message || err.message);
            });

            // ✅ Get JWT token
            const tokenRes = await axiosPublic.post('/jwt', { email: userInfo.email });
            const token = tokenRes.data.token;
            if (!token) throw new Error("Token not received from server");

            // ✅ Save token to localStorage
            localStorage.setItem("access-token", token);

            // ✅ Notify user
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
                className="btn w-full btn-outline flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
                <FaGoogle className="text-red-500" />
                Google Login
            </button>
        </div>
    );
};

export default SocialLogin;