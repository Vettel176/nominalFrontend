import { CardList } from 'react-bootstrap-icons';

export const DetailButton = ({idPersona,detalle}) => {
    
    const imprimir = () =>{
        console.log("El id de la persona es: "+idPersona);
        detalle(idPersona);

    }

  return <CardList color="royalblue" size={30} onClick={imprimir}/>;
}