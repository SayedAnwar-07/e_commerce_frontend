import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <div className="flex justify-around">
        <div className="xl:block md:hidden lg:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data?.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
