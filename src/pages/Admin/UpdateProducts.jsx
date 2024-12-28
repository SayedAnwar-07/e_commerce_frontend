import React, { useEffect, useState } from "react";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApi";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateProducts = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);
  const navigate = useNavigate();

  const { data: categories, refetch = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setBrand(productData.brand);
      setQuantity(productData.quantity);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  //   update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const { data } = await updateProduct({ productId: params._id, formData });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated.");
        refetch();
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try Again.");
    }
  };

  //   product delete
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(params._id);
          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
          });
          refetch();
          navigate("/admin/allproductslist");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    });
  };

  return (
    <div>
      <div className="container mx-auto p-4 min-h-screen">
        <div className="flex flex-col pl-[10rem] md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
            <div className="h-12 mb-4 text-xl font-bold">
              Update - {productData?.name ? productData.name : "product"}
            </div>

            <div className="flex justify-center items-center gap-2">
              {image && (
                <div className="text-center mb-4">
                  <img
                    src={image}
                    alt="product"
                    className="block mx-auto max-h-[200px]"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-4">
                  {image ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price
                  </label>
                  <input
                    type="number"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  className="p-2 mb-3 w-full bg-[#101011] border rounded-lg text-white"
                  value={description}
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium">
                    Count In Stock
                  </label>
                  <input
                    type="number"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium"
                  >
                    Category
                  </label>
                  <select
                    placeholder="Choose Category"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="py-3 px-8 mt-5 rounded-md text-md font-semibold bg-green-600 hover:bg-green-700 delay-75 transition-all w-full md:w-auto"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-3 px-8 mt-5 rounded-md text-md font-semibold bg-red-600 hover:bg-red-700 delay-75 transition-all w-full md:w-auto"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProducts;
