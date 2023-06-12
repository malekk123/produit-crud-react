import React, { state,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {faCheckCircle,faCircle,faEdit,faSearch,faTrash} from "@fortawesome/free-solid-svg-icons";

export default function Search({handleGetProduit}) {
    const [query,setQuery] =useState("");
    const [state, setstate] = useState("");
    const handleSearch = (event) =>{
        //pour ne pas télécharger la page
        event.preventDefault();
        handleGetProduit(query, 1 ,state.pageSize);
    };

  return (
    <form onSubmit={handleSearch}>
    <div className='row g-2'>
        <div className='col-auto'>
            <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='form-control'></input>
        </div>
        <div className='col-auto'>
            <button className='btn btn-success'>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
        </div>
    </div>
</form>

    )
}
