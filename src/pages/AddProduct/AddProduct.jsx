import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api =
    `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            // 🔥 image upload
            const imageFile = { image: data.image[0] };

            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });

            if (res.data.success) {

                const productData = {
                    name: data.name,
                    karat: data.karat,
                    vori: Number(data.vori || 0),
                    ana: Number(data.ana || 0),
                    rati: Number(data.rati || 0),
                    point: Number(data.point || 0),
                    buyPrice: Number(data.buyPrice || 0),
                    image: res.data.data.display_url
                };

                const productRes = await axiosSecure.post("/products", productData);

                if (productRes.data.insertedId) {
                    reset();

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} added successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }

        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Failed to add product", "error");
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center my-6">➕ Add Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name */}
                <input
                    {...register("name", { required: true })}
                    placeholder="Product Name"
                    className="input input-bordered w-full"
                />

                {/* Karat */}
                <input
                    {...register("karat", { required: true })}
                    placeholder="Karat (e.g. 22k)"
                    className="input input-bordered w-full"
                />

                {/* VORI SYSTEM */}
                <div className="grid grid-cols-4 gap-2">
                    <input {...register("vori")} placeholder="Vori" className="input input-bordered" />
                    <input {...register("ana")} placeholder="Ana" className="input input-bordered" />
                    <input {...register("rati")} placeholder="Rati" className="input input-bordered" />
                    <input {...register("point")} placeholder="Point" className="input input-bordered" />
                </div>

                {/* Price */}
                <input
                    type="number"
                    {...register("buyPrice", { required: true })}
                    placeholder="Buy Price"
                    className="input input-bordered w-full"
                />

                {/* Image */}
                <input
                    type="file"
                    {...register("image", { required: true })}
                    className="file-input file-input-bordered w-full"
                />

                <button className="btn btn-primary w-full">
                    Add Product <FaPlus className="ml-2" />
                </button>

            </form>
        </div>
    );
};

export default AddProduct;