//import * as Icon from 'react-bootstrap-icons';
import { BuildingAdd } from 'react-bootstrap-icons';

export const AfiliarButton = ({idPersona,nombres, afiliar}) => {
    

    const imprimir = () =>{
        console.log("el metodo imprimir desde AfiliarButton is called");
        console.log("El id de la persona es: "+idPersona);
        console.log("Los nombres de la persona son: "+nombres);
        afiliar(idPersona,nombres);

    }
  return <BuildingAdd color="royalblue" size={30} onClick={imprimir}/>;
}