import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
//id,names,appat,apmat,clave,dir,tel,secc
import { editNominal } from "../../componets/helpers/editNominal";
import { useForm } from "react-hook-form"


export const ModalEdition = ({modalEdit,toggleEdit, seleccionado}) => {
    //const selection = {seleccionado}

    if(seleccionado[0] != undefined){
        //console.log(seleccionado[0].id);
        const {id,nombres, ape_pat,ape_mal,ClaveElector,direccion,telefono, id_seccion} = seleccionado[0];
        console.log("Values:  ID:"+id+ "Nombres:" +nombres+" apPat: "+ape_pat+" apMat: "+ape_mal+" clave: "+
            ClaveElector+" dire:"+direccion+" tel:"+telefono);
    
    const onClickEdit = () => {
        console.log("Desde el componente modalEdit"+event.target);
        //console.log(nombre)
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
         console.log("Actualiza...INICIO");
        sendActualizaForm(data);
        console.log("Actualiza...FIN.")
    }

    const sendActualizaForm = async (dataEdit) => {
        let nuevasFilas = {};
        try{
        const afil  = await editNominal(dataEdit);
        const {actualizados, idAfiliacion} = afil;
    
        console.log("Respuesta Afiliacion Afectadas: "+ actualizados +"El ID es: " +idAfiliacion);
        if(actualizados == 1){
          console.log("Se encontro alguien")
          //console.log("Filas: "+filas)
          nuevasFilas = filas.map(function(regis){
            if(regis.id == idAfiliacion){
               regis.vota_pt = 1;
            }
            return regis;
          })
          //console.log("Filas Actualizadas:"+nuevasFilas)
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
            size="lg" style={{maxWidth: '500px', width: '50%'}}>
            <ModalHeader color="secondary"
                toggle={toggleEdit}> Edicion de:
            </ModalHeader>
            <ModalBody color="primary">
            <form onSubmit={handleSubmit(onSubmit)}>
               <span>Nombre</span>
               <input type="text"  {...register("nombres", { required: true })} defaultValue={nombres}
                    className="form-control" maxLength={80} minLength={3}/>
                    {errors.nombres && <span className='text-danger'>campo obligatorio* </span>}

               <span>Apellido Paterno</span>
               <input  type="text" {...register("appat", { required: true })} defaultValue={ape_pat}
                    className="form-control" maxLength={25} minLength={3}/>
                    {errors.appat && <span className='text-danger'>campo obligatorio* </span>}

               <span>Apellido Materno</span>
               <input  type="text" {...register("apmat", { required: true })} defaultValue={ape_mal}
                    className="form-control" maxLength={25} minLength={1}/>
                    {errors.apmat && <span className='text-danger'>campo obligatorio* </span>}

               <span>Clave de Elector</span>
               <input type="text"  {...register("clave", { required: true })} defaultValue={ClaveElector}
                    className="form-control" maxLength={18} minLength={18}/>
                    {errors.clave && <span className='text-danger'>campo obligatorio* </span>}

               <span>Dirección</span>
               <input type="text"  {...register("dir", { required: true })} defaultValue={direccion}
                    className="form-control"maxLength={50} minLength={5}/>
                    {errors.dir && <span className='text-danger'>campo obligatorio* </span>}

               <span>Teléfono</span>
               <input type="text"  {...register("tel", { required: true })} defaultValue={telefono}
                    className="form-control"maxLength={12} minLength={8}/>
                    {errors.tel && <span className='text-danger'>campo obligatorio* </span>}

               <span>Sección</span>
               <input type="text"  {...register("secc", { required: true })} defaultValue={id_seccion}
                    className="form-control" maxLength={3} minLength={3}/>
                    {errors.secc && <span className='text-danger'>campo obligatorio* </span>}
                <input   type="hidden"  {...register("id", { required: true })} defaultValue={id} />
               <hr />
               <Button color="secondary" onClick={toggleEdit}>Cancelar</Button>
               <Button color="primary" type="submit" className="btn btn-primary" >Editar</Button>
            </form>
            </ModalBody>
        </Modal>
    </div >
    )
}else{
    console.log("Iniciando Selected Undefine")
}
}