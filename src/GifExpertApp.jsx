import { useState } from "react"
import { AddCategory, GifGrid } from "./componets";
import { Route, Routes} from "react-router-dom";
import  Layout from  "./pages/Layout";
import  Login  from  "./pages/Login";
import  Default from  "./pages/Default"; 


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

   
  return (
    <>
    <div>
      <hr />
      <Routes>
        <Route path="/" element = {<Layout/>} > </Route>
        <Route path="/loginLista" element = {<Login.Login/>} > </Route>
        <Route path="/*" element = {<Default/>} > </Route>
      </Routes>
      <hr />
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