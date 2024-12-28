import React from "react";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32 min-h-screen">
        <div className="flex flex-col md:flex-row">
          <div className="p-3 w-full">
            <div className="ml-8 text-xl font-bold h-12">
              All Products ({products.length})
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
              {products.map((product) => (
                <div
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 overflow-hidden"
                >
                  <div className="flex justify-between gap-5 flex-col md:flex-row border p-3 rounded-md">
                    <div className=" w-full md:w-3/12">
                      <img
                        className="w-full h-full md:h-40 md:w-40 rounded-md"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="w-full md:w-9/12">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>

                        <p className="text-gray-400 text-xs mr-1">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 sm:w-40 md:w-80 lg:w-120 xl:w-160">
                        {product?.description?.substring(0, 80)}...
                      </p>

                      <div className="flex justify-between items-center">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 delay-75 transition-all"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p>$ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 mt-2">
              <AdminMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
