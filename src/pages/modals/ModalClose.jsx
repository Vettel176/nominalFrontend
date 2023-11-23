import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
export const ModalClose = ({modalClose,toggleClose}) =>{

    const navigate = useNavigate();
    const onClickCloseSession = () =>{
        //const user = window.localStorage.getItem('nameUser');
        //console.log("Usuario es:"+user);
        toggleClose();
        window.localStorage.removeItem('tokenLogin')
        navigate("/close");
      }

      return (
        <div>
            <Modal isOpen={modalClose}
                toggle={toggleClose} 
                modalTransition={{ timeout: 200 }} 
                size="md" >
                <ModalHeader color="secondary"
                    toggle={toggleClose}>Mensaje
                </ModalHeader>
                <ModalBody color="primary" >
                  ¿Desea Cerrar Sesion?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onClickCloseSession}>Aceptar</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
      
}