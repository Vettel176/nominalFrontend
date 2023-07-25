import { useState } from "react"
import { AddCategory } from "./componets/AddCategory";
import { GifGrid } from "./componets/GifGrid";


//.....Contenido GifExpertApp.... ///
//GifExpertApp Contiene el espacio de memoria (arreglo) de las categorias.

//En AddCategory nacen nuevos nombres de categorias y se hacen validaciones 
//sobre el texto que se teclea (onNewValue), una vez hecho se regresa la variable y se
//agrega al array de categorias (nombres de categorias)

//GifGrid 
export const GifExpertApp = () =>{

  const [categories, setCategories] = useState(['Gran Turismo']);
    console.log(" LOG GifExpertApp      "+ categories);

  
    //Se oprime Enter y se Valida si el texto ingresado se encuentra en el arreglo 
    //Si no lo contiene se agrega  al principio del arreglo
    const onEnterAddCategoryBox = (onNewValue) => {
      console.log("Enter Box Gifts");
      if(categories.includes(onNewValue)) return;
      setCategories( [ onNewValue, ...categories]);
    }

    // const array1 = [1, 4, 9, 16];
    // const myMap = new Map([
    //   [1, "one"],
    //   [3, "three"],
    // ]);
    // const myMapValues = new Map();

    // myMap.set('2', {tamaño: 23, stilo:"Barroco"});
    // // Pass a function to map
    // const map1 = array1.map(x => x *2);

    // console.log("Te pinto el siguiente MAP");
    // console.log(myMap);
    // console.log("Obteniendo las Keys");
    // console.log(myMap.keys())
    // console.log("Imptesion Valires de Mamp Mediante FOR")
    // for(const item  of myMap){
    //   console.log(item);
    // }
    // console.log("Impresion Variables Separadas");
    // for(const [key,value] of myMap){
    //   console.log(key, value);
    // }
   
  return (
    <>
      <h1> Bienvenido a Proyecto 24 </h1>
      <h4>En lo que hacemos algo puedes buscar gifts divertidos. Adelante, ACM1PT</h4>

        <AddCategory onNewValue = {(valueSend) => onEnterAddCategoryBox(valueSend)}
                     />
        
        {categories.map(category => (
            <GifGrid key={category}
                     category={category}/>
        ))
        }

    </>  
  )
} 