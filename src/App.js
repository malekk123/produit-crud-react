import './App.css';
import {  BrowserRouter, Router,  Routes, Link, Route} from "react-router-dom";
import Home from './components/Home';
import Newproduit from './components/Newproduit';
import Editproduit from './components/Editproduit';
import  "bootstrap/dist/css/bootstrap.min.css";
import Produit from './components/Produit';
import { useEffect, useState } from 'react';
import { AppContext, useAppState } from './app/app';
import Stats from './components/Stats';

function App() {
 const[currentRoute,setCurrentRoute]= useState();
  useEffect(()=>{
    const path = window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1,path.length));
  },[]);
 
  return(
    //information partager pour tous les composants
    <AppContext.Provider value={useAppState()}> 
    <BrowserRouter>
    <nav className='m-1 p-1 border border-info navbar navbar-expand-lg navbar-light bg-light'>
      <ul className='nav na-pills'>
        <li>
          <Link 
          onClick={() => setCurrentRoute("home")
          }
          className={
            currentRoute == "home"
            ?"btn btn-info ms-1"
            :"btn btn-outline-info ms-1"}
            to={"/Home"}>Home</Link>
        </li>
        <li>
          <Link 
          onClick={()=>setCurrentRoute("produit")}
          className={
            currentRoute == "produits"
            ?"btn btn-info ms-1"
            :"btn btn-outline-info ms-1"}
             to={"/Produits"}>produits</Link>
        </li>
        <li>
          <Link 
          onClick={()=> setCurrentRoute("newproduit")}
          className={
            currentRoute == "newproduit"
            ?"btn btn-info ms-1"
            :"btn btn-outline-info ms-1"}
             to={"/newproduit"}>Nouveau produit</Link>
        </li>
        <li></li>
        <Stats></Stats>
      </ul>
    </nav>
    <Routes>
      <Route path="/Home" element={<Home/>}></Route>
      <Route path="/produits" element={<Produit/>}></Route>
      <Route path="/newproduit" element={<Newproduit/>}></Route>
      <Route path="/editproduit/:id" element={<Editproduit/>}></Route>

    </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  ); 
    
}

export default App;
