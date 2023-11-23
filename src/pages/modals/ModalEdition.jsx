import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import { editNominal } from "../../componets/helpers/editNominal";
import { useForm } from "react-hook-form"
import { DropDownSection } from "./DropDownSection";
import { useState, useEffect} from 'react';

export const ModalEdition = ({modalEdit,toggleEdit, sections, seleccionado, filas } ) => {

    let selected = {
      id:seleccionado.id,
      nombres:seleccionado.nombres,
      appat: seleccionado.ape_pat, 
      apmat:seleccionado.ape_mal,
      clave:seleccionado.ClaveElector,
      dir:seleccionado.direccion,
      tel:seleccionado.telefono
    }
   
    const data = selected; 

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm(
        {
          values: data,
          resetOptions: {
            keepDirtyValues: false, // keep dirty fields unchanged, but update defaultValues
          }
      }
      );

    const onSubmit = (data) => {
        data.secc = seleccionado.id_seccion;
        console.log("Actualiza...INICIO"+seleccionado.id_seccion);
        sendActualizaForm(data);
        console.log("Actualiza...FIN.")
    }

    const sendActualizaForm = async (dataEdit) => {
        let nuevasFilas = {};
        try{
        const responseEditAfil  = await editNominal(dataEdit);
        const {actualizados, id} = responseEditAfil;
    
        console.log("Respuesta Afiliacion Afectadas: "+ actualizados +"  El ID es: " +id);
          if(actualizados == 1){
            console.log("Se encontro alguien para actualizar")
            nuevasFilas = filas.map(function(regis){
              if(regis.id == id){
                console.log("Editando...INICIO")
                 regis.nombres = dataEdit.nombres;
                 regis.ape_pat = dataEdit.appat;
                 regis.ape_mal = dataEdit.apmat;
                 regis.ClaveElector = dataEdit.clave;
                 regis.direccion = dataEdit.dir;
                 regis.telefono = dataEdit.tel;
                 console.log("Editando...FIN")
              }
              return regis;
            })
        }
        
        }catch(e){
          console.log("Ocurrio un erro espectral al afiliar:"+e)
        }
        toggleEdit();
      }



    return (
    <div>
        
        <Modal isOpen={modalEdit}
            toggle={toggleEdit} 
            modalTransition={{ timeout: 200 }} 
            size="lg">
            <ModalHeader color="secondary"
                toggle={toggleEdit}> Edicion de:
            </ModalHeader>
            <ModalBody color="primary">
            <form onSubmit={handleSubmit(onSubmit)}>
               <span>Nombre</span>
               {errors.nombres && <span className='text-danger'>campo obligatorio* </span>}
               <input type="text"  {...register("nombres", { required: true })}
                    className="form-control" maxLength={80} minLength={3}/>
                    

               <span>Apellido Paterno</span>
               {errors.appat && <span className='text-danger'>campo obligatorio* </span>}
               <input  type="text"  {...register("appat", { required: true })} 
                    className="form-control" maxLength={25} minLength={3}/>
                    
               <span>Apellido Materno</span>
               {errors.apmat && <span className='text-danger'>campo obligatorio* </span>}
               <input  type="text" {...register("apmat", { required: true})} 
                    className="form-control" maxLength={25} minLength={1}/>
                    

               <span>Clave de Elector</span>
               {errors.clave && <span className='text-danger'>campo obligatorio* </span>}
               <input type="text"  {...register("clave", { required: true })} 
                    className="form-control" maxLength={18} minLength={18}/>
                   

               <span>Dirección</span>
               {errors.dir && <span className='text-danger'>campo obligatorio* </span>}
               <input type="text"  {...register("dir", { required: true })}
                    className="form-control"maxLength={50} minLength={5}/>
                    

               <span>Teléfono</span>
               <input type="text" 
                    className="form-control"maxLength={15} minLength={10}/>
                    

                <DropDownSection sections = {sections} seleccionado = {seleccionado}/>  

               <hr />
               <div className="d-flex justify-content-around p-2 text-center">
               <Button color="secondary" onClick={toggleEdit}>  Cancelar   </Button>
               <Button color="primary" type="submit" className="btn btn-primary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Editar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Button>
               </div>
               
               
            </form>
            </ModalBody>
        </Modal>
    </div >
    )
// }else{
//     console.log("Iniciando Selected Undefine")
// }
}