import { useState } from "react"

//Se controla el evento de textBox cuando cambia el texto  y cuando se envia
//Se valida que no tenga espacios y que sea mayor a un caracter
//Se limpia en cuando se da enter 

export const AddCategory = ({onNewValue}) =>{

    const [inputValue, setInputValue] = useState('');

    const onInputChange = (event) => {
        //console.log(event.target.value);
        setInputValue(event.target.value);   
    }
    const onSubmit = (event) =>{
        event.preventDefault();
        console.log("Valor onSubmit: "+inputValue);
        if(inputValue.trim().length <= 1) return false;
        onNewValue(inputValue.trim());
        setInputValue ('');
    }


    return (
        <form onSubmit={ (event) => onSubmit(event)}>
            <input 
                type = "text"
                placeholder="Buscador de gifs"
                value = { inputValue}
                onChange={onInputChange}
            >
            </input>
        </form>
       
    )
}