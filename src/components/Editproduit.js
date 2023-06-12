import React, { useEffect, useState } from 'react'
import { getProduitById, updateProduit } from '../app/app';
import { useParams } from 'react-router-dom';

export default function Editproduit() {
  const {id} =useParams();
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [checked,setChecked] = useState (false);
    useEffect(()=>{
      handleGetProduitById(id);
    },[]);
    const handleGetProduitById=(id)=>{
      getProduitById(id).then(resp=>{
        let produit= resp.data;
        setName(produit.name);
        setPrice(produit.price);
        setChecked(produit.checked);
      });
    }
    const handleUpdateProduit =(event)=>{
        //pour ne pas telecharger la page plusieurs fois
        event.preventDefault();
        let produit = {id,name, price, checked};
        updateProduit(produit).then((resp)=>{
            alert(JSON.stringify(resp.data))
        })
    }
  return (
    <div className='row p-3'> 
    <div className='col-md-6'>
      <div className='"card'>
        <div className='card-body'>
            <form onSubmit={handleUpdateProduit}>
                <div className='mb-3'>
                    <label className='form-label'>Name : </label>
                  <input onChange={(e) =>setName(e.target.value)}
                  value={name}
                   className='form-control'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Prix :</label>
                  <input 
                  onChange={(e)=>setPrice(e.target.value)}
                  value={price}
                  className='form-control'
                ></input>
                </div>
                <div className='form-check'>
                <input
                onChange={(e)=> setChecked(e.target.value)}
                checked={checked}
                className='form-check-input'
                type='checkbox'
                />
                <label className='form-check-label' htmlFor="flexCheckChecked">
                checked</label>
                
                </div>
            <button className='btn btn-primary'>enregistrer</button>
            
            </form>
       </div>
      </div>
      </div>
    </div>
  )
}
