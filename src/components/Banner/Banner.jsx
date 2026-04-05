import { Link } from 'react-router-dom';
import ShopBanner from "../../assets/Shop Banner.jpg";

const Banner = () => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-5 relative">

            <img
                className="w-full object-cover rounded-2xl shadow-2xl"
                src={ShopBanner}
                alt="Shop Banner"
            />

            <Link to="/shop" className="absolute bottom-12 right-6">
                <button className="btn glass text-yellow-400 font-bold">
                    View Products
                </button>
            </Link>

        </div>
    );
};

export default Banner;