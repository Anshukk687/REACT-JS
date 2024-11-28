import Header from "./Header";
import React, {useState, useEffect} from "react";
import { Button, Table } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { Link } from "react-router-dom";

function ProductList ()
{
    const [data, setData] = useState([]);
    useEffect(  () => {
        getData();
    },[]);

    async function deleteOpration(id)
    {
        let result = await fetch("http://localhost:8000/api/delete/"+id,{
            method:'DELETE',
        });
        result = await result.json();
        console.warn(result);
        getData();
    }

    async function getData(params) 
    {   
        const fetchData = async () => {
            const result = await fetch('http://localhost:8000/api/list');
            const resultJSON = await result.json();
            setData(resultJSON);
            console.warn("data", resultJSON);
        }
        fetchData();
    }

    return(
        <>
        <Header />
        <div className="">
            <h1>Product Listing</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Description</th>
                        <th>Product Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    data.map((item)=>
                        <tbody>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td><img src={"http://localhost:8000/storage/"+item.file_path} style={{width:100, height:100}} /></td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td><Button className="btn btn-danger" onClick={()=>{deleteOpration(item.id)}}>Delete</Button>
                                <Link to={"update/"+item.id}><span className="btn btn-success">Update</span></Link></td>
                            </tr>
                        </tbody>
                    )
                }
            </Table>
        </div>
        </>
    )
}

export default ProductList;