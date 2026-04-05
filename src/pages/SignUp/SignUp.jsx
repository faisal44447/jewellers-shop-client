import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from 'react-hook-form';
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { useContext } from "react";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const user = result.user;

            await updateUserProfile(data.name, data.photoURL);

            // database এ user info পাঠানো
            const userInfo = { name: data.name, email: data.email };
            const res = await axiosPublic.post('/users', userInfo);

            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                        </p>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-3">

                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered w-full"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <p className="text-red-600">Name is required</p>}

                            <input
                                type="text"
                                placeholder="Photo URL"
                                className="input input-bordered w-full"
                                {...register("photoURL", { required: true })}
                            />
                            {errors.photoURL && <p className="text-red-600">Photo URL is required</p>}

                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <p className="text-red-600">Email is required</p>}

                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                            />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must include uppercase, lowercase, number, and special character</p>}

                            <div className="form-control mt-3">
                                <input type="submit" value="Sign Up" className="btn btn-primary w-full" />
                            </div>
                        </form>

                        <p className="text-center mt-3">
                            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                        </p>

                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;