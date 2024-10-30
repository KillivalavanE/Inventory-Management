"use client"
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "../(components)/Header";
import { Rating } from "@mui/material";
import CreateProductModel, { ProductFormData } from "./CreateProductModel";
import Image from "next/image";

const Products = () => {
    const [search,setSearch]=useState("")
    const [isModelOpen,setIsModelOpen]=useState(false)
    const {data:products,isLoading,isError}=useGetProductsQuery(search);
    const [createProduct] = useCreateProductMutation();
    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData)
    }
    if(isLoading){
        return <div className="py-4">Loading...</div>
    }
    if(isError || !products){
        return (
            <div className="text-center text-red-500 py-4">Failed to fetch products</div>
        )
    }
    return (
        <div className="mx-auto pb-5 w-full">
            {/* search bar  */}
            <div className="mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded">
                    <SearchIcon className="w-5 h-5 text-gray-500 m-2"/>
                    <input className="w-full py-2 px-4 rounded bg-white" placeholder="Search Products..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </div>
            </div>
            {/* header bar  */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Products"/>
                <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setIsModelOpen(true)}>
                    <PlusCircleIcon className="w-5 h-5 mr-2"/>
                    Create Product
                </button>
            </div>
            {/* body */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
                {isLoading ? (<div>Loading...</div>):(
                    products?.map((product)=>(
                        <div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
                            <div className="flex flex-col items-center">
                            <Image src={`https://inventory-managemet-s3.s3.ap-south-1.amazonaws.com/product${Math.floor(Math.random()*3)+1}.png`} alt="profile" width={150} height={150} className="mb-3 rounded-2xl w-35 h-36"/>
                                <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                                <div className="text-sm text-gray-600 mt-1">
                                    Stock: {product.stockQuantity}
                                </div>
                                {product.rating && (
                                    <div className="flex items-center mt-2">
                                        <Rating readOnly value={product?.rating}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* model */}
            <CreateProductModel isOpen={isModelOpen} onClose={()=>setIsModelOpen(false)} onCreate={handleCreateProduct}/>
        </div>
    );
};

export default Products;
