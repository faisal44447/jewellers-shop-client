import { Link } from "react-router-dom";
import ShopLogo from "../../assets/shopLogo.JPG";
import "./Footer.css";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
    return (
        <div className="m-5 mt-10">
            <footer className="bg-footer rounded-3xl mx-auto footer footer-center p-10 text-white">

                <aside>
                    <Link to='/'>
                        <img
                            src={ShopLogo}
                            alt="Shop Logo"
                            className="w-[150px] rounded-xl border-2 border-yellow-500"
                        />
                    </Link>

                    <p className="font-bold text-white mt-3 text-lg">
                        LAIVIN Jewellers Ltd.
                        <br />
                        Providing reliable service since 2024
                    </p>

                    <p className="text-white text-sm mt-2">
                        Copyright © {new Date().getFullYear()} - All right reserved
                    </p>
                </aside>

                <nav>
                    <div className="flex gap-6 mt-4">

                        <Link
                            to="https://twitter.com/LaivinJewellers"
                            target="_blank"
                            className="icon-style text-blue-400"
                        >
                            <FaTwitter />
                        </Link>

                        <Link
                            to="https://www.youtube.com/@laivin_jewellers"
                            target="_blank"
                            className="icon-style text-red-500"
                        >
                            <FiYoutube />
                        </Link>

                        <Link
                            to="https://www.facebook.com/LaivinJewellers"
                            target="_blank"
                            className="icon-style text-blue-600"
                        >
                            <FaFacebookF />
                        </Link>

                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;