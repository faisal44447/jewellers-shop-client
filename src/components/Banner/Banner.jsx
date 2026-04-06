import { Link } from 'react-router-dom';
import ShopBanner from "../../assets/Shop Banner.jpg";

const Banner = () => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-5 relative rounded-2xl overflow-hidden shadow-2xl">
            <img
                className="w-full h-auto object-cover"
                src={ShopBanner}
                alt="Shop Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
            <Link to="/product-card-page">
                <button className="absolute bottom-4 right-4 md:bottom-8 md:right-8 btn glass text-yellow-400 font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                    View Products
                </button>
            </Link>
        </div>
    );
};

export default Banner;