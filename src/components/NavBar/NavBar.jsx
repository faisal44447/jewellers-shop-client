import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from "../../providers/CartProvider";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import LainvinJewellersLogo from "../../assets/Laivin Jewellers Logo.png";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isAdmin = user && user.email === "md9897653@gmail.com";

    const handleLogOut = () => {
        logOut()
            .then(() => Swal.fire("Logged out!", "", "success"))
            .catch(err => console.log(err));
    };

    const navStyle = ({ isActive }) =>
        isActive
            ? "text-primary font-bold border-b-2 border-primary"
            : "hover:text-primary";

    const navOptions = (
        <>
            <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/dashboard" className={navStyle}>Dashboard</NavLink></li>
                    <li><NavLink to="/products" className={navStyle}>All Products</NavLink></li>
                    <li><NavLink to="/sales" className={navStyle}>Sales</NavLink></li>
                    <li><NavLink to="/expenses-details-todo" className={navStyle}>Expenses Details</NavLink></li>                </>
            )}
            {user && isAdmin && (
                <li><NavLink to="/manage-product" className={navStyle}>Manage Product</NavLink></li>
            )}
        </>
    );

    return (
        <div className="navbar glass fixed z-10 -mt-5 shadow-md px-4 max-w-screen-xl mx-auto">

            {/* LEFT */}
            <div className="navbar-start">

                {/* MOBILE MENU */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                        {!user && <li><NavLink to="/login" className={navStyle}>Login</NavLink></li>}
                        {user && (
                            <>
                                <li>
                                    <Link to="/cart" className="btn btn-ghost w-full text-left">
                                        Cart ({cart.length})
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="btn btn-ghost w-full text-left">Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* LOGO */}
                <Link to="/" className=" text-xl">
                    <img src={LainvinJewellersLogo} alt="logo" className="w-[60px] rounded-xl" />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 text-yellow-600 fond-bold">
                    {navOptions}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end flex items-center gap-3">

                {/* Login button if no user */}
                {!user && (
                    <NavLink to="/login" className="btn btn-ghost text-yellow-600 fond-bold">
                        Login
                    </NavLink>
                )}

                {/* User logged in */}
                {user && (
                    <div className="flex items-center gap-2 relative">

                        {/* Cart button */}
                        <Link to="/cart" className="relative">
                            <button className="btn btn-ghost relative">
                                <FaShoppingCart className="mr-2" />
                                <span className="badge font-bold text-lg text-yellow-500 absolute  -right-2">
                                    {cart.length}
                                </span>
                            </button>
                        </Link>

                        {/* Logout button */}
                        <button onClick={handleLogOut} className="btn btn-ghost text-yellow-600 fond-bold">
                            Logout
                        </button>

                        {/* User Image + Hover Name */}
                        <div className="relative group">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full border cursor-pointer"
                            />
                            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-sm px-3 py-1 rounded shadow">
                                {user?.displayName || "User"}
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default NavBar;