import { Pencil } from 'react-bootstrap-icons';

export const EditButton = ({idPersona, idSecc, editar}) => {
    
    const imprimir = () =>{
        console.log("El id de la persona es: "+idPersona);
        console.log("El id de la seccion es: "+idSecc);
        editar(idPersona, idSecc);
    }

  return <Pencil color="royalblue" size={30} onClick={imprimir}/>;
}