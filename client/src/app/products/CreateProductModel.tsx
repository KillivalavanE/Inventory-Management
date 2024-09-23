import { ChangeEvent, FormEvent, useState } from "react"
import { v4 } from "uuid"
import Header from "../(components)/Header"
export interface ProductFormData {
    name:string,
    price:number,
    rating:number,
    stockQuantity:number
}
type CreateProductModelProps = {
    isOpen:boolean,
    onClose:()=>void,
    onCreate:(formData:ProductFormData)=>void
}

const CreateProductModel = ({isOpen,onClose,onCreate}: CreateProductModelProps) => {
    const [formData,setFormData]=useState({
        productId:v4(),
        name:"",
        price:0,
        rating:0,
        stockQuantity:0
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:name==="price" || name==="rating" || name==="stockQuantity" ? parseFloat(value) : value
        })
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData)
        onClose()
    }
    const labelCss = "block text-sm font-medium text-gray-700"
    const inputCss = "block w-full mb-2 p-2 border-2 border-gray-500 rounded-md"

    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto z-20 h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Product"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="productName" className={labelCss}>Product Name</label>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required value={formData.name} className={inputCss}/>
                    <label htmlFor="productPrice" className={labelCss}>Price</label>
                    <input type="number" name="price" placeholder="Price" onChange={handleChange} required value={formData.price} className={inputCss}/>
                    <label htmlFor="productRating" className={labelCss}>Rating</label>
                    <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required value={formData.rating} className={inputCss}/>
                    <label htmlFor="productQuantity" className={labelCss}>Stock Quantity</label>
                    <input type="number" name="stockQuantity" placeholder="Quantity" onChange={handleChange} required value={formData.stockQuantity} className={inputCss}/>
                    <button type="submit" className="mt-2 font-semibold px-4 py-2 bg-blue-500 hover:bg-blue-700 shadow-md rounded-md text-white">Create Product</button>
                    <button onClick={onClose} type="button" className="ml-2 font-semibold px-4 py-2 bg-gray-500 hover:bg-gray-700 shadow-md rounded-md text-white">Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProductModel