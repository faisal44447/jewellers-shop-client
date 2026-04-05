import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from "../../providers/CartProvider";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import shopLogo from "../../assets/shopLogo.jpg";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire("Logged out!", "", "success");
            })
            .catch(error => console.log(error));
    };

    const isAdmin = user && user.email === "md9897653@gmail.com";

    // ✅ Active style
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
                <li>
                    <NavLink to="/manage-product" className={navStyle}>
                        Manage Product
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50 navbar shadow-md px-4">

            {/* LEFT */}
            <div className="navbar-start">

                {/* MOBILE MENU */}
                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden">
                        ☰
                    </div>

                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOption}
                    </ul>
                </div>

                {/* LOGO */}
                <Link to="/" className="btn btn-ghost text-xl">
                    <img
                        className="w-[70px] rounded-xl -mt-[7px]"
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
                    <Link to="/cart" className="btn btn-ghost relative">
                        <FaShoppingCart size={15} />

                        {/* CART COUNT */}
                        <span className="absolute -top-1 -right-1 badge badge-error text-white w-[10px]">
                            {cart.length}
                        </span>
                    </Link>
                )}

                {user ? (
                    <div className="flex items-center gap-2">

                        {/* USER IMAGE */}
                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full border-2 border-primary"
                            />
                        </div>

                        {/* LOGOUT */}
                        <button
                            onClick={handleLogOut}
                            className="btn btn-error btn-sm"
                        >
                            Logout
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