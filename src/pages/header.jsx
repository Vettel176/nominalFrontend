import { useState } from 'react';
import { ModalClose } from './modals/ModalClose';

const Header = ({user}) => {

    const [modalClose, setModalClose] = useState(false);
    const toggleClose = () => setModalClose(!modalClose);

    const cerrar = () => {
        console.log("Cerrando sesion");
        toggleClose();
    }

    
    

    return  (
        <>
                <div className='col-12 header d-flex justify-content-between'>
                    <p className="headerText p-3"> Bienvenido {user}</p>
                    <a className="headerText p-3"  onClick={cerrar}>Cerrar Sesión</a>
                </div>
                <div>
                <ModalClose modalClose= {modalClose} toggleClose = {toggleClose}/>
                </div>
        </>        
            )
}

export default Header;