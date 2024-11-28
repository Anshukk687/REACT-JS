import Header from "./Header";
import React, {useState} from "react";
import { Button, Table } from "react-bootstrap";

function SearchProduct()
{
    const [data, setData] = useState([]);

    async function search(key)
    {
        if(key.length>1){
            let result = await fetch("http://localhost:8000/api/search?search="+key)
            result = await result.json();
            setData(result);
        }
    }

    return (
        <>
        <Header />
        <div className="col-sm-6 offset-sm-3">
            <h1>Search Product</h1>
            <br />
            <input type="text" onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Search Product" />
            <br />
            <br />
            {
                data.length>0?

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Description</th>
                            <th>Product Price</th>
                        </tr>
                    </thead>
                    {
                        data.map((item, i)=>
                            <tbody>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.name}</td>
                                    <td><img src={"http://localhost:8000/storage/"+item.file_path} style={{width:100, height:100}} /></td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                </tr>
                            </tbody>
                        )
                    }
                </Table>
            :null
            }
        </div>
        </>
    )
}

export default SearchProduct;