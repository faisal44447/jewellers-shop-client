import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from "../../providers/CartProvider";
import { AuthContext } from "../../providers/AuthProvider";
import shopLogo from "../../assets/shopLogo.jpg";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const isAdmin = user && user.email === "md9897653@gmail.com";

    const navOption = (
        <>
            <li><NavLink to="/">Home</NavLink></li>

            {user && (
                <>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/product-card-page">Shop</NavLink></li>
                    <li><NavLink to="/products">Products</NavLink></li>
                </>
            )}

            {isAdmin && (
                <>
                    <li><NavLink to="/add-product">Add Product</NavLink></li>
                    <li><NavLink to="/manage-product">Manage Product</NavLink></li>
                    <li><NavLink to="/expenses">Expenses</NavLink></li>
                    <li><NavLink to="/howlad">Howlad</NavLink></li>
                    <li><NavLink to="/paboTaka">Pabo Tk</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 px-4">

            {/* LEFT */}
            <div className="navbar-start">

                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden">
                        ☰
                    </div>

                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOption}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl">
                    <img className="w-[80px] rounded-xl" src={shopLogo} />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-3">
                    {navOption}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end flex items-center gap-3">

                {user && (
                    <Link to="/cart" className="btn btn-ghost">
                        <FaShoppingCart />
                        <span className="badge badge-error ml-1">{cart.length}</span>
                    </Link>
                )}

                {user ? (
                    <div className="flex items-center gap-2">
                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full border"
                            />
                        </div>

                        <button onClick={handleLogOut} className="btn btn-error btn-sm">
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