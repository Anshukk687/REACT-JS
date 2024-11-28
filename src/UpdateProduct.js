import Header from './Header';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await fetch("http://localhost:8000/api/edit/" + id);
                result = await result.json();
                setData(result);
                setName(result.name);
                setPrice(result.price);
                setDescription(result.description);
                setFile(result.file_path);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    async function upProduct(id) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('description', description);

        try {
            let result = await fetch("http://localhost:8000/api/update/" + id, {
                method: 'POST',
                body: formData
            });
            const data = await result.json();
            console.log("Product updated successfully:", data);
            alert("Product has been updated");
            navigate('/');
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    return (
        <div>
            <Header />
            <h1>Update Product</h1>
            <p>Product ID: {id}</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} /><br />
            <img style={{ width: 50 }} src={"http://localhost:8000/storage/" + data.file_path} /><br /><br />
            <button onClick={() => upProduct(id)} className="btn btn-primary">Update</button>
        </div>
    );
}

export default UpdateProduct;
