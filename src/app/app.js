import axios from "axios";
import { createContext , useState } from "react";
export const AppContext = createContext();
export const produitsApi = axios.create({
    baseURL: "http://localhost:9000"
});
/*export const getProduits = ()=>{
    return produitsApi.get("/produits");
}*/
export const getProduits = (keyword, page, size) => {
    return produitsApi.get(`/produits?name_like=${keyword}&_page=${page}&_limit=${size}`);
  };
export const deleteProduits=(produit)=>{
    return produitsApi.delete(`/produits/${produit.id}`);
}

export const getProduitById = (id)=>{
    return produitsApi.get(`/produits/${id}`);
}

export const saveProduit = (produit)=>{
    return produitsApi.post(`/produits`,produit);
}

export const checkProduit = (produit)=>{
    return produitsApi.patch(`/produits/${produit.id}`,{checked:!produit.checked,});
}

export const updateProduit = (produit)=>{
    return produitsApi.put(`/produits/${produit.id}`,produit);
}
//un hook personnaliser
export const useAppState = () =>{
    const initialeState ={
        produits: [],
        currentPage:1,
        pageSize: 4,
        keyword: "",
        totalPages: 0
    
    };

const appState = useState(initialeState);
return appState;
}
    
