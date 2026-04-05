import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

    const handleRemove = (id) => {
        removeFromCart(id);
        Swal.fire("Removed!", "Item removed", "success");
    };

    const handleSell = async () => {
        try {
            for (const item of cart) {
                await axios.post("https://jewellers-shop-server.vercel.app/sell", item);
            }

            clearCart();
            localStorage.removeItem("cart");

            Swal.fire("Success!", "Sale Completed", "success");
        } catch {
            Swal.fire("Error!", "Something went wrong", "error");
        }
    };

    const total = cart.reduce((sum, item) => sum + Number(item.sellPrice || 0), 0);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">🛒 Cart</h2>

            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {cart.map(item => (
                            <div key={item._id} className="card bg-base-100 shadow-xl">

                                <figure className="px-5 pt-5">
                                    {/* ✅ FIXED IMAGE */}
                                    <img
                                        src={item.image || "https://picsum.photos/200"}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </figure>

                                <div className="card-body text-center">
                                    <h2>{item.name}</h2>

                                    <p className="font-bold">
                                        ৳{item.sellPrice || item.buyPrice || 0}
                                    </p>

                                    {/* ✅ ADD THIS */}
                                    <p className="text-green-600 font-bold">
                                        {item.status === "sold" ? "SOLD" : "IN CART"}
                                    </p>

                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="btn btn-error btn-sm mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-center">
                        Total: {total} ৳
                    </h3>

                    <button onClick={handleSell} className="btn btn-success w-full mt-4">
                        ✅ Confirm Sell
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;