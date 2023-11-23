import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form"

export const ModalDetail = ({modalDetail,toggleDetail, seleccionado}) => {

    const {id,nombres, ape_pat,ape_mal,ClaveElector,direccion,telefono, id_seccion} = seleccionado;
    
    console.log("Values:  ID ModalDetail :"+id+ "Nombres:" +nombres+" apPat: "+
    ape_pat+" apMat: "+ape_mal+" clave: "+ClaveElector+" dire:"+direccion+" tel:"+telefono);
      
    const {
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
         console.log("Actualiza...INICIO");
        console.log("Actualiza...FIN.")
    }

    return (
    <div>
        <Modal isOpen={modalDetail}
            toggle={toggleDetail} 
            modalTransition={{ timeout: 200 }} 
            size="lg">
            <ModalHeader color="secondary"
                toggle={toggleDetail}> Detalle de:
            </ModalHeader>
            <ModalBody color="primary">
            <form onSubmit={handleSubmit(onSubmit)}>
               <span>Nombres</span>
               <input type="text" readOnly defaultValue={nombres}
                    className="form-control"/>
                  
               <span>Apellido Paterno</span>
               <input  type="text" readOnly defaultValue={ape_pat}
                    className="form-control"/>
                   
               <span>Apellido Materno</span>
               <input  type="text" readOnly defaultValue={ape_mal}
                    className="form-control" />
                   

               <span>Clave de Elector</span>
               <input type="text" readOnly defaultValue={ClaveElector}
                    className="form-control"/>
                   

               <span>Dirección</span>
               <input type="text" readOnly defaultValue={direccion}
                    className="form-control"/>
                    

               <span>Teléfono</span>
               <input type="text"  readOnly defaultValue={telefono} 
                      className="form-control"/>
                   
               <span>Sección</span>
               <input type="text"  readOnly defaultValue={id_seccion} 
                      className="form-control"/>
               <hr />
               <div className="d-flex justify-content-center p-2 text-center">

               <Button color="primary" onClick={toggleDetail}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aceptar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
               </div>
            </form>
            </ModalBody>
        </Modal>
    </div >
    )
}