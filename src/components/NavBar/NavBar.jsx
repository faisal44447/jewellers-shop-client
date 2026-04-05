import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from "../../providers/CartProvider";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import shopLogo from "../../assets/shopLogo.jpg";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire("Logged out!", "", "success");
            })
            .catch(error => console.log(error));
    };

    const isAdmin = user && user.email === "md9897653@gmail.com";

    const navStyle = ({ isActive }) =>
        isActive
            ? "text-primary font-bold border-b-2 border-primary"
            : "hover:text-primary";

    const navOption = (
        <>
            <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/dashboard" className={navStyle}>Dashboard</NavLink></li>
                    <li><NavLink to="/products" className={navStyle}>All Products</NavLink></li>
                    <li><NavLink to="/sales" className={navStyle}>Sales</NavLink></li>
                </>
            )}
            {isAdmin && (
                <li><NavLink to="/manage-product" className={navStyle}>Manage Product</NavLink></li>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4 fixed top-0 left-0 w-full z-50">

            {/* LEFT */}
            <div className="navbar-start">
                {/* MOBILE MENU */}
                <div className="dropdown relative">
                    {/* BUTTON TO TOGGLE */}
                    <button
                        onClick={toggleDropdown}
                        className="btn btn-ghost btn-circle lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* DROPDOWN MENU */}
                    {isDropdownOpen && (
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow absolute">
                            {navOption}
                        </ul>
                    )}
                </div>

                {/* LOGO */}
                <Link to="/" className="btn btn-ghost text-xl ml-2">
                    <img
                        className="w-[120px] rounded-xl"
                        src={shopLogo}
                        alt="Shop Logo"
                    />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-5">
                    {navOption}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end flex items-center gap-3">
                {user && (
                    <Link to="/cart" className="btn btn-ghost btn-circle relative">
                        <FaShoppingCart size={18} />
                        <span className="badge badge-xs badge-error indicator-item">
                            {cart.length}
                        </span>
                    </Link>
                )}

                {user ? (
                    <div className="flex items-center gap-2">
                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full border-2 border-primary"
                            />
                        </div>
                        <button onClick={handleLogOut} className="btn btn-error btn-sm btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;