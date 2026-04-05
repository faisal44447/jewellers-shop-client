import { Link } from 'react-router-dom';
import ShopBanner from "../../assets/Shop Banner.jpg";

const Banner = () => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-5 relative rounded-2xl overflow-hidden shadow-2xl">

            {/* Banner Image */}
            <img
                className="w-full h-72 md:h-96 object-cover"
                src={ShopBanner}
                alt="Shop Banner"
            />

            {/* Button */}
            <Link to="/product-card-page">
                <button className="absolute bottom-6 right-6 md:bottom-12 md:right-12 btn glass text-yellow-400 font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                    View Products
                </button>
            </Link>

            {/* Optional overlay gradient for better text/button visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>

        </div>
    );
};

export default Banner;