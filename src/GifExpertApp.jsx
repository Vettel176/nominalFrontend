import { useState, useEffect } from "react"
import { AddCategory, GifGrid } from "./componets";
import { Route, Routes} from "react-router-dom";
import  Layout from  "./pages/Layout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import  Login  from  "./pages/Login";
import  Default from  "./pages/Default"; 
import Close from "./pages/close";


//se importan los 2 de abajo de un jalon. con archivo de barril
//import { AddCategory } from "./componets/AddCategory";
//import { GifGrid } from "./componets/GifGrid";


//.....Contenido GifExpertApp.... ///
//GifExpertApp Contiene el espacio de memoria (arreglo) de las categorias.

//En AddCategory nacen nuevos nombres de categorias y se hacen validaciones 
//sobre el texto que se teclea (onNewValue), una vez hecho se regresa la variable y se
//agrega al array de categorias (nombres de categorias)

//GifGrid 
export const GifExpertApp = () =>{
  console.log(" COMPONENTE PRINCIPAL al cargar la pagina  P-24");
  const [categories, setCategories] = useState(['Gran Turismo']);
   
    //Se oprime Enter y se Valida si el texto ingresado se encuentra en el arreglo 
    //Si no lo contiene se agrega  al principio del arreglo
    const onEnterAddCategoryBox = (onNewValue) => {
      console.log("Enter Box Gifts");
      if(categories.includes(onNewValue)) return;
      setCategories( [ onNewValue, ...categories]);
    }
  
    useEffect(() => {
      AOS.init();
    }, [])

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element = {<Login.Login/>} > </Route>
        <Route path="/*" element = {<Default/>} > </Route>
        <Route path="/close" element = {<Close/>} > </Route>
      </Routes>
    </div> 
        {/* <AddCategory onNewValue = {(valueSend) => onEnterAddCategoryBox(valueSend)}/>
        
        {categories.map(category => (
            <GifGrid key={category}
                     category={category}/>
        ))
        } */}
    </>  
  )
} 