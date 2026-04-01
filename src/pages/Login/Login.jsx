import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const generateCaptcha = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [input, setInput] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // ✅ CAPTCHA CHECK
        if (input != captcha) {
            Swal.fire("Error!", "Wrong captcha", "error");
            setCaptcha(generateCaptcha()); // refresh captcha
            return;
        }

        // ✅ LOGIN
        signIn(email, password)
            .then(async (result) => {
                const user = result.user;

                // 🔥 backend থেকে token আনো
                const res = await fetch("http://localhost:5000/jwt", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ email: user.email })
                });

                const data = await res.json();

                // 🔥 token save করো
                localStorage.setItem("access-token", data.token);

                Swal.fire("Success!", "Login successful", "success");
                navigate(from, { replace: true });
            })
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl p-5">

                <h2 className="text-2xl font-bold text-center">Login</h2>

                <form onSubmit={handleLogin} className="space-y-3 mt-4">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                    />

                    {/* 🔥 CAPTCHA */}
                    <div>
                        <p className="font-bold">Captcha: {captcha}</p>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter captcha"
                            className="input input-bordered w-full mt-2"
                        />
                    </div>

                    <button className="btn btn-primary w-full">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3">
                    New here? <Link to="/signup" className="text-blue-500">Signup</Link>
                </p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;
