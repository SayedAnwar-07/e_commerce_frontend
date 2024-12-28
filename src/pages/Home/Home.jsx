import React from "react";
import { useParams } from "react-router-dom";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Header from "../../components/Header";

const Home = () => {
  const { keyword } = useParams();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetTopProductsQuery({ keyword });

  return (
    <div className="pl-[6rem] min-h-screen">
      <h1 className="font-bold text-2xl">
        This is <span className="text-red-500">Home</span> page
        {!keyword ? <Header /> : null}
      </h1>
    </div>
  );
};

export default Home;
