import { useState, useContext } from "react";
import { CartContext } from "../../providers/CartProvider";

const ProductCard = ({ product }) => {
    const [price, setPrice] = useState("");
    const { addToCart } = useContext(CartContext);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart({
            ...product,
            sellPrice: Number(price || product.buyPrice)
        });
    };

    return (
        <div className="card bg-base-100 w-80 shadow-xl">

            {/* IMAGE */}
            <figure>
                <img
                    src={product?.image || "https://picsum.photos/300"}
                    alt={product?.name}
                    className="h-48 w-full object-cover"
                />
            </figure>

            {/* BODY */}
            <div className="card-body">

                {/* TITLE */}
                <h2 className="card-title">
                    {product?.name}
                    <div className="badge badge-secondary">BUY</div>
                </h2>

                {/* PRICE */}
                <p>Buy: ৳{product?.buyPrice}</p>

                {/* INPUT */}
                <input
                    placeholder="Sell Price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="input input-bordered"
                />

                {/* BUTTON */}
                <div className="card-actions justify-end">
                    <button
                        onClick={handleAddToCart}
                        className="btn btn-success"
                    >
                        Add to Cart
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;