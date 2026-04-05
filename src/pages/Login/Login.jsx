import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const generateCaptcha = () => Math.floor(1000 + Math.random() * 9000);

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [input, setInput] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        // captcha input এর মান পরিবর্তন হলে button enable/disable
        if (input === String(captcha)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [input, captcha]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (input !== String(captcha)) {
            Swal.fire("Error!", "Wrong captcha", "error");
            setCaptcha(generateCaptcha());
            setInput("");
            return;
        }

        try {
            const result = await signIn(email, password);
            const user = result.user;

            // backend থেকে token
            const res = await fetch("https://jewellers-shop-server.vercel.app/jwt", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: user.email })
            });
            const data = await res.json();
            localStorage.setItem("access-token", data.token);

            Swal.fire("Success!", "Login successful", "success");
            navigate(from, { replace: true });
        } catch (err) {
            Swal.fire("Error!", err.message, "error");
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col md:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                    </p>
                </div>

                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100 p-5">
                    <form onSubmit={handleLogin} className="card-body space-y-3">
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
                        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />

                        <div>
                            <p className="font-bold">Captcha: {captcha}</p>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter captcha"
                                className="input input-bordered w-full mt-2"
                                required
                            />
                        </div>

                        <button disabled={disabled} className="btn btn-primary w-full">
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-3">
                        New here? <Link to="/signup" className="text-blue-500">Signup</Link>
                    </p>

                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;