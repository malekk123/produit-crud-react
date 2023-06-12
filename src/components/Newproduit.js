import React, { useState } from 'react'
import { saveProduit } from '../app/app';

export default function Newproduit() {
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [checked,setChecked] = useState (false);
    const handleSaveProduct =(event)=>{
        //pour ne pas telecharger la page plusieurs fois
        event.preventDefault();
        let produit = {name, price, checked};
        saveProduit(produit).then((resp)=>{
            alert(JSON.stringify(resp.data))
        })
    }
  return (
    <div className='row p-3'> 
    <div className='col-md-6'>
      <div className='"card'>
        <div className='card-body'>
            <form onSubmit={handleSaveProduct}>
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
