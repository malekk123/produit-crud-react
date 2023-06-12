import React, { useContext, useEffect, useState } from 'react'
import {faCheckCircle,faCircle,faEdit,faSearch,faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { AppContext, checkProduit, deleteProduits, getProduits } from '../app/app.js';
import { useNavigate } from 'react-router-dom';
import Search from './Search.js';

export default function Produit() {
   const [query,setQuery] = useState("");
   //sys de routage
   const navigate =useNavigate();
   const [state,setState] = useContext(AppContext);
   useEffect(()=>{handleGetProduit(state.keyword, state.currentPage, state.pageSize);},[]);    
   
   const handleGetProduit = (keyword,page,size) =>{
    getProduits(keyword,page,size).then((resp)=>{
        const totalElements = resp.headers['x-total-count'];
        let totalPages = Math.floor (totalElements / size);
        if(totalElements % size != 0) ++totalPages;
        //... sont les copies de l'attribut
        setState({...state,
            produits:resp.data,
            keyword:keyword,
            currentPage:page,
            pageSize:size,
            totalPages:totalPages,});
    })
    .catch((err) =>{
        console.log(err);
    });
   };
    const handleDeleteProduit = (produit) =>{
        deleteProduits(produit).then((resp)=>{
            const newproduit = state.produits.filter((p)=>p.id != produit.id)
            setState({...state,produits:newproduit})

        })
    };
    const handleCheckProduit =(produit)=>{
        checkProduit(produit).then((resp)=>{
        const newProduit = state.produits.map((p) =>{
            if(p.id == produit.id){
                p.checked =! p.checked;
            }
            return p;
        });
        setState({...state,newProduit});
    });
};
    const handleGotProduit = (page)=>{
        handleGetProduit(state.keyword,page,state.pageSize);
    };
  return (
    <div className='p-1 m-1'>  
        <div className='row'>
        <div className='col-md-6'>
        <div className='card m-1'>
        <div className='card'>
            <div className='card-body'>
            <div className='card-body'>
             <Search handleGetProduit={handleCheckProduit}></Search> 
                </div>
           
           
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.produits.map(produit =>(
                                <tr key={produit.id}>
                                    <td>{produit.id}</td>
                                    <td>{produit.name}</td>
                                    <td>{produit.price}</td>
                                    <td>
                                        <button onClick={()=>handleCheckProduit(produit)} className='btn btn-outline-success'>
                                            <FontAwesomeIcon 
                                            icon={produit.checked ? faCheckCircle : faCircle}
                                            ></FontAwesomeIcon>
                                        </button>
                                        </td>
                                        <td>
                                          <button
                                          onClick={() => handleDeleteProduit(produit)}
                                          className='btn btn-outline-danger'
                                          >
                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                          </button>
                                        </td>
                                        <td>
                                            <button
                                            onClick={() =>navigate(`/editproduit/${produit.id}`)} 
                                            className='btn btn-outline-success'>
                                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                            </button>
                                        </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <ul className="nav nav-pills">
                  {new Array(state.totalPages).fill(0).map((v,index)=>(
                    <li key={index + 1}>
                        <button
                        onClick={() => handleGotProduit(index+1)}
                        className={
                            index + 1 == state.currentPage
                            ? "btn btn-info ms-1"
                            : "btn btn-outline-info ms-1"
                        }
                        >
                            { index + 1 }
                        </button>
                    </li>
                  ))}
                </ul>
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}
