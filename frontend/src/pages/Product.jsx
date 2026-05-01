import { useEffect, useRef, useState } from "react"
import axios from "axios"
import {Delete, Edit, Heart, Trash2} from "lucide-react"

export default function Product() {
    const [data, setData] = useState({ code: "", name: "", address: "", price: "", category: "", stock: "", brand: "" })
    const [records, setRecords] = useState([])
    const [count, setCount] = useState(0)
    const [editId, setEditId] = useState("")
    const inputRef=useRef(null)



    const doGet = async () => {
        const response = await axios.get("http://localhost:3000/product/data")
        if (response.data) {
            setRecords(response.data.data)
            setCount(response.data.count)
        }
        else {
            console.log("failed to get data")
        }
    }
    useEffect(() => {
        doGet();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(data.code && data.name && data.address && data.price)
        {
        if(!editId){
                const response = await axios.post("http://localhost:3000/product/create", data)
                if (response.data.status) {
                    doGet();
                    console.log("success")
                    handleReset(event)
                } else {
                    console.log("failed")
                }
            }else{
                const response = await axios.put("http://localhost:3000/product/edit", data)
                if (response.data.status) {
                    doGet();
                    console.log("success")
                    setEditId("")
                    handleReset(event)
                } else {
                    console.log("failed")
                }
            }
        }else{
            alert("must fill required fields")
        }
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:3000/product/delete/${id}`)
        if (response.data) {
            doGet();
        } else {
            console.log("it is not deleted")
        }
    }

    const handleReset = (event) => {
        event.preventDefault()
        setData({ code: "", name: "", address: "", price: "", category: "", stock: "", brand: "" })
    }

    const handleEdit = async (id) => {
        setEditId(id)
        const response = await axios.post("http://localhost:3000/product/select", { id: id })
        if (response.data) {
             inputRef.current.focus()
            setData(response.data.data[0])
        } else {
            console.log("data not selected")
        }
    }



    return (
        <div className="p-5 font-bold min-h-screen">
            <h1 className="text-xl">Product Maanagement</h1>
            <form method="post" className="p-5 shadow mt-2" onSubmit={handleSubmit}>
                <h2 className="text-lg mb-4">Add New Product</h2>
                <div className="grid md:grid-cols-4 gap-3">
                    <div>
                        <label htmlFor="">Product Code <span className="text-red-400">*</span></label>
                        <input ref={inputRef} type="text" name="code" value={data.code} onChange={handleChange} className="px-2 py-1 border-2 border-gray-300 w-full outline-none rounded-md font-semibold" placeholder="Enter product code" />
                    </div>
                    <div>
                        <label htmlFor="">Product Name <span className="text-red-400">*</span></label>
                        <input type="text" name="name" value={data.name} onChange={handleChange} className="px-2 py-1 border-2 border-gray-300 w-full outline-none rounded-md font-semibold" placeholder="Enter product name" />
                    </div>
                    <div>
                        <label htmlFor="">Address <span className="text-red-400">*</span></label>
                        <input type="text" name="address" value={data.address} onChange={handleChange} className="px-2 py-1 border-2 border-gray-300 w-full outline-none rounded-md font-semibold" placeholder="Enter address" />
                    </div>
                    <div>
                        <label htmlFor="">Price ($) <span className="text-red-400">*</span></label>
                        <input type="number" name="price" value={data.price} onChange={handleChange} className="px-2 py-1 border-2 border-gray-300 w-full  outline-none rounded-md font-semibold" placeholder="Enter price" />
                    </div>
                    <div>
                        <label htmlFor="">Category</label>
                        <select name="category" value={data.category || ""} onChange={handleChange} id="" className="px-2 py-1 border-2 border-gray-300 w-full font-semibold  outline-none rounded-md" >
                            <option value="" className="">Select Category</option>
                            <option value="Electronincs">Electronics</option>
                            <option value="Furnniture">Furniture</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Home & Kitchen">Home & Kitchen</option>
                        </select>
                    </div>
                    <div className="placeholder">
                        <label htmlFor="">Stock Quantity</label>
                        <input type="number" name="stock" value={data.stock || ""} onChange={handleChange} className="px-2 py-1 border-2 border-gray-300 w-full  outline-none rounded-md font-semibold" placeholder="Enter stock quantity" />
                    </div>
                    <div>
                        <label htmlFor="">Brand</label>
                        <input type="text" name="brand" value={data.brand || ""} onChange={handleChange} className="px-2 py-1 border-2 border-gray-300 w-full  outline-none rounded-md font-semibold" placeholder="Enter brand" />
                    </div>
                </div>
                <div className="flex justify-end gap-5 mt-5">
                    <button type="button" className="px-2 py-1 rounded border-2 border-gray-300 cursor-pointer" onClick={handleReset}>Reset</button>
                    {editId ?
                        <button type="submit" className="px-2 py-1 rounded cursor-pointer bg-blue-700 text-white">Edit Product</button>
                        :
                        <button type="submit" className="px-2 py-1 rounded cursor-pointer bg-blue-700 text-white">Add Product</button>
                    }
                </div>
            </form>

            <div className="p-5 shadow mt-5 font-semibold">
                <h2 className="font-bold text-lg">Product List</h2>
                <table className="w-full border border-gray-300 my-4 text-left">
                    <thead className="rounded">
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Product Code</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Price ($)</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Stock Quantity</th>
                            <th className="px-4 py-2">Brand</th>
                            <th className="px-4 py-2" colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={record._id} className="border-b border-gray-300">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{record.code}</td>
                                <td className="px-4 py-2">{record.name}</td>
                                <td className="px-4 py-2">{record.address}</td>
                                <td className="px-4 py-2">{record.price}</td>
                                <td className="px-4 py-2">{record.category}</td>
                                <td className="px-4 py-2">{record.stock}</td>
                                <td className="px-4 py-2">{record.brand}</td>
                                <td className="px-4 py-2 flex gap-5">
                                    <button className="px-2 py-1 border-none cursor-pointer  bg-blue-800 rounded text-white" onClick={() => { handleEdit(record._id) }}><Edit/></button>
                                    <button className="px-2 py-1 border-none cursor-pointer bg-red-100 rounded text-red-400" onClick={() => { handleDelete(record._id) }}><Trash2/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p>Total Products: {count}</p>
            </div>
        </div>
    )
}